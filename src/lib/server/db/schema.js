import { pgTable, serial, text, integer, timestamp, date } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
	id: text('id').primaryKey(),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull()
});

export const session = pgTable('session', {
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

