import { OAuth2Client } from "google-auth-library";
import { db } from "../../../../lib/server/db/index";
import { user } from "../../../../lib/server/db/schema";
import { eq } from "drizzle-orm";
import { generateUserId } from '../../../../lib/utils/random';
import jwt from "jsonwebtoken";

const CLIENT_ID = "942802219199-hrnqvkm5c0dgtfq73t7v3qagkd4nr3qp.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "http://localhost:3000/api/auth/callback";

const oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
const JWT_SECRET = "your_jwt_secret"; // Ganti dengan kunci rahasia yang kuat
const JWT_EXPIRES_IN = "7d"; // Masa berlaku token

export async function GET({ url, cookies }) {
    const code = url.searchParams.get("code");

    if (!code) {
        return new Response("Code not found", { status: 400 });
    }

    // Tukar kode dengan token
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Ambil informasi pengguna dari Google
    const userInfoResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
        headers: { Authorization: `Bearer ${tokens.access_token}` },
    });

    if (!userInfoResponse.ok) {
        return new Response("Failed to fetch user info", { status: 500 });
    }

    const userInfo = await userInfoResponse.json();

    // Periksa apakah pengguna sudah ada di database
    const existingUser = await db
        .select()
        .from(user)
        .where(eq(user.googleId, userInfo.id))
        .execute();

    if (existingUser.length === 0) {
        // Jika belum ada, masukkan pengguna baru ke database
        await db
            .insert(user)
            .values({
                id: generateUserId(),
                name: userInfo.name,
                email: userInfo.email,
                googleId: userInfo.id,
            })
            .execute();
    }

    // Buat JWT
    const tokenPayload = {
        id: userInfo.id,
        email: userInfo.email,
        name: userInfo.name,
    };

    const jwtToken = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    // Simpan JWT di cookies
    cookies.set("auth", jwtToken, {
        httpOnly: true,
        secure: true, // Ubah ke true untuk production
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 1 minggu
    });

    return new Response(null, {
        status: 302,
        headers: { Location: "/" },
    });
}

function generateUserId() {
    // ID with 120 bits of entropy, or about the same as UUID v4.
    const bytes = crypto.getRandomValues(new Uint8Array(15));
    const id = encodeBase32LowerCase(bytes);
    return id;
}
