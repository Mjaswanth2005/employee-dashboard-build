import { create } from "zustand"
import type { User } from "./types"

interface AuthStore {
  user: User | null
  isAuthenticated: boolean
  setUser: (user: User | null) => void
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  login: async (email: string, password: string) => {
    // Determine role based on email prefix for demo
    let role: "employee" | "hr" | "admin" = "employee"
    if (email.toLowerCase().includes("admin")) role = "admin"
    else if (email.toLowerCase().includes("hr")) role = "hr"

    // Mock login - replace with actual API call
    const mockUser: User = {
      id: "1",
      email,
      name: "John Doe",
      role,
      department: "Engineering",
      employeeId: "EMP001",
      avatar: "https://avatar.vercel.sh/john",
    }
    set({ user: mockUser, isAuthenticated: true })
  },
  logout: () => set({ user: null, isAuthenticated: false }),
}))

interface UIStore {
  sidebarCollapsed: boolean
  theme: "light" | "dark" | "system"
  toggleSidebar: () => void
  setTheme: (theme: "light" | "dark" | "system") => void
}

export const useUIStore = create<UIStore>((set) => ({
  sidebarCollapsed: false,
  theme: "system",
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setTheme: (theme) => set({ theme }),
}))
