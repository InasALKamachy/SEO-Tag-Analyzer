import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// We'll keep the users table as it was already defined
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Add seo_analyses table to store analysis results if needed
export const seoAnalyses = pgTable("seo_analyses", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  title: text("title"),
  description: text("description"),
  score: integer("score").notNull(),
  created_at: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
  meta_tags_count: integer("meta_tags_count").notNull().default(0),
  recommendations_count: integer("recommendations_count").notNull().default(0),
  has_canonical: boolean("has_canonical").notNull().default(false),
  has_viewport: boolean("has_viewport").notNull().default(false),
  has_open_graph: boolean("has_open_graph").notNull().default(false),
  has_twitter_cards: boolean("has_twitter_cards").notNull().default(false),
});

export const insertSeoAnalysisSchema = createInsertSchema(seoAnalyses).pick({
  url: true,
  title: true,
  description: true,
  score: true,
  meta_tags_count: true,
  recommendations_count: true,
  has_canonical: true,
  has_viewport: true,
  has_open_graph: true,
  has_twitter_cards: true,
});

export type InsertSeoAnalysis = z.infer<typeof insertSeoAnalysisSchema>;
export type SeoAnalysis = typeof seoAnalyses.$inferSelect;

// Add seo_recommendations table to store recommendations
export const seoRecommendations = pgTable("seo_recommendations", {
  id: serial("id").primaryKey(),
  analysis_id: integer("analysis_id").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  example: text("example"),
  priority: text("priority").notNull().default("medium"),
});

export const seoAnalysesRelations = relations(seoAnalyses, ({ many }) => ({
  recommendations: many(seoRecommendations),
}));

export const seoRecommendationsRelations = relations(seoRecommendations, ({ one }) => ({
  analysis: one(seoAnalyses, {
    fields: [seoRecommendations.analysis_id],
    references: [seoAnalyses.id],
  }),
}));

export const insertSeoRecommendationSchema = createInsertSchema(seoRecommendations).pick({
  analysis_id: true,
  title: true,
  description: true,
  example: true,
  priority: true,
});

export type InsertSeoRecommendation = z.infer<typeof insertSeoRecommendationSchema>;
export type SeoRecommendation = typeof seoRecommendations.$inferSelect;
