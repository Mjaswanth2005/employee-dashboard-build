"use client"

import { useAuthStore } from "@/lib/store"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function HomePage() {
  const { isAuthenticated } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard")
    } else {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  return null
}
