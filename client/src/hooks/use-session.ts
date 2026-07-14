import { useEffect, useState } from "react";
import { getSession } from "@/services/auth.service";

export type SessionUser = {
  id: number;
  email: string;
  fullName: string;
};

export function useSession() {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    getSession()
      .then((data) => {
        if (active) {
          setUser(data.user);
        }
      })
      .catch(() => {
        if (active) {
          setUser(null);
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  return { user, loading };
}
