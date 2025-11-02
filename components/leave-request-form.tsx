"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { LeaveRequest } from "@/lib/types"
import { Calendar, FileText } from "lucide-react"

interface LeaveRequestFormProps {
  onSubmit?: (request: Omit<LeaveRequest, "id" | "status" | "approvedBy" | "comments">) => void
}

export function LeaveRequestForm({ onSubmit }: LeaveRequestFormProps) {
  const [formData, setFormData] = useState({
    leaveType: "Casual",
    startDate: "",
    endDate: "",
    reason: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const startDate = new Date(formData.startDate)
      const endDate = new Date(formData.endDate)
      const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1

      onSubmit?.({
        employeeId: "EMP001",
        leaveType: formData.leaveType,
        startDate: formData.startDate,
        endDate: formData.endDate,
        days,
        reason: formData.reason,
        attachment: undefined,
      })

      setFormData({
        leaveType: "Casual",
        startDate: "",
        endDate: "",
        reason: "",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Request Leave</CardTitle>
        <CardDescription>Submit a new leave request</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Leave Type</label>
            <select
              name="leaveType"
              value={formData.leaveType}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
            >
              <option>Casual</option>
              <option>Sick</option>
              <option>Earned</option>
              <option>Unpaid</option>
              <option>Maternity</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Start Date
              </label>
              <Input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                End Date
              </label>
              <Input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Reason
            </label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              placeholder="Provide a reason for your leave..."
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm resize-none h-24"
              required
            />
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
