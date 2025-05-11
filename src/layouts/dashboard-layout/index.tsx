import {
  SidebarProvider
} from "@/components/ui/sidebar"
import { Outlet } from "react-router-dom"
import DashboardAppSidebar from "./dashboard-app-sidebar"

export default function DashboardLayout() {
  return (
    <SidebarProvider
      style={
        {
          "display": "block",
          "--sidebar-width": "auto",
        } as React.CSSProperties
      }
    >
      <DashboardAppSidebar />
      <div className="flex flex-1 flex-col gap-4 pl-[50px]">
        <Outlet />
      </div>
    </SidebarProvider>
  )
}
