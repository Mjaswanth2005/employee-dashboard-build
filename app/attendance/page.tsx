"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ClockInWidget } from "@/components/clock-in-widget"
import { AttendanceCalendar } from "@/components/attendance-calendar"
import { AttendanceTable } from "@/components/attendance-table"
import { useAuthStore } from "@/lib/store"
import { mockAttendance } from "@/lib/mock-data"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { useState } from "react"
import { PageGuard } from "@/components/role-guard" // Update the import statement

const monthlyData = [
  { month: "Jan", present: 22, absent: 2, leave: 4, holiday: 2 },
  { month: "Feb", present: 20, absent: 3, leave: 3, holiday: 2 },
  { month: "Mar", present: 23, absent: 1, leave: 2, holiday: 2 },
  { month: "Apr", present: 21, absent: 2, leave: 3, holiday: 2 },
  { month: "May", present: 24, absent: 0, leave: 2, holiday: 2 },
  { month: "Jun", present: 22, absent: 1, leave: 2, holiday: 3 },
]

function AttendanceContent() {
  const { user } = useAuthStore()
  const [isClockedIn, setIsClockedIn] = useState(false)

  const presentDays = mockAttendance.filter((a) => a.status === "present").length
  const absentDays = mockAttendance.filter((a) => a.status === "absent").length
  const leavesDays = mockAttendance.filter((a) => a.status === "leave").length
  const totalHours = mockAttendance.reduce((sum, a) => sum + a.workingHours, 0)

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Attendance</h2>
          <p className="text-muted-foreground mt-2">Track and manage daily attendance</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Present Days</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-accent">{presentDays}</p>
              <p className="text-xs text-muted-foreground mt-1">Days present this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Absent Days</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-destructive">{absentDays}</p>
              <p className="text-xs text-muted-foreground mt-1">Days absent this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Leave Days</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary">{leavesDays}</p>
              <p className="text-xs text-muted-foreground mt-1">Days on leave this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{totalHours.toFixed(1)}h</p>
              <p className="text-xs text-muted-foreground mt-1">Hours worked this month</p>
            </CardContent>
          </Card>
        </div>

        {/* Clock In Widget */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <ClockInWidget
              employeeId={user?.id || ""}
              isClockedIn={isClockedIn}
              onClockIn={() => setIsClockedIn(true)}
              onClockOut={() => setIsClockedIn(false)}
            />
          </div>

          {/* Attendance Trend */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Attendance Trend</CardTitle>
              <CardDescription>Monthly attendance pattern</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
                  <YAxis stroke="var(--color-muted-foreground)" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "var(--color-card)", border: "1px solid var(--color-border)" }}
                  />
                  <Legend />
                  <Bar dataKey="present" stackId="a" fill="var(--color-accent)" name="Present" />
                  <Bar dataKey="absent" stackId="a" fill="var(--color-destructive)" name="Absent" />
                  <Bar dataKey="leave" stackId="a" fill="var(--color-primary)" name="Leave" />
                  <Bar dataKey="holiday" stackId="a" fill="var(--color-muted)" name="Holiday" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Calendar */}
        <AttendanceCalendar attendance={mockAttendance} />

        {/* Detailed Records */}
        <Card>
          <CardHeader>
            <CardTitle>Attendance Records</CardTitle>
            <CardDescription>Last 30 days of attendance</CardDescription>
          </CardHeader>
          <CardContent>
            <AttendanceTable records={mockAttendance} />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

export default function AttendancePage() {
  return (
    <PageGuard requiredPermission="canViewAttendance">
      <AttendanceContent />
    </PageGuard>
  )
}
