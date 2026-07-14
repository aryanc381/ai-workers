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

export async function getGoogleLinkStatus(userId: number) {
  const response = await fetch(`${requireApiBaseUrl()}/api/v1/providers/google/status?userId=${userId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch Google link status.");
  }

  const data = await response.json();
  return data.data as GoogleLinkStatus;
}

export function getGoogleAuthUrl(userId: number, phoneNumber: string) {
  return `${requireApiBaseUrl()}/api/v1/providers/google/start?userId=${userId}&phoneNumber=${phoneNumber}`;
}
