import { Calendar, Home, Inbox, Search, Settings, User } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter,
} from "@/components/ui/sidebar"

const items = [
    { title: "Home", url: "#", icon: Home },
    { title: "Inbox", url: "#", icon: Inbox },
    { title: "Calendar", url: "#", icon: Calendar },
    { title: "Search", url: "#", icon: Search },
    { title: "Settings", url: "#", icon: Settings },
]

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon">
            {/* --- MAIN CONTENT --- */}
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="mt-1 font-bold text-2xl">
                        ChatGPT
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="mt-10">
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url} className="flex items-center gap-2">
                                            <item.icon className="h-5 w-5" />
                                            <span className="truncate">{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {/* --- FOOTER (Profile only) --- */}
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <a href="#profile" className="flex items-center gap-2">
                                <User className="h-5 w-5" />
                                <span className="truncate">Profile</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
