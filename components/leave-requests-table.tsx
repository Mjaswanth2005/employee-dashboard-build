"use client"

import type { LeaveRequest } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreVertical, Check, X } from "lucide-react"

interface LeaveRequestsTableProps {
  requests: LeaveRequest[]
  onApprove?: (requestId: string) => void
  onReject?: (requestId: string) => void
}

export function LeaveRequestsTable({ requests, onApprove, onReject }: LeaveRequestsTableProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-orange-500/20 text-orange-600"
      case "approved":
        return "bg-accent/20 text-accent"
      case "rejected":
        return "bg-destructive/20 text-destructive"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <table className="w-full">
        <thead className="bg-muted">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Type</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Duration</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Reason</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {requests.map((request) => (
            <tr key={request.id} className="hover:bg-muted/50 transition-colors">
              <td className="px-6 py-4 text-sm font-medium text-foreground">{request.leaveType}</td>
              <td className="px-6 py-4 text-sm text-foreground">
                <div>
                  <p>
                    {new Date(request.startDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}{" "}
                    -{" "}
                    {new Date(request.endDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-xs text-muted-foreground">{request.days} days</p>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-muted-foreground">{request.reason}</td>
              <td className="px-6 py-4">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadge(
                    request.status,
                  )}`}
                >
                  {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4">
                {request.status === "pending" ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {onApprove && (
                        <DropdownMenuItem onClick={() => onApprove(request.id)} className="text-accent">
                          <Check className="h-4 w-4 mr-2" />
                          Approve
                        </DropdownMenuItem>
                      )}
                      {onReject && (
                        <DropdownMenuItem onClick={() => onReject(request.id)} className="text-destructive">
                          <X className="h-4 w-4 mr-2" />
                          Reject
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <span className="text-xs text-muted-foreground">
                    {request.approvedBy && `By ${request.approvedBy}`}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
