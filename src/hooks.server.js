import jwt from "jsonwebtoken";
import { redirect } from '@sveltejs/kit';

const JWT_SECRET = process.env.JWT_SECRET; // Gunakan kunci rahasia yang kuat

export async function handle({ event, resolve }) {
    const token = event.cookies.get("auth");

    if (token) {
        try {
            // Verifikasi dan decode token JWT
            const decodedToken = jwt.verify(token, JWT_SECRET);

            // Simpan informasi pengguna di `locals` agar dapat diakses di seluruh aplikasi
            event.locals.user = {
                id: decodedToken.id,
                name: decodedToken.name,
                email: decodedToken.email,
            };
        } catch (error) {
            console.error("Invalid or expired JWT:", error);
            event.locals.user = null;

            // Hapus cookie jika token tidak valid
            event.cookies.delete("auth", { path: '/' });
        }
    } else {
        event.locals.user = null; // Jika tidak ada token, tidak ada data pengguna
    }

    // Izinkan akses ke halaman login, register, dan endpoint auth tanpa autentikasi
    if (
        !event.locals.user &&
        event.url.pathname !== "/login" &&
        event.url.pathname !== "/register" &&
        !event.url.pathname.startsWith("/api/auth")
    ) {
        // Simpan URL tujuan di cookies sebelum redirect ke login
        const redirectUrl = event.url.pathname + event.url.search;
        event.cookies.set('redirectUrl', redirectUrl, {
            path: '/',
            httpOnly: true,
            secure: true,
            maxAge: 60 * 5, // Simpan selama 5 menit
        });

        // Redirect ke halaman login
        throw redirect(302, '/login');
    }

    // Cegah pengguna yang sudah login mengakses halaman login dan register
    if (event.locals.user && (event.url.pathname === "/login" || event.url.pathname === "/register")) {
        throw redirect(302, '/'); // Arahkan ke halaman utama
    }

    return resolve(event);
}