import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { z } from "zod";

export function useResults(userId?: string) {
  return useQuery({
    queryKey: [api.results.list.path, userId],
    queryFn: async () => {
      if (!userId) return [];
      const url = buildUrl(api.results.list.path, { userId });
      const res = await fetch(url, { credentials: "omit" });
      if (!res.ok) throw new Error("Failed to fetch results");
      const data = await res.json();
      return api.results.list.responses[200].parse(data);
    },
    enabled: !!userId,
  });
}

export function useCreateResult(userId?: string) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: z.infer<typeof api.results.create.input>) => {
      if (!userId) throw new Error("Must be logged in to save results");
      
      const validated = api.results.create.input.parse(data);
      const url = buildUrl(api.results.create.path, { userId });
      
      const res = await fetch(url, {
        method: api.results.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });
      
      if (!res.ok) {
        if (res.status === 400) {
          throw new Error("Validation failed");
        }
        throw new Error("Failed to create result");
      }
      
      return api.results.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      if (userId) {
        queryClient.invalidateQueries({ queryKey: [api.results.list.path, userId] });
      }
    },
  });
}
