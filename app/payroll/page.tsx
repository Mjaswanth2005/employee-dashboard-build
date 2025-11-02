"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PayslipCard } from "@/components/payslip-card"
import { PayrollSummary } from "@/components/payroll-summary"
import { SalaryDetailsTable } from "@/components/salary-details-table"
import { mockPayslips } from "@/lib/mock-data"
import { useAuthStore } from "@/lib/store"
import { useState } from "react"
import {
  LineChart,
  Line,
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
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageGuard } from "@/components/role-guard"

const salaryTrendData = [
  { month: "Jan", gross: 125000, net: 94500 },
  { month: "Feb", gross: 125000, net: 94500 },
  { month: "Mar", gross: 125000, net: 94500 },
  { month: "Apr", gross: 125000, net: 94500 },
  { month: "May", gross: 125000, net: 94500 },
  { month: "Jun", gross: 125000, net: 94500 },
]

const deductionBreakdown = [
  { name: "PF", value: 12500, color: "#3b82f6" },
  { name: "Tax", value: 18000, color: "#f59e0b" },
  { name: "ESI", value: 0, color: "#10b981" },
  { name: "Other", value: 0, color: "#8b5cf6" },
]

function PayrollContent() {
  const { user } = useAuthStore()
  const [selectedPayslip, setSelectedPayslip] = useState(mockPayslips[0])

  const handleExportPayroll = () => {
    const csv = [
      ["Month", "Year", "Gross Salary", "Deductions", "Net Salary"],
      ...mockPayslips.map((p) => [
        p.month,
        p.year,
        p.grossSalary,
        p.deductions.pf + p.deductions.esi + p.deductions.tax + p.deductions.other,
        p.netSalary,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "payroll-report.csv"
    a.click()
  }

  // Show export button only for HR/Admin
  const canExport = user?.role !== "employee"

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Payroll</h2>
            <p className="text-muted-foreground mt-2">View and manage salary information and payslips</p>
          </div>
          {canExport && (
            <Button variant="outline" onClick={handleExportPayroll}>
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          )}
        </div>

        {/* Summary Cards */}
        <PayrollSummary payslips={mockPayslips} />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Payslips List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Payslips</CardTitle>
                <CardDescription>Recent payslips</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 max-h-96 overflow-y-auto">
                {mockPayslips.map((payslip) => (
                  <button
                    key={payslip.id}
                    onClick={() => setSelectedPayslip(payslip)}
                    className={`w-full p-3 rounded-lg border transition-colors text-left ${
                      selectedPayslip.id === payslip.id
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <p className="font-medium text-sm">
                      {payslip.month} {payslip.year}
                    </p>
                    <p className="text-xs text-muted-foreground">${payslip.netSalary.toLocaleString()}</p>
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Salary Details */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Salary Breakdown</CardTitle>
                <CardDescription>
                  {selectedPayslip.month} {selectedPayslip.year}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SalaryDetailsTable payslip={selectedPayslip} />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Salary Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Salary Trend</CardTitle>
              <CardDescription>Gross vs Net salary over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salaryTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
                  <YAxis stroke="var(--color-muted-foreground)" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "var(--color-card)", border: "1px solid var(--color-border)" }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="gross" stroke="var(--color-primary)" name="Gross" />
                  <Line type="monotone" dataKey="net" stroke="var(--color-accent)" name="Net" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Deduction Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Deduction Breakdown</CardTitle>
              <CardDescription>Current month breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={deductionBreakdown}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: $${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {deductionBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* All Payslips */}
        <Card>
          <CardHeader>
            <CardTitle>All Payslips</CardTitle>
            <CardDescription>Complete payslip history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockPayslips.map((payslip) => (
                <PayslipCard key={payslip.id} payslip={payslip} employeeName="John Doe" employeeId="EMP001" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

export default function PayrollPage() {
  return (
    <PageGuard requiredPermission="canViewPayroll">
      <PayrollContent />
    </PageGuard>
  )
}
