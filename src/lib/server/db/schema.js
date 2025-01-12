import { pgTable, serial, text, integer, timestamp, uuid, date } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
    id: text('id').primaryKey(),
    email: text('email').notNull().unique(),
    name: text('name').notNull(),
    passwordHash: text('password_hash'),
    googleId: text('google_id').unique(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const plan = pgTable('plan', {
    id: text('id').notNull().primaryKey().unique(),
    name: text('name').notNull(),
    targetKhatam: date('target_khatam').notNull(),
    anggota: integer('anggota').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const member = pgTable('member', {
    id: uuid('id').defaultRandom().primaryKey(),
    name: text('name').notNull(),
    planId: text('plan_id').notNull().references(() => plan.id, { onDelete: 'cascade' }),  // Add onDelete cascade here
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const tadarus = pgTable('tadarus', {
    id: uuid('id').defaultRandom().primaryKey(),
    juz: integer('juz').notNull().unique(),
    memberId: uuid('member_id').notNull().references(() => member.id, { onDelete: 'cascade' }), // Add onDelete cascade here
    createdAt: timestamp('created_at').defaultNow().notNull(),
});
