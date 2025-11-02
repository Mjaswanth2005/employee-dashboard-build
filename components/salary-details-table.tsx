"use client"

import type { Payslip } from "@/lib/types"

interface SalaryDetailsTableProps {
  payslip: Payslip
}

export function SalaryDetailsTable({ payslip }: SalaryDetailsTableProps) {
  return (
    <div className="space-y-6">
      {/* Earnings */}
      <div>
        <h4 className="font-semibold text-foreground mb-4">Earnings</h4>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Basic Salary</span>
            <span className="font-medium text-foreground">${payslip.earnings.basic.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">HRA</span>
            <span className="font-medium text-foreground">${payslip.earnings.hra.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">DA</span>
            <span className="font-medium text-foreground">${payslip.earnings.da.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Allowances</span>
            <span className="font-medium text-foreground">${payslip.earnings.allowances.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm pt-2 border-t border-border">
            <span className="font-semibold text-foreground">Gross Salary</span>
            <span className="font-semibold text-accent">${payslip.grossSalary.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Deductions */}
      <div>
        <h4 className="font-semibold text-foreground mb-4">Deductions</h4>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">PF (Provident Fund)</span>
            <span className="font-medium text-foreground">${payslip.deductions.pf.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">ESI (Insurance)</span>
            <span className="font-medium text-foreground">${payslip.deductions.esi.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Income Tax</span>
            <span className="font-medium text-foreground">${payslip.deductions.tax.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Other</span>
            <span className="font-medium text-foreground">${payslip.deductions.other.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm pt-2 border-t border-border">
            <span className="font-semibold text-foreground">Total Deductions</span>
            <span className="font-semibold text-destructive">
              $
              {(
                payslip.deductions.pf +
                payslip.deductions.esi +
                payslip.deductions.tax +
                payslip.deductions.other
              ).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Net Salary */}
      <div className="bg-accent/10 p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-foreground">Net Salary</span>
          <span className="text-2xl font-bold text-accent">${payslip.netSalary.toLocaleString()}</span>
        </div>
      </div>

      {/* Attendance */}
      <div>
        <h4 className="font-semibold text-foreground mb-4">Attendance Details</h4>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Days Present</span>
            <span className="font-medium text-foreground">{payslip.daysPresent}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Days Leave</span>
            <span className="font-medium text-foreground">{payslip.daysLeave}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Days LOP (Loss of Pay)</span>
            <span className="font-medium text-foreground">{payslip.daysLOP}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
