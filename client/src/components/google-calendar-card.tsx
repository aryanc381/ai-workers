import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { getGoogleAuthUrl, getGoogleLinkStatus, type GoogleLinkStatus } from "@/services/google.service"

const userId = 1
const phoneNumber = "9999999999"

export function GoogleCalendarCard() {
  const [status, setStatus] = useState<GoogleLinkStatus | null>(null)

  useEffect(() => {
    getGoogleLinkStatus(userId)
      .then((data) => setStatus(data))
      .catch(() => setStatus(null))
  }, [])

  const handleLink = () => {
    window.location.href = getGoogleAuthUrl(userId, phoneNumber)
  }

  const isLinked = Boolean(status?.linked)

  return (
    <Card className="relative h-full min-h-[32vh] w-full overflow-hidden border-border/60 bg-background/90 shadow-sm">
      <CardHeader className="space-y-[0.75vh] p-[0.75vw]">
        <div className="flex items-start justify-between gap-[0.75vw]">
          <div>
            <CardTitle className="text-2xl">Google Calendar</CardTitle>
            <CardDescription className="mt-[0.35vh] max-w-lg">
              Link your calendar so the agent can block time and manage availability.
            </CardDescription>
          </div>
          <div
            className={cn(
              "mr-[0.5vw] flex h-[3vw] w-[3vw] min-h-10 min-w-10 max-h-12 max-w-12 items-center justify-center overflow-hidden bg-background"
            )}
          >
            <img
              src="/google-calendar-logo.png"
              alt="Google Calendar"
              className="size-full object-cover"
            />
          </div>
        </div>
        <div className="grid gap-[0.5vw] rounded-2xl border border-dashed border-border/70 bg-muted/30 p-[0.75vw] text-sm sm:grid-cols-2">
          <div>
            <div className="text-muted-foreground">Google Email</div>
            <div className="mt-[0.25vh] font-medium">{status?.googleAccount?.googleEmail ?? "-"}</div>
          </div>
          <div>
            <div className="text-muted-foreground">Phone Number</div>
            <div className="mt-[0.25vh] font-medium">{status?.googleAccount?.phoneNumber ?? phoneNumber}</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-[0.5vw] p-[0.75vw] pt-[0.15vw]">
        <div className="rounded-2xl border border-border/70 bg-muted/20 p-[0.75vw] text-sm">
          <div className="flex items-center justify-between gap-[0.5vw]">
            <span className="text-muted-foreground">Link status</span>
            <span className="font-medium">{isLinked ? "Linked" : "Awaiting connection"}</span>
          </div>
        </div>
        <Button onClick={handleLink} className="w-full cursor-pointer sm:w-auto">
          {isLinked ? "Reconnect Google Calendar" : "Link Google Calendar"}
        </Button>
      </CardContent>
    </Card>
  )
}
