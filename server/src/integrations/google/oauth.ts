import axios from 'axios';
import { env } from '../../env.js';

export const GOOGLE_CALENDAR_SCOPES = [
    "openid",
    "email",
    "profile",
    "https://www.googleapis.com/auth/calendar"
] as const;

export type GoogleTokenSet = {
    access_token: string;
    expires_in: number;
    refresh_token?: string;
    scope: string;
    token_type: string;
    id_token?: string;
}

export type GoogleAccountIdentity = {
    googleSubjectId: string;
    googleEmail: string;
}

// making sure that the env's are present before I even like make the GOOGLE_Auth handshake with my backend.
function requireGoogleEnv() {
    if(!env.GOOGLE_CLIENT_ID || !env.GOOGLE_CLIENT_SECRET || !env.GOOGLE_REDIRECT_URL) {
        throw new Error("Google OA uth env variables are missing.");
    }

    return {
        clientId: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
        redirectUrl: env.GOOGLE_REDIRECT_URL
    }
}

// this build the url for auth for google for a specific user
export function buildGoogleAuthUrl(state: string) {
    const { clientId, redirectUrl } = requireGoogleEnv();
    const url = new URL(env.GOOGLE_AUTH_ENDPOINT!); // so the URL is a JS object that will make me create mera google ka url. 
    url.searchParams.set("client_id", clientId); // identifies my google app 
    url.searchParams.set("response_type", "code"); // asks google ke bhai authentication code dedo
    url.searchParams.set("redirect_uri", redirectUrl); // where google should send the user post auth
    url.searchParams.set("scope", GOOGLE_CALENDAR_SCOPES.join(" ")); // what permissions is my app asking ;p
    url.searchParams.set("access_type", "offline"); // asks for a refresh token that i can renew access later.
    url.searchParams.set("prompt", "consent"); // forces google bhay to show consent screen. 
    url.searchParams.set("include_granted_scopes", "true"); // keeps already approved permissions.
    url.searchParams.set("state", state); // a random value to protect against CSRF, cross site request forgery - basically koi toh aapka req doosre site pe bhejta hein bc. 

    return url.toString();
}


// so this function is important to convert the temporary code sent by google bhay into real tokens that I wanna store like access_token, refresh_token, etc. 
export async function exchangeGoogleCode(code: string): Promise<GoogleTokenSet> {
    const { clientId, clientSecret, redirectUrl } = requireGoogleEnv();
    const body = new URLSearchParams({ // so this nigga ->> URLSearchParams is a class that is used for working with URL query params
        code, 
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUrl,
        grant_type: "authorization_code"
    });

    const { data } = await axios.post<GoogleTokenSet>(
        env.GOOGLE_TOKEN_ENDPOINT!,
        body.toString(),
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded" // so this basically means that data will be accepted in form of key-value pairs
            }
        }
    );
    return data;
}

// this 
export async function fetchGoogleAccountIdentity(accessToken: string): Promise<GoogleAccountIdentity> {
    const { data } = await axios.get<{sub: string; email: string }>(
        env.GOOGLE_AUTH_ENDPOINT!,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    );

    return {
        googleSubjectId: data.sub,
        googleEmail: data.email
    }
}