import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { User } from "./types"

interface AuthStore {
  user: User | null
  isAuthenticated: boolean
  setUser: (user: User | null) => void
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthStore>(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      login: async (email: string, password: string) => {
        let role: "employee" | "hr" | "admin" = "employee"
        if (email.toLowerCase().includes("admin")) role = "admin"
        else if (email.toLowerCase().includes("hr")) role = "hr"

        // Mock login - replace with actual API call
        const mockUser: User = {
          id: `${Date.now()}`,
          email,
          name: role === "admin" ? "Admin User" : role === "hr" ? "HR Manager" : "John Doe",
          role,
          department: role === "admin" ? "Management" : role === "hr" ? "HR" : "Engineering",
          employeeId: role === "admin" ? "ADM001" : role === "hr" ? "HR001" : "EMP001",
          avatar: "https://avatar.vercel.sh/john",
        }
        set({ user: mockUser, isAuthenticated: true })
      },
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: "auth-store",
    },
  ),
)

interface UIStore {
  sidebarCollapsed: boolean
  theme: "light" | "dark" | "system"
  toggleSidebar: () => void
  setTheme: (theme: "light" | "dark" | "system") => void
}

export const useUIStore = create<UIStore>(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      theme: "system",
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "ui-store",
    },
  ),
)
