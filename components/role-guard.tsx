"use client"

import type React from "react"

import { useAuthStore } from "@/lib/store"
import { can } from "@/lib/rbac"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface RoleGuardProps {
  children: React.ReactNode
  requiredPermission: string
  fallback?: React.ReactNode
}

export function RoleGuard({ children, requiredPermission, fallback }: RoleGuardProps) {
  const { user } = useAuthStore()

  if (!user || !can(user.role, requiredPermission as any)) {
    return fallback || <div className="p-8 text-center text-destructive">Access Denied</div>
  }

  return children
}

interface PageGuardProps {
  children: React.ReactNode
  requiredPermission: string
}

export function PageGuard({ children, requiredPermission }: PageGuardProps) {
  const router = useRouter()
  const { user } = useAuthStore()

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    if (!can(user.role, requiredPermission as any)) {
      router.push("/dashboard")
      return
    }
  }, [user, router, requiredPermission])

  if (!user || !can(user.role, requiredPermission as any)) {
    return null
  }

  return children
}
