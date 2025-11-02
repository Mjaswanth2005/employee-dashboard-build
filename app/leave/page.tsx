"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LeaveBalanceCard } from "@/components/leave-balance-card"
import { LeaveRequestForm } from "@/components/leave-request-form"
import { LeaveRequestsTable } from "@/components/leave-requests-table"
import { mockLeaveRequests, mockLeaveBalance } from "@/lib/mock-data"
import { useAuthStore } from "@/lib/store"
import type { LeaveRequest } from "@/lib/types"
import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Calendar, CheckCircle, AlertCircle, Clock } from "lucide-react"
import { PageGuard } from "@/components/role-guard" // Declare the PageGuard variable

const leaveChartData = [
  { month: "Jan", casual: 2, sick: 1, earned: 2 },
  { month: "Feb", casual: 1, sick: 0, earned: 1 },
  { month: "Mar", casual: 2, sick: 1, earned: 1 },
  { month: "Apr", casual: 1, sick: 2, earned: 2 },
  { month: "May", casual: 0, sick: 1, earned: 1 },
  { month: "Jun", casual: 3, sick: 0, earned: 2 },
]

function LeaveContent() {
  const { user } = useAuthStore()
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(mockLeaveRequests)

  const pendingRequests = leaveRequests.filter((r) => r.status === "pending").length
  const approvedRequests = leaveRequests.filter((r) => r.status === "approved").length
  const rejectedRequests = leaveRequests.filter((r) => r.status === "rejected").length

  const handleSubmitRequest = (newRequest: Omit<LeaveRequest, "id" | "status" | "approvedBy" | "comments">) => {
    const request: LeaveRequest = {
      ...newRequest,
      id: `${Date.now()}`,
      status: "pending",
    }
    setLeaveRequests((prev) => [request, ...prev])
  }

  const handleApprove = (requestId: string) => {
    setLeaveRequests((prev) =>
      prev.map((req) =>
        req.id === requestId ? { ...req, status: "approved" as const, approvedBy: "HR Manager" } : req,
      ),
    )
  }

  const handleReject = (requestId: string) => {
    setLeaveRequests((prev) =>
      prev.map((req) => (req.id === requestId ? { ...req, status: "rejected" as const } : req)),
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Leave Management</h2>
          <p className="text-muted-foreground mt-2">Manage leave requests and track your leave balance</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Pending Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-orange-600">{pendingRequests}</p>
              <p className="text-xs text-muted-foreground mt-1">Awaiting approval</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Approved
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-accent">{approvedRequests}</p>
              <p className="text-xs text-muted-foreground mt-1">Approved requests</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Rejected
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-destructive">{rejectedRequests}</p>
              <p className="text-xs text-muted-foreground mt-1">Rejected requests</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Total Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{leaveRequests.length}</p>
              <p className="text-xs text-muted-foreground mt-1">All time requests</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Leave Request Form */}
          <div className="lg:col-span-1">
            <LeaveRequestForm onSubmit={handleSubmitRequest} />
          </div>

          {/* Leave Balance */}
          <div className="lg:col-span-2">
            <LeaveBalanceCard balances={mockLeaveBalance} />
          </div>
        </div>

        {/* Leave Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Leave Trend</CardTitle>
            <CardDescription>Monthly leave requests by type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={leaveChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip
                  contentStyle={{ backgroundColor: "var(--color-card)", border: "1px solid var(--color-border)" }}
                />
                <Legend />
                <Bar dataKey="casual" fill="#3b82f6" name="Casual" />
                <Bar dataKey="sick" fill="#10b981" name="Sick" />
                <Bar dataKey="earned" fill="#f59e0b" name="Earned" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Leave Requests Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Leave Requests</CardTitle>
            <CardDescription>Manage and track all leave requests</CardDescription>
          </CardHeader>
          <CardContent>
            {leaveRequests.length > 0 ? (
              <LeaveRequestsTable
                requests={leaveRequests}
                onApprove={user?.role !== "employee" ? handleApprove : undefined}
                onReject={user?.role !== "employee" ? handleReject : undefined}
              />
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No leave requests yet</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

export default function LeavePage() {
  return (
    <PageGuard requiredPermission="canViewLeaves">
      <LeaveContent />
    </PageGuard>
  )
}
