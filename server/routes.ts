import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { insertClassSchema, insertAttendanceSchema, insertGradeSchema } from "@shared/schema";
import { generateChatResponse, generateAnalysis } from "./ai";

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);

  // Classes
  app.get("/api/classes", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const classes = await storage.getClasses(req.user);
    res.json(classes);
  });

  app.post("/api/classes", async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== "admin")
      return res.sendStatus(401);

    const parsed = insertClassSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).send(parsed.error);

    const newClass = await storage.createClass(parsed.data);
    res.json(newClass);
  });

  // Attendance
  app.get("/api/attendance/:classId", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const attendance = await storage.getAttendance(parseInt(req.params.classId));
    res.json(attendance);
  });

  app.post("/api/attendance", async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== "teacher")
      return res.sendStatus(401);

    const parsed = insertAttendanceSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).send(parsed.error);

    const attendance = await storage.createAttendance(parsed.data);
    res.json(attendance);
  });

  // Grades
  app.get("/api/grades/:studentId", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const grades = await storage.getGrades(parseInt(req.params.studentId));
    res.json(grades);
  });

  app.post("/api/grades", async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== "teacher")
      return res.sendStatus(401);

    const parsed = insertGradeSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).send(parsed.error);

    const grade = await storage.createGrade(parsed.data);
    res.json(grade);
  });

  // AI Chat
  app.post("/api/chat", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    try {
      const response = await generateChatResponse(req.body.message);
      res.json({ response });
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : "Failed to generate response"
      });
    }
  });

  // AI Analytics Routes
  app.post("/api/analytics/predict", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    try {
      const analysis = await generateAnalysis({
        studentId: req.body.studentId,
        type: "prediction",
        data: req.body
      });

      // Parse the AI response to extract structured data
      // This is a simplified example - you might want to add more structure
      const prediction = {
        predictedGrade: 85, // Extract from AI response
        confidence: 0.8,
        recommendations: analysis.split("\n").filter(line => line.startsWith("-"))
      };

      res.json(prediction);
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : "Failed to generate prediction"
      });
    }
  });

  app.post("/api/analytics/performance", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    try {
      const analysis = await generateAnalysis({
        type: "performance",
        grades: req.body.grades
      });

      // Extract insights from AI response
      const insights = {
        averageGrade: req.body.grades.reduce((sum: number, g: any) => sum + g.grade, 0) / req.body.grades.length,
        trend: "improving", // Extract from AI response
        strengths: ["Mathematics", "Problem Solving"], // Extract from AI response
        areasForImprovement: ["Time Management"] // Extract from AI response
      };

      res.json(insights);
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : "Failed to analyze performance"
      });
    }
  });

  // User Management
  app.get("/api/users", async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== "admin") {
      return res.sendStatus(401);
    }

    try {
      const users = await storage.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : "Failed to fetch users"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}