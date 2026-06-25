import { initTRPC } from '@trpc/server'
import { prisma } from '@repo/db/src/client'

export function createContext() {
  return { prisma }
}

const t = initTRPC.context<typeof createContext>().create()

export const router = t.router
export const publicProcedure = t.procedure
