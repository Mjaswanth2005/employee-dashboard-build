type Role = "employee" | "hr" | "admin"

interface RolePermissions {
  canViewDashboard: boolean
  canViewEmployees: boolean
  canEditEmployees: boolean
  canDeleteEmployees: boolean
  canViewAttendance: boolean
  canManageAttendance: boolean
  canViewLeaves: boolean
  canApplyLeave: boolean
  canApproveLeave: boolean
  canViewPayroll: boolean
  canManagePayroll: boolean
  canViewSettings: boolean
  canEditSettings: boolean
}

const permissions: Record<Role, RolePermissions> = {
  employee: {
    canViewDashboard: true,
    canViewEmployees: false,
    canEditEmployees: false,
    canDeleteEmployees: false,
    canViewAttendance: true,
    canManageAttendance: false,
    canViewLeaves: true,
    canApplyLeave: true,
    canApproveLeave: false,
    canViewPayroll: true,
    canManagePayroll: false,
    canViewSettings: false,
    canEditSettings: false,
  },
  hr: {
    canViewDashboard: true,
    canViewEmployees: true,
    canEditEmployees: true,
    canDeleteEmployees: false,
    canViewAttendance: true,
    canManageAttendance: true,
    canViewLeaves: true,
    canApplyLeave: true,
    canApproveLeave: true,
    canViewPayroll: true,
    canManagePayroll: true,
    canViewSettings: true,
    canEditSettings: false,
  },
  admin: {
    canViewDashboard: true,
    canViewEmployees: true,
    canEditEmployees: true,
    canDeleteEmployees: true,
    canViewAttendance: true,
    canManageAttendance: true,
    canViewLeaves: true,
    canApplyLeave: true,
    canApproveLeave: true,
    canViewPayroll: true,
    canManagePayroll: true,
    canViewSettings: true,
    canEditSettings: true,
  },
}

export function getPermissions(role: Role): RolePermissions {
  return permissions[role]
}

export function can(role: Role, action: keyof RolePermissions): boolean {
  return permissions[role][action]
}
