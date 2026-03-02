import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: text("id").primaryKey(), // Firebase UID
  name: text("name").notNull(),
  email: text("email").notNull(),
  password: text("password"), // Optional because of Google auth
  createdAt: timestamp("created_at").defaultNow(),
});

export const results = pgTable("results", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  styleType: text("style_type").notNull(),
  colors: text("colors").array().notNull(), 
  recommendations: text("recommendations").array().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users);
export const insertResultSchema = createInsertSchema(results).omit({ id: true, createdAt: true });

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Result = typeof results.$inferSelect;
export type InsertResult = z.infer<typeof insertResultSchema>;
