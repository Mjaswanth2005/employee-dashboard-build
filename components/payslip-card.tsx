"use client"

import type { Payslip } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileText } from "lucide-react"

interface PayslipCardProps {
  payslip: Payslip
  employeeName: string
  employeeId: string
}

export function PayslipCard({ payslip, employeeName, employeeId }: PayslipCardProps) {
  const handleDownload = () => {
    const content = `
PAYSLIP
${employeeName} (${employeeId})
${payslip.month} ${payslip.year}

EARNINGS:
Basic Salary: $${payslip.earnings.basic.toLocaleString()}
HRA: $${payslip.earnings.hra.toLocaleString()}
DA: $${payslip.earnings.da.toLocaleString()}
Allowances: $${payslip.earnings.allowances.toLocaleString()}
Gross Salary: $${payslip.grossSalary.toLocaleString()}

DEDUCTIONS:
PF: $${payslip.deductions.pf.toLocaleString()}
ESI: $${payslip.deductions.esi.toLocaleString()}
Tax: $${payslip.deductions.tax.toLocaleString()}
Other: $${payslip.deductions.other.toLocaleString()}

NET SALARY: $${payslip.netSalary.toLocaleString()}

ATTENDANCE:
Days Present: ${payslip.daysPresent}
Days Leave: ${payslip.daysLeave}
Days LOP: ${payslip.daysLOP}
    `

    const blob = new Blob([content], { type: "text/plain" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `payslip-${payslip.month}-${payslip.year}.txt`
    a.click()
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <div>
              <CardTitle className="text-base">
                {payslip.month} {payslip.year}
              </CardTitle>
              <CardDescription className="text-xs">{employeeName}</CardDescription>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Gross Salary</p>
            <p className="text-lg font-bold text-foreground">${payslip.grossSalary.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Deductions</p>
            <p className="text-lg font-bold text-destructive">
              $
              {(
                payslip.deductions.pf +
                payslip.deductions.esi +
                payslip.deductions.tax +
                payslip.deductions.other
              ).toLocaleString()}
            </p>
          </div>
        </div>
        <div className="pt-2 border-t border-border">
          <p className="text-xs text-muted-foreground">Net Salary</p>
          <p className="text-2xl font-bold text-accent">${payslip.netSalary.toLocaleString()}</p>
        </div>
      </CardContent>
    </Card>
  )
}
