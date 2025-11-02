"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { EmployeeTable } from "@/components/employee-table"
import { EmployeeModal } from "@/components/employee-modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { mockEmployees } from "@/lib/mock-data"
import type { Employee } from "@/lib/types"
import { useState } from "react"
import { Search, Plus, Download } from "lucide-react"
import { PageGuard } from "@/components/role-guard"

function EmployeesContent() {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | undefined>()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all")

  const departments = ["all", "Engineering", "HR", "Sales", "Finance", "Operations"]

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.employeeId.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesDepartment = selectedDepartment === "all" || emp.department === selectedDepartment

    return matchesSearch && matchesDepartment
  })

  const handleViewEmployee = (employee: Employee) => {
    setSelectedEmployee(employee)
    setIsModalOpen(true)
  }

  const handleAddEmployee = () => {
    setSelectedEmployee(undefined)
    setIsModalOpen(true)
  }

  const handleEditEmployee = (employee: Employee) => {
    setSelectedEmployee(employee)
    setIsModalOpen(true)
  }

  const handleDeleteEmployee = (employeeId: string) => {
    if (confirm("Are you sure you want to delete this employee?")) {
      setEmployees((prev) => prev.filter((emp) => emp.id !== employeeId))
      setIsModalOpen(false)
    }
  }

  const handleSaveEmployee = (employee: Employee) => {
    if (employee.id && employees.some((emp) => emp.id === employee.id)) {
      // Edit existing employee
      setEmployees((prev) => prev.map((emp) => (emp.id === employee.id ? employee : emp)))
    } else {
      // Add new employee
      const newEmployee = {
        ...employee,
        id: `${Date.now()}`,
      }
      setEmployees((prev) => [...prev, newEmployee])
    }
    setIsModalOpen(false)
  }

  const handleExport = () => {
    const csv = [
      ["Name", "Email", "Department", "Designation", "Status"],
      ...filteredEmployees.map((emp) => [emp.name, emp.email, emp.department, emp.designation, emp.status]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `employees-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Employees</h2>
            <p className="text-muted-foreground mt-2">Manage and view all employees in your organization</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button onClick={handleAddEmployee}>
              <Plus className="h-4 w-4 mr-2" />
              Add Employee
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Employee Directory</CardTitle>
            <CardDescription>Total employees: {filteredEmployees.length}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto">
                {departments.map((dept) => (
                  <Button
                    key={dept}
                    variant={selectedDepartment === dept ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedDepartment(dept)}
                    className="whitespace-nowrap"
                  >
                    {dept === "all" ? "All Departments" : dept}
                  </Button>
                ))}
              </div>
            </div>

            {/* Table */}
            {filteredEmployees.length > 0 ? (
              <EmployeeTable
                employees={filteredEmployees}
                onView={handleViewEmployee}
                onEdit={handleEditEmployee}
                onDelete={handleDeleteEmployee}
              />
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No employees found</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <EmployeeModal
        employee={selectedEmployee}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedEmployee(undefined)
        }}
        onSave={handleSaveEmployee}
      />
    </DashboardLayout>
  )
}

export default function EmployeesPage() {
  return (
    <PageGuard requiredPermission="canViewEmployees">
      <EmployeesContent />
    </PageGuard>
  )
}
