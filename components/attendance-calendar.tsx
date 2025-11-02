"use client"

import type { Attendance } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface AttendanceCalendarProps {
  attendance: Attendance[]
}

export function AttendanceCalendar({ attendance }: AttendanceCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const getStatusColor = (status: string) => {
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

  const getAttendanceForDate = (day: number) => {
    const dateStr = new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toISOString().split("T")[0]

    return attendance.find((a) => a.date === dateStr)
  }

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDay = getFirstDayOfMonth(currentDate)
  const days = []

  for (let i = 0; i < firstDay; i++) {
    days.push(null)
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Attendance Calendar</CardTitle>
            <CardDescription>Monthly attendance overview</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={previousMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-semibold min-w-40 text-center">
              {currentDate.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </span>
            <Button variant="ghost" size="sm" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Legend */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-accent" />
            <span className="text-xs text-muted-foreground">Present</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-destructive" />
            <span className="text-xs text-muted-foreground">Absent</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-primary" />
            <span className="text-xs text-muted-foreground">Leave</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-orange-500" />
            <span className="text-xs text-muted-foreground">Half-day</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-muted" />
            <span className="text-xs text-muted-foreground">Holiday</span>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="space-y-2">
          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center text-xs font-semibold text-muted-foreground">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-2">
            {days.map((day, index) => {
              if (day === null) {
                return <div key={`empty-${index}`} className="aspect-square" />
              }

              const attendanceRecord = getAttendanceForDate(day)

              return (
                <div
                  key={day}
                  className={`aspect-square flex items-center justify-center rounded border border-border text-sm font-medium cursor-pointer transition-colors hover:border-primary ${
                    attendanceRecord ? getStatusColor(attendanceRecord.status) : "bg-muted/50"
                  }`}
                >
                  {day}
                </div>
              )
            })}
          </div>
        </div>

        {/* Summary */}
        <div className="border-t border-border pt-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Total Present</p>
              <p className="text-lg font-bold text-accent">{attendance.filter((a) => a.status === "present").length}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Total Absent</p>
              <p className="text-lg font-bold text-destructive">
                {attendance.filter((a) => a.status === "absent").length}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Total Leave</p>
              <p className="text-lg font-bold text-primary">{attendance.filter((a) => a.status === "leave").length}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Total Half-day</p>
              <p className="text-lg font-bold text-orange-600">
                {attendance.filter((a) => a.status === "half-day").length}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
