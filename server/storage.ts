import { User, InsertUser, Class, Attendance, Grade, InsertGrade, InsertClass } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";
import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const MemoryStore = createMemoryStore(session);
const scryptAsync = promisify(scrypt);

async function createDefaultAdminPassword() {
  const salt = "abcdef0123456789";
  const buf = (await scryptAsync("admin", salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

export interface IStorage {
  sessionStore: session.Store;
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getClasses(user: User): Promise<Class[]>;
  createClass(class_: InsertClass): Promise<Class>;
  getAttendance(classId: number): Promise<Attendance[]>;
  createAttendance(attendance: InsertAttendance): Promise<Attendance>;
  getGrades(studentId: number): Promise<Grade[]>;
  createGrade(grade: InsertGrade): Promise<Grade>;
  getAllUsers(): Promise<User[]>; // Added getAllUsers method signature
}

export class MemStorage implements IStorage {
  sessionStore: session.Store;
  private users: Map<number, User>;
  private classes: Map<number, Class>;
  private attendance: Map<number, Attendance>;
  private grades: Map<number, Grade>;
  private currentId: { [key: string]: number };

  constructor() {
    this.sessionStore = new MemoryStore({ checkPeriod: 86400000 });
    this.users = new Map();
    this.classes = new Map();
    this.attendance = new Map();
    this.grades = new Map();
    this.currentId = { users: 1, classes: 1, attendance: 1, grades: 1 };

    // Create default admin user
    this.initializeAdmin().catch(console.error);
  }

  private async initializeAdmin() {
    const adminId = this.currentId.users++;
    const adminUser: User = {
      id: adminId,
      username: "admin",
      password: await createDefaultAdminPassword(),
      role: "admin",
      name: "Administrator"
    };
    this.users.set(adminId, adminUser);
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId.users++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getClasses(user: User): Promise<Class[]> {
    const classes = Array.from(this.classes.values());
    if (user.role === "admin") return classes;
    if (user.role === "teacher") return classes.filter(c => c.teacherId === user.id);
    return classes; // students see all classes
  }

  async createClass(class_: InsertClass): Promise<Class> {
    const id = this.currentId.classes++;
    const newClass: Class = { ...class_, id };
    this.classes.set(id, newClass);
    return newClass;
  }

  async getAttendance(classId: number): Promise<Attendance[]> {
    return Array.from(this.attendance.values()).filter(
      (a) => a.classId === classId,
    );
  }

  async createAttendance(attendance: InsertAttendance): Promise<Attendance> {
    const id = this.currentId.attendance++;
    const newAttendance: Attendance = { ...attendance, id };
    this.attendance.set(id, newAttendance);
    return newAttendance;
  }

  async getGrades(studentId: number): Promise<Grade[]> {
    return Array.from(this.grades.values()).filter(
      (g) => g.studentId === studentId,
    );
  }

  async createGrade(grade: InsertGrade): Promise<Grade> {
    const id = this.currentId.grades++;
    const newGrade: Grade = { ...grade, id };
    this.grades.set(id, newGrade);
    return newGrade;
  }

  async getAllUsers(): Promise<User[]> { // Added getAllUsers method implementation
    return Array.from(this.users.values());
  }
}

export const storage = new MemStorage();