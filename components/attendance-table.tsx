"use client"

import type { Attendance } from "@/lib/types"

interface AttendanceTableProps {
  records: Attendance[]
}

export function AttendanceTable({ records }: AttendanceTableProps) {
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "present":
        return "bg-accent/20 text-accent"
      case "absent":
        return "bg-destructive/20 text-destructive"
      case "leave":
        return "bg-primary/20 text-primary"
      case "holiday":
        return "bg-muted text-muted-foreground"
      case "half-day":
        return "bg-orange-500/20 text-orange-600"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <table className="w-full">
        <thead className="bg-muted">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Date</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Clock In</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Clock Out</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Hours</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {records.map((record) => (
            <tr key={record.id} className="hover:bg-muted/50 transition-colors">
              <td className="px-6 py-4 text-sm font-medium text-foreground">
                {new Date(record.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </td>
              <td className="px-6 py-4 text-sm text-foreground">{record.clockIn || "-"}</td>
              <td className="px-6 py-4 text-sm text-foreground">{record.clockOut || "-"}</td>
              <td className="px-6 py-4 text-sm font-medium text-foreground">{record.workingHours.toFixed(1)}h</td>
              <td className="px-6 py-4">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadgeColor(
                    record.status,
                  )}`}
                >
                  {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
