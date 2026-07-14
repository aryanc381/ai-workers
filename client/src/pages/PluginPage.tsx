import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { GoogleCalendarCard } from "@/components/google-calendar-card"

export default function PluginPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader title="Plugins" />
        <div className="min-h-[calc(100vh-4rem)] flex-1 bg-gradient-to-b from-background to-muted/20 p-[2vw]">
          <div className="grid gap-[2vw] md:grid-cols-2 xl:grid-cols-3">
            <GoogleCalendarCard />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
