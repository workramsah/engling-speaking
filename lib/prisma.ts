// lib/prisma.ts
import { PrismaClient } from '../app/generated/prisma/client';

// Declare a global variable to store the Prisma client instance
// This is a common pattern for Next.js and other frameworks to prevent
// creating multiple instances in development mode (which can exhaust database connections)
declare global {
  var prisma: PrismaClient | undefined;
}

// Reuse the existing instance or create a new one if not available
const prisma = global.prisma || new PrismaClient({
  log: ['query'], // Optional: log database queries
});

// For Next.js development mode, assign the client to the global scope
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

// Export the client for use throughout your application
export default prisma;
