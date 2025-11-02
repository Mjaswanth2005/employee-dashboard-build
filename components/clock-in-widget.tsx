"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, MapPin } from "lucide-react"

interface ClockInWidgetProps {
  employeeId: string
  isClockedIn?: boolean
  onClockIn?: () => void
  onClockOut?: () => void
}

export function ClockInWidget({ employeeId, isClockedIn = false, onClockIn, onClockOut }: ClockInWidgetProps) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [status, setStatus] = useState<"in" | "out">(isClockedIn ? "in" : "out")
  const [clockInTime, setClockInTime] = useState<string | null>(isClockedIn ? currentTime.toLocaleTimeString() : null)

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  const handleClockIn = () => {
    const now = new Date()
    setClockInTime(now.toLocaleTimeString())
    setStatus("in")
    onClockIn?.()
  }

  const handleClockOut = () => {
    setStatus("out")
    onClockOut?.()
  }

  return (
    <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
      <CardHeader>
        <CardTitle>Attendance Clock</CardTitle>
        <CardDescription>Mark your daily attendance</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Time */}
        <div className="text-center">
          <p className="text-5xl font-bold text-primary">{currentTime.toLocaleTimeString()}</p>
          <p className="text-sm text-muted-foreground mt-2">
            {currentTime.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Status */}
        <div className="space-y-3">
          <div className="flex items-center justify-between bg-card p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium">Status</span>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                status === "in" ? "bg-accent/20 text-accent" : "bg-muted text-muted-foreground"
              }`}
            >
              {status === "in" ? "Clocked In" : "Clocked Out"}
            </span>
          </div>

          {clockInTime && (
            <div className="flex items-center justify-between bg-card p-4 rounded-lg">
              <span className="text-sm font-medium">Clocked In At</span>
              <span className="text-sm text-accent font-semibold">{clockInTime}</span>
            </div>
          )}

          <div className="flex items-center justify-between bg-card p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium">Location</span>
            </div>
            <span className="text-sm text-muted-foreground">Office</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          {status === "out" ? (
            <Button onClick={handleClockIn} className="flex-1">
              Clock In
            </Button>
          ) : (
            <Button onClick={handleClockOut} variant="outline" className="flex-1 bg-transparent">
              Clock Out
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
