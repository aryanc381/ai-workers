const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string | undefined;

export type GoogleAccount = {
  googleEmail: string;
  phoneNumber: string;
};

export type GoogleLinkStatus = {
  linked: boolean;
  googleAccount: GoogleAccount | null;
};

function requireApiBaseUrl() {
  if (!API_BASE_URL) {
    throw new Error("VITE_API_BASE_URL is missing.");
  }

  return API_BASE_URL;
}

export async function getGoogleLinkStatus() {
  const response = await fetch(`${requireApiBaseUrl()}/api/v1/providers/google/status`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch Google link status.");
  }

  const data = await response.json();
  return data.data as GoogleLinkStatus;
}

export function getGoogleAuthUrl(phoneNumber: string) {
  return `${requireApiBaseUrl()}/api/v1/providers/google/start?phoneNumber=${phoneNumber}`;
}
