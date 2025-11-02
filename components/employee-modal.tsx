"use client"

import type React from "react"
import { useEffect } from "react"

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
      salary: { basic: 50000, hra: 7500, allowances: 2500, ctc: 60000 },
    },
  )

  useEffect(() => {
    if (isOpen) {
      setIsEditing(!employee)
    }
  }, [isOpen, employee])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => {
      if (name.startsWith("salary.")) {
        const salaryField = name.split(".")[1]
        return {
          ...prev,
          salary: {
            ...prev.salary,
            [salaryField]: Number.parseFloat(value) || 0,
          },
        }
      }
      return { ...prev, [name]: value }
    })
  }

  const handleSave = () => {
    if (!formData.name || !formData.email || !formData.department || !formData.designation) {
      alert("Please fill in all required fields")
      return
    }

    if (onSave) {
      const finalEmployee: Employee = {
        id: formData.id || `${Date.now()}`,
        employeeId: formData.employeeId || `EMP${Math.random().toString(36).substr(2, 3).toUpperCase()}`,
        name: formData.name,
        email: formData.email,
        phone: formData.phone || "",
        department: formData.department,
        designation: formData.designation,
        joinDate: formData.joinDate || new Date().toISOString().split("T")[0],
        status: formData.status || "active",
        salary: formData.salary || { basic: 50000, hra: 7500, allowances: 2500, ctc: 60000 },
        manager: formData.manager,
      }
      onSave(finalEmployee)
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
              <CardTitle>
                {isEditing ? (employee ? "Edit Employee" : "Add New Employee") : "Employee Details"}
              </CardTitle>
              <CardDescription>
                {isEditing
                  ? employee
                    ? "Update employee information"
                    : "Enter new employee information"
                  : "View employee profile"}
              </CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </CardHeader>

          <CardContent className="space-y-6">
            {employee && (
              <div className="flex justify-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={employee?.avatar || "/placeholder.svg"} alt={employee?.name} />
                  <AvatarFallback className="text-2xl">{employee?.name?.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name *</label>
                <Input
                  name="name"
                  value={formData.name || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="Full name"
                  className="bg-muted"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email *</label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="email@company.com"
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
                  placeholder="+1-555-0000"
                  className="bg-muted"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Department *</label>
                <Input
                  name="department"
                  value={formData.department || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="e.g., Engineering"
                  className="bg-muted"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Designation *</label>
                <Input
                  name="designation"
                  value={formData.designation || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="e.g., Senior Developer"
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

            <div className="border-t border-border pt-4">
              <h4 className="font-semibold mb-4">Salary Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Basic Salary *</label>
                  <Input
                    name="salary.basic"
                    type="number"
                    value={formData.salary?.basic || ""}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="50000"
                    className="bg-muted"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">HRA</label>
                  <Input
                    name="salary.hra"
                    type="number"
                    value={formData.salary?.hra || ""}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="7500"
                    className="bg-muted"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Allowances</label>
                  <Input
                    name="salary.allowances"
                    type="number"
                    value={formData.salary?.allowances || ""}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="2500"
                    className="bg-muted"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">CTC (Auto-calculated)</label>
                  <p className="text-lg font-semibold p-2 bg-muted rounded border border-border">
                    $
                    {(
                      (formData.salary?.basic || 0) +
                      (formData.salary?.hra || 0) +
                      (formData.salary?.allowances || 0)
                    ).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

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
                    {employee ? "Save Changes" : "Add Employee"}
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
