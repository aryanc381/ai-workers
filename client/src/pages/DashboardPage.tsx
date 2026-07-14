import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";

export default function DashboardPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader title="Configuration" />
        <div className="flex flex-1 flex-col gap-4 p-4">
          
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
