"use client"

import type { Employee } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreVertical, Edit, Trash2, Eye } from "lucide-react"

interface EmployeeTableProps {
  employees: Employee[]
  onView?: (employee: Employee) => void
  onEdit?: (employee: Employee) => void
  onDelete?: (employeeId: string) => void
}

export function EmployeeTable({ employees, onView, onEdit, onDelete }: EmployeeTableProps) {
  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <table className="w-full">
        <thead className="bg-muted">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Name</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Email</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Department</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Designation</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {employees.map((employee) => (
            <tr key={employee.id} className="hover:bg-muted/50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold">
                    {employee.name.substring(0, 1)}
                  </div>
                  <span className="font-medium text-foreground">{employee.name}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-muted-foreground">{employee.email}</td>
              <td className="px-6 py-4 text-sm text-foreground">{employee.department}</td>
              <td className="px-6 py-4 text-sm text-foreground">{employee.designation}</td>
              <td className="px-6 py-4">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    employee.status === "active" ? "bg-accent/20 text-accent" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {employee.status === "active" ? "Active" : "Inactive"}
                </span>
              </td>
              <td className="px-6 py-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {onView && (
                      <DropdownMenuItem onClick={() => onView(employee)}>
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </DropdownMenuItem>
                    )}
                    {onEdit && (
                      <DropdownMenuItem onClick={() => onEdit(employee)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                    )}
                    {onDelete && (
                      <DropdownMenuItem onClick={() => onDelete(employee.id)} className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
