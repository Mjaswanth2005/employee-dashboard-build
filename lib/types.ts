export interface User {
  id: string
  email: string
  name: string
  role: "employee" | "hr" | "admin"
  department: string
  avatar?: string
  employeeId: string
}

export interface Employee {
  id: string
  employeeId: string
  name: string
  email: string
  phone: string
  avatar?: string
  department: string
  designation: string
  joinDate: string
  status: "active" | "inactive"
  salary: {
    basic: number
    hra: number
    allowances: number
    ctc: number
  }
  manager?: string
}

export interface Attendance {
  id: string
  employeeId: string
  date: string
  clockIn: string | null
  clockOut: string | null
  workingHours: number
  status: "present" | "absent" | "leave" | "holiday" | "half-day"
  location?: { lat: number; lng: number }
}

export interface LeaveRequest {
  id: string
  employeeId: string
  leaveType: string
  startDate: string
  endDate: string
  days: number
  reason: string
  status: "pending" | "approved" | "rejected"
  approvedBy?: string
  comments?: string
  attachment?: string
}

export interface Payslip {
  id: string
  employeeId: string
  month: string
  year: number
  earnings: {
    basic: number
    hra: number
    da: number
    allowances: number
  }
  deductions: {
    pf: number
    esi: number
    tax: number
    other: number
  }
  grossSalary: number
  netSalary: number
  daysPresent: number
  daysLeave: number
  daysLOP: number
}

export interface LeaveBalance {
  leaveType: string
  total: number
  used: number
  remaining: number
  color: string
}
