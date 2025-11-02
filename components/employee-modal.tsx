"use client"

import type React from "react"

import type { Employee } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { X } from "lucide-react"
import { useState } from "react"

interface EmployeeModalProps {
  employee?: Employee
  isOpen: boolean
  onClose: () => void
  onSave?: (employee: Employee) => void
}

export function EmployeeModal({ employee, isOpen, onClose, onSave }: EmployeeModalProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<Partial<Employee>>(
    employee || {
      name: "",
      email: "",
      phone: "",
      department: "",
      designation: "",
      joinDate: "",
    },
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    if (onSave && formData.id) {
      onSave(formData as Employee)
      setIsEditing(false)
    }
  }

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
            <div>
              <CardTitle>{isEditing ? "Edit Employee" : "Employee Details"}</CardTitle>
              <CardDescription>{isEditing ? "Update employee information" : "View employee profile"}</CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Avatar */}
            <div className="flex justify-center">
              <Avatar className="h-24 w-24">
                <AvatarImage src={employee?.avatar || "/placeholder.svg"} alt={employee?.name} />
                <AvatarFallback className="text-2xl">{employee?.name?.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
            </div>

            {/* Employee Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <Input
                  name="name"
                  value={formData.name || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="bg-muted"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="bg-muted"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone</label>
                <Input
                  name="phone"
                  value={formData.phone || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="bg-muted"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Department</label>
                <Input
                  name="department"
                  value={formData.department || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="bg-muted"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Designation</label>
                <Input
                  name="designation"
                  value={formData.designation || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="bg-muted"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Join Date</label>
                <Input
                  name="joinDate"
                  type="date"
                  value={formData.joinDate || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="bg-muted"
                />
              </div>
            </div>

            {/* Salary Information */}
            {employee?.salary && (
              <div className="border-t border-border pt-4">
                <h4 className="font-semibold mb-4">Salary Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">Basic Salary</label>
                    <p className="text-lg font-semibold text-foreground">${employee.salary.basic.toLocaleString()}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">HRA</label>
                    <p className="text-lg font-semibold text-foreground">${employee.salary.hra.toLocaleString()}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">Allowances</label>
                    <p className="text-lg font-semibold text-foreground">
                      ${employee.salary.allowances.toLocaleString()}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">CTC</label>
                    <p className="text-lg font-semibold text-accent">${employee.salary.ctc.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-border">
              {!isEditing ? (
                <>
                  <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
                    Close
                  </Button>
                  <Button onClick={() => setIsEditing(true)} className="flex-1">
                    Edit
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" onClick={() => setIsEditing(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button onClick={handleSave} className="flex-1">
                    Save Changes
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
