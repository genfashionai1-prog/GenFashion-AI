import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post(api.users.createOrUpdate.path, async (req, res) => {
    try {
      const input = api.users.createOrUpdate.input.parse(req.body);
      const user = await storage.createOrUpdateUser(input);
      res.status(200).json(user);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.get(api.users.get.path, async (req, res) => {
    const user = await storage.getUser(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  });

  app.get(api.results.list.path, async (req, res) => {
    const userResults = await storage.getResultsByUserId(req.params.userId);
    res.json(userResults);
  });

  app.post(api.results.create.path, async (req, res) => {
    try {
      const input = api.results.create.input.parse(req.body);
      const result = await storage.createResult({ ...input, userId: req.params.userId });
      res.status(201).json(result);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  return httpServer;
}
