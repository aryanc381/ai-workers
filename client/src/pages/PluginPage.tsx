import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { GoogleCalendarCard } from "@/components/google-calendar-card"

export default function PluginPage() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const googleStatus = params.get("google")

    if (googleStatus === "linked") {
      toast.success("Google calendar setup was successful.")
      params.delete("google")
      navigate({ pathname: location.pathname, search: params.toString() ? `?${params.toString()}` : "" }, { replace: true })
      return
    }

    if (googleStatus === "failed") {
      toast.error("Google authentication failed.")
      params.delete("google")
      navigate({ pathname: location.pathname, search: params.toString() ? `?${params.toString()}` : "" }, { replace: true })
    }
  }, [location.pathname, location.search, navigate])

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
