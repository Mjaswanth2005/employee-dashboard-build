"use client"

import { useAuthStore } from "@/lib/store"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Header() {
  const { user, logout } = useAuthStore()

  const handleLogout = async () => {
    logout()
    window.location.href = "/login"
  }

  return (
    <header className="bg-background border-b border-border sticky top-0 z-20">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Welcome, {user?.name}</h1>
          <p className="text-sm text-muted-foreground">{user?.role}</p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <Avatar>
                <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                <AvatarFallback>{user?.name?.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-foreground">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <a href="/profile" className="w-full">
                Profile
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <a href="/settings" className="w-full">
                Settings
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout} className="text-destructive">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
