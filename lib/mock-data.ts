import type { Employee, Attendance, LeaveRequest, Payslip, LeaveBalance } from "./types"

export const mockEmployees: Employee[] = [
  {
    id: "1",
    employeeId: "EMP001",
    name: "John Doe",
    email: "john.doe@company.com",
    phone: "+1-555-0101",
    department: "Engineering",
    designation: "Senior Developer",
    joinDate: "2022-01-15",
    status: "active",
    salary: { basic: 100000, hra: 15000, allowances: 5000, ctc: 120000 },
    manager: "Alice Johnson",
  },
  {
    id: "2",
    employeeId: "EMP002",
    name: "Jane Smith",
    email: "jane.smith@company.com",
    phone: "+1-555-0102",
    department: "HR",
    designation: "HR Manager",
    joinDate: "2021-06-01",
    status: "active",
    salary: { basic: 80000, hra: 12000, allowances: 3000, ctc: 95000 },
  },
]

export const mockAttendance: Attendance[] = Array.from({ length: 30 }, (_, i) => ({
  id: `att-${i}`,
  employeeId: "EMP001",
  date: new Date(Date.now() - (30 - i) * 86400000).toISOString().split("T")[0],
  clockIn: i % 3 === 0 ? null : `08:${String((i * 7) % 60).padStart(2, "0")}`,
  clockOut: i % 3 === 0 ? null : `17:${String((i * 7 + 30) % 60).padStart(2, "0")}`,
  workingHours: i % 3 === 0 ? 0 : 8.5,
  status: i % 3 === 0 ? "absent" : i % 5 === 0 ? "half-day" : "present",
}))

export const mockLeaveRequests: LeaveRequest[] = [
  {
    id: "1",
    employeeId: "EMP001",
    leaveType: "Casual",
    startDate: "2024-12-20",
    endDate: "2024-12-22",
    days: 3,
    reason: "Personal work",
    status: "pending",
  },
  {
    id: "2",
    employeeId: "EMP001",
    leaveType: "Sick",
    startDate: "2024-11-15",
    endDate: "2024-11-16",
    days: 2,
    reason: "Medical appointment",
    status: "approved",
    approvedBy: "Alice Johnson",
  },
]

export const mockPayslips: Payslip[] = [
  {
    id: "1",
    employeeId: "EMP001",
    month: "November",
    year: 2024,
    earnings: { basic: 100000, hra: 15000, da: 5000, allowances: 5000 },
    deductions: { pf: 12500, esi: 0, tax: 18000, other: 0 },
    grossSalary: 125000,
    netSalary: 94500,
    daysPresent: 22,
    daysLeave: 2,
    daysLOP: 0,
  },
]

export const mockLeaveBalance: LeaveBalance[] = [
  { leaveType: "Casual", total: 12, used: 3, remaining: 9, color: "#3b82f6" },
  { leaveType: "Sick", total: 6, used: 2, remaining: 4, color: "#10b981" },
  { leaveType: "Earned", total: 15, used: 5, remaining: 10, color: "#f59e0b" },
]
