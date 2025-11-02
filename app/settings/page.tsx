"use client"

import { PageGuard } from "@/components/role-guard"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Bell, Lock, Users, Database, AlertCircle } from "lucide-react"

function SettingsContent() {
  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-4xl">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground mt-2">Manage system configuration and admin settings</p>
        </div>

        {/* System Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              System Settings
            </CardTitle>
            <CardDescription>Configure general system parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Organization Name</label>
              <Input placeholder="Your Company Name" defaultValue="Tech Corp" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Fiscal Year Start Month</label>
              <Input type="number" placeholder="1-12" defaultValue="1" min="1" max="12" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Max Annual Leave</label>
              <Input type="number" defaultValue="20" />
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        {/* User Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              User Management
            </CardTitle>
            <CardDescription>Manage user roles and permissions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">John Doe</p>
                  <p className="text-sm text-muted-foreground">john@company.com</p>
                </div>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">Admin</span>
              </div>
            </div>
            <div className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Jane Smith</p>
                  <p className="text-sm text-muted-foreground">jane@company.com</p>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">HR</span>
              </div>
            </div>
            <Button variant="outline">Manage Users</Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notification Settings
            </CardTitle>
            <CardDescription>Configure system notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Email Notifications</p>
                <p className="text-sm text-muted-foreground">Send email for leave approvals</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Attendance Reminders</p>
                <p className="text-sm text-muted-foreground">Daily reminders for clock-in</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Payroll Notifications</p>
                <p className="text-sm text-muted-foreground">Notify on salary processing</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Button>Save Preferences</Button>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Security
            </CardTitle>
            <CardDescription>Manage security settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Password policy: Minimum 8 characters, mix of uppercase, lowercase, numbers, and symbols
              </AlertDescription>
            </Alert>
            <Button>Change Password</Button>
            <Button variant="outline">View Activity Log</Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

export default function SettingsPage() {
  return (
    <PageGuard requiredPermission="canEditSettings">
      <SettingsContent />
    </PageGuard>
  )
}
