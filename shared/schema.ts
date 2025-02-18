import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role", { enum: ["admin", "teacher", "student"] }).notNull(),
  name: text("name").notNull(),
});

export const classes = pgTable("classes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  teacherId: integer("teacher_id").notNull(),
  schedule: text("schedule").notNull(),
});

export const attendance = pgTable("attendance", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id").notNull(),
  classId: integer("class_id").notNull(),
  date: timestamp("date").notNull(),
  present: boolean("present").notNull(),
});

export const grades = pgTable("grades", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id").notNull(),
  classId: integer("class_id").notNull(),
  grade: integer("grade").notNull(),
  comment: text("comment"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  role: true,
  name: true,
});

export const insertClassSchema = createInsertSchema(classes);
export const insertAttendanceSchema = createInsertSchema(attendance);
export const insertGradeSchema = createInsertSchema(grades);

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Class = typeof classes.$inferSelect;
export type Attendance = typeof attendance.$inferSelect;
export type Grade = typeof grades.$inferSelect;
