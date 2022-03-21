import express from "express";
import { JwtPayload } from "jsonwebtoken";

export interface AuthResponse extends express.Response {
  user?: string | JwtPayload | undefined;
}

export interface AuthRequest extends express.Request {
  user?: string | JwtPayload | undefined;
}
