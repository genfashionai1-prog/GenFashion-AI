import { z } from 'zod';
import { insertUserSchema, insertResultSchema, users, results } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  users: {
    createOrUpdate: {
      method: 'POST' as const,
      path: '/api/users' as const,
      input: insertUserSchema,
      responses: {
        200: z.custom<typeof users.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/users/:id' as const,
      responses: {
        200: z.custom<typeof users.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
  },
  results: {
    list: {
      method: 'GET' as const,
      path: '/api/users/:userId/results' as const,
      responses: {
        200: z.array(z.custom<typeof results.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/users/:userId/results' as const,
      input: insertResultSchema.omit({ userId: true }),
      responses: {
        201: z.custom<typeof results.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
