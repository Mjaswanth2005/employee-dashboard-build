"use client"

import type { LeaveBalance } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface LeaveBalanceCardProps {
  balances: LeaveBalance[]
}

export function LeaveBalanceCard({ balances }: LeaveBalanceCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Leave Balance</CardTitle>
        <CardDescription>Your available leave days</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {balances.map((leave, index) => (
          <div key={index} className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">{leave.leaveType}</p>
                <p className="text-xs text-muted-foreground">
                  {leave.used} used of {leave.total} days
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg" style={{ color: leave.color }}>
                  {leave.remaining}
                </p>
                <p className="text-xs text-muted-foreground">Remaining</p>
              </div>
            </div>
            <Progress
              value={(leave.used / leave.total) * 100}
              className="h-2"
              style={{ backgroundColor: `${leave.color}20` }}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
