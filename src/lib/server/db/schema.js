import { pgTable, serial, text, integer, timestamp, date } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
	id: text('id').primaryKey(),          // ID unik untuk setiap pengguna
	email: text('email').notNull().unique(),  // Email unik, wajib diisi
	name: text('name').notNull(),             // Nama pengguna, wajib diisi
	passwordHash: text('password_hash'),               // Kata sandi untuk autentikasi lokal
	googleId: text('google_id').unique(),     // ID Google (unik, opsional)
	createdAt: timestamp('created_at')        // Timestamp waktu pembuatan
		.defaultNow()                           // Secara otomatis diisi waktu saat insert
		.notNull(),
});

export const sessionLocal = pgTable('session_local', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

export const plan = pgTable('plan', {
	id: text('id').primaryKey().unique(),
	name: text('name').notNull(),
	targetKhatam: date('target_khatam').notNull(),
	anggota: integer('anggota').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const distribution = pgTable('distribution', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	juz: integer('jus').notNull(),
	planId: text('plan_id').notNull().references(() => plan.id),
	createdAt: timestamp('created_at').defaultNow().notNull(),
});

