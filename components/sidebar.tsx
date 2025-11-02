"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuthStore } from "@/lib/store"
import { can } from "@/lib/rbac"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Users, Calendar, FileText, Settings, LogOut, Menu, X } from "lucide-react"
import { useState } from "react"

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard", permission: "canViewDashboard" },
  { icon: Users, label: "Employees", href: "/employees", permission: "canViewEmployees" },
  { icon: Calendar, label: "Attendance", href: "/attendance", permission: "canViewAttendance" },
  { icon: FileText, label: "Leave", href: "/leave", permission: "canViewLeaves" },
  { icon: FileText, label: "Payroll", href: "/payroll", permission: "canViewPayroll" },
  { icon: Settings, label: "Settings", href: "/settings", permission: "canViewSettings" },
]

export function Sidebar() {
  const pathname = usePathname()
  const { logout, user } = useAuthStore()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = async () => {
    logout()
    window.location.href = "/login"
  }

  // Filter menu items based on user role
  const visibleItems = menuItems.filter((item) => {
    if (!user) return false
    return can(user.role, item.permission as any)
  })

  return (
    <>
      {/* Mobile Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } lg:relative lg:translate-x-0 z-40`}
      >
        <div className="p-6 space-y-8">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-sidebar-primary rounded-lg flex items-center justify-center text-sidebar-primary-foreground font-bold">
              ED
            </div>
            <span className="font-semibold text-sidebar-foreground hidden sm:inline">Dashboard</span>
          </Link>

          {/* User Role Badge */}
          {user && (
            <div className="px-3 py-2 bg-sidebar-accent rounded-lg">
              <p className="text-xs text-sidebar-foreground/70">Role</p>
              <p className="text-sm font-semibold text-sidebar-foreground capitalize">{user.role}</p>
            </div>
          )}

          {/* Navigation */}
          <nav className="space-y-2">
            {visibleItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={`w-full justify-start gap-3 ${
                      isActive
                        ? "bg-sidebar-primary text-sidebar-primary-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Button>
                </Link>
              )
            })}
          </nav>

          {/* Logout */}
          <div className="pt-4 border-t border-sidebar-border">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 lg:hidden z-30" onClick={() => setIsOpen(false)} />}
    </>
  )
}
