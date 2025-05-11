"use client"

import { Bot, Heart, Home } from "lucide-react"
import * as React from "react"
import { useLocation, useNavigate } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar"
import DashboardNavUser from "./dashboard-nav-user"

const data = {
  user: {
    name: "Alfandika",
    email: "dikalfan@gmail.com",
    avatar: "https://scontent.fsub8-2.fna.fbcdn.net/v/t1.6435-9/57504316_1090054981198458_2262218480927375360_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHS2Q7voFwfFgP_uNPSGTgCvepTxr8aJEa96lPGvxokRsUuFSalCfw6WMOStMrgAwkS8PJlp6EVUyt3QGjf_r7E&_nc_ohc=iDEqJ24gc3QQ7kNvwHYSP7v&_nc_oc=AdkfMa_1tK13wzQvY-cmDVjoTDBtFU-9BhgWDnuzy6WXawozv3v9TlGirqfYsSMxr5g&_nc_zt=23&_nc_ht=scontent.fsub8-2.fna&_nc_gid=dqhZYjC8CIBp7SBcMNi4AQ&oh=00_AfK-0kx3uh8DZcqNlF8Tku1HThLxp07-PoKCmkt7atnKrg&oe=684825B7",
  },
  navMain: [
    {
      title: "Percakapan",
      url: "/dashboard",
      icon: Bot,
      isActive: true,
    },
    {
      title: "Properti Favorit",
      url: "/favorites",
      icon: Heart,
      isActive: false,
    },
  ],
}

export default function DashboardAppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row"
      {...props}
    >
      <Sidebar
        collapsible="none"
        className="!w-[calc(var(--sidebar-width-icon)_+_1px)]"
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
                <a href="#">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <Home className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">TinggalSewa</span>
                    <span className="truncate text-xs">Properti untuk Anda</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu>
                {data.navMain.map((item) => {
                  const isActive = location.pathname === item.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                      {location.pathname === item.url && (
                        <div className="absolute left-0 top-0 h-full w-1 bg-primary rounded-r-md" />
                      )}
                      <SidebarMenuButton
                        tooltip={{
                          children: item.title,
                          hidden: false,
                        }}
                        onClick={() => {
                          navigate(item.url);
                        }}
                        isActive={isActive}
                        className={`cursor-pointer px-2.5 md:px-2 ${location.pathname === item.url ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground" : ""}`}
                      >
                        <item.icon className={location.pathname === item.url ? "text-primary" : ""} />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <DashboardNavUser />
        </SidebarFooter>
      </Sidebar>
    </Sidebar>
  )
}
