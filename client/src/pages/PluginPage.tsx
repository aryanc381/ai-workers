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
        <div className="flex flex-1 flex-col gap-4 bg-gradient-to-b from-background to-muted/20 p-4 lg:p-6">
          <GoogleCalendarCard />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
