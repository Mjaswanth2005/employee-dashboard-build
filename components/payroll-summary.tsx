"use client"

import type { Payslip } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PayrollSummaryProps {
  payslips: Payslip[]
}

export function PayrollSummary({ payslips }: PayrollSummaryProps) {
  const totalGrossSalary = payslips.reduce((sum, p) => sum + p.grossSalary, 0)
  const totalDeductions = payslips.reduce(
    (sum, p) => sum + p.deductions.pf + p.deductions.esi + p.deductions.tax + p.deductions.other,
    0,
  )
  const totalNetSalary = payslips.reduce((sum, p) => sum + p.netSalary, 0)
  const averageSalary = payslips.length > 0 ? totalNetSalary / payslips.length : 0

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Gross Salary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-foreground">${totalGrossSalary.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground mt-1">{payslips.length} months</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Deductions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-destructive">${totalDeductions.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground mt-1">All deductions</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Net Salary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-accent">${totalNetSalary.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground mt-1">Paid amount</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Average Monthly</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-foreground">${averageSalary.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground mt-1">Per month</p>
        </CardContent>
      </Card>
    </div>
  )
}
