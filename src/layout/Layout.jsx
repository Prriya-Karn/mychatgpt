import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import ThemeToggle from "@/ThemeToggle"

export default function Layout({ children }) {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full">
                {/* Sidebar */}
                <AppSidebar />

                {/* Main content */}
                <div className="flex flex-1 flex-col">
                    {/* Top bar */}
                    <header className="flex h-14 items-center px-4">
                        {/* Trigger sits here when expanded */}

                        <SidebarTrigger className="hover:bg-transparent md:-ml-[54px] z-20 cursor-e-resize" />

                    </header>

                    {/* Page content */}
                    <main className="flex-1 p-4">{children}</main>
                </div>
            </div>
        </SidebarProvider>
    )
}
