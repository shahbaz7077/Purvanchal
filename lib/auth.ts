import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

// Koi expiry nahi — token practically hamesha valid rahega
export function createAdminToken(): string {
  return jwt.sign({ role: "admin" }, JWT_SECRET);
}

export function verifyAdminToken(token: string | undefined): boolean {
  if (!token) return false;
  try {
    jwt.verify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}