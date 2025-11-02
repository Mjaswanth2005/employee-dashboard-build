"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Clock, FileText, TrendingUp, CheckCircle, AlertCircle } from "lucide-react"
import { useAuthStore } from "@/lib/store"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { mockLeaveBalance } from "@/lib/mock-data"

const adminStats = [
  { icon: Users, label: "Total Employees", value: "248", change: "+12%" },
  { icon: Clock, label: "Present Today", value: "195", change: "+5%" },
  { icon: FileText, label: "Leave Requests", value: "12", change: "-2%" },
  { icon: TrendingUp, label: "Avg Hours", value: "8.2h", change: "+0.5%" },
]

const employeeStats = [
  { icon: Clock, label: "Hours This Month", value: "168", change: "On track" },
  { icon: FileText, label: "Leave Balance", value: "8 days", change: "Remaining" },
  { icon: CheckCircle, label: "Attendance Rate", value: "95%", change: "Good" },
  { icon: AlertCircle, label: "Pending Requests", value: "2", change: "Awaiting approval" },
]

const attendanceData = [
  { day: "Mon", present: 220, absent: 28 },
  { day: "Tue", present: 225, absent: 23 },
  { day: "Wed", present: 218, absent: 30 },
  { day: "Thu", present: 230, absent: 18 },
  { day: "Fri", present: 195, absent: 53 },
  { day: "Sat", present: 15, absent: 233 },
  { day: "Sun", present: 10, absent: 238 },
]

const departmentData = [
  { name: "Engineering", value: 85, color: "#3b82f6" },
  { name: "HR", value: 30, color: "#10b981" },
  { name: "Sales", value: 75, color: "#f59e0b" },
  { name: "Finance", value: 35, color: "#8b5cf6" },
  { name: "Operations", value: 23, color: "#06b6d4" },
]

export default function DashboardPage() {
  const { user } = useAuthStore()
  const isEmployee = user?.role === "employee"
  const stats = isEmployee ? employeeStats : adminStats
  const presentToday = 195
  const totalEmployees = 248
  const attendancePercentage = Math.round((presentToday / totalEmployees) * 100)

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground mt-2">
            {isEmployee ? "Your personal HR dashboard" : "Overview of your organization's HR metrics"}
          </p>
        </div>

        {/* Stats Grid - Role-based */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-accent">{stat.change}</span>
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Organization Stats - Only for Admin/HR */}
        {!isEmployee && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Weekly Attendance Trend</CardTitle>
                <CardDescription>Employee presence over the week</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="day" stroke="var(--color-muted-foreground)" />
                    <YAxis stroke="var(--color-muted-foreground)" />
                    <Tooltip
                      contentStyle={{ backgroundColor: "var(--color-card)", border: "1px solid var(--color-border)" }}
                    />
                    <Legend />
                    <Bar dataKey="present" stackId="a" fill="var(--color-accent)" name="Present" />
                    <Bar dataKey="absent" stackId="a" fill="var(--color-muted)" name="Absent" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Employees by Department</CardTitle>
                <CardDescription>Current distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={departmentData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {departmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Leave Balance and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className={isEmployee ? "lg:col-span-3" : "lg:col-span-2"}>
            <CardHeader>
              <CardTitle>Leave Balance Overview</CardTitle>
              <CardDescription>Employee leave utilization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockLeaveBalance.map((leave, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{leave.leaveType}</span>
                      <span className="text-sm text-muted-foreground">
                        {leave.used} / {leave.total}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${(leave.used / leave.total) * 100}%`,
                          backgroundColor: leave.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {!isEmployee && (
            <Card>
              <CardHeader>
                <CardTitle>Today's Overview</CardTitle>
                <CardDescription>Quick metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Attendance Rate</p>
                    <p className="text-2xl font-bold">{attendancePercentage}%</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-destructive" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Absent</p>
                    <p className="text-2xl font-bold">{totalEmployees - presentToday}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              {isEmployee ? "Your recent activities" : "Latest updates from your organization"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 pb-4 border-b">
                <div className="w-2 h-2 bg-accent rounded-full" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">
                    {isEmployee ? "You marked attendance" : "John Doe marked attendance"}
                  </p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4 pb-4 border-b">
                <div className="w-2 h-2 bg-accent rounded-full" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">
                    {isEmployee ? "Your leave request" : "New leave request from Jane Smith"}
                  </p>
                  <p className="text-xs text-muted-foreground">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-accent rounded-full" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">Payroll processed successfully</p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
