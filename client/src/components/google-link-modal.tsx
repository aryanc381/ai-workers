import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type GoogleLinkModalProps = {
  open: boolean
  onClose: () => void
  onConfirm: (phoneNumber: string) => void
  defaultPhoneNumber?: string
}

export function GoogleLinkModal({ open, onClose, onConfirm, defaultPhoneNumber = "" }: GoogleLinkModalProps) {
  const [phoneNumber, setPhoneNumber] = useState(defaultPhoneNumber)
  const [error, setError] = useState("")

  useEffect(() => {
    if (open) {
      setPhoneNumber(defaultPhoneNumber)
      setError("")
    }
  }, [defaultPhoneNumber, open])

  if (!open) {
    return null
  }

  const handleSubmit = () => {
    if (!/^\d{10}$/.test(phoneNumber)) {
      setError("Enter a valid 10 digit phone number.")
      return
    }

    onConfirm(phoneNumber)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-[4vw] backdrop-blur-sm animate-in fade-in-0"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[34rem] rounded-2xl border border-border/70 bg-background shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="space-y-[1vh] p-[1.25vw]">
          <div className="space-y-[0.5vh]">
            <div className="text-[1.15rem] font-medium">Link Google Calendar</div>
            <p className="text-sm text-muted-foreground">
              Enter the 10 digit phone number for this account before continuing.
            </p>
          </div>

          <div className="space-y-[0.5vh]">
            <label htmlFor="google-phone" className="text-sm text-muted-foreground">
              Phone Number
            </label>
            <input
              id="google-phone"
              type="tel"
              inputMode="numeric"
              maxLength={10}
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value.replace(/\D/g, ""))
                setError("")
              }}
              placeholder="9999999999"
              className={cn(
                "h-[5.25vh] w-full rounded-xl border border-border/70 bg-background text-base outline-none",
                "p-[0.75vw] text-foreground placeholder:text-muted-foreground focus:border-ring"
              )}
            />
            {error ? <div className="text-sm text-destructive">{error}</div> : null}
          </div>
        </div>

        <div className="flex items-center justify-end gap-[0.75vw] border-t border-border/70 p-[1vw]">
          <Button type="button" variant="outline" onClick={onClose} className="cursor-pointer">
            Cancel
          </Button>
          <Button type="button" onClick={handleSubmit} className="cursor-pointer">
            Link Google Calendar
          </Button>
        </div>
      </div>
    </div>
  )
}
