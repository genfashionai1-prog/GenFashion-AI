import { db } from "./db";
import { users, results, type User, type InsertUser, type Result, type InsertResult } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  createOrUpdateUser(user: InsertUser): Promise<User>;
  getResultsByUserId(userId: string): Promise<Result[]>;
  createResult(result: InsertResult): Promise<Result>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async createOrUpdateUser(insertUser: InsertUser): Promise<User> {
    // Check if user exists
    const [existing] = await db.select().from(users).where(eq(users.id, insertUser.id!));
    if (existing) {
      const [updated] = await db.update(users)
        .set(insertUser)
        .where(eq(users.id, insertUser.id!))
        .returning();
      return updated;
    }
    
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getResultsByUserId(userId: string): Promise<Result[]> {
    return await db.select().from(results).where(eq(results.userId, userId));
  }

  async createResult(insertResult: InsertResult): Promise<Result> {
    const [result] = await db.insert(results).values(insertResult).returning();
    return result;
  }
}

export const storage = new DatabaseStorage();
