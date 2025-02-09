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
    members: integer('members').notNull(),
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
    juz: integer('juz').notNull(),
    memberId: uuid('member_id').notNull().references(() => member.id, { onDelete: 'cascade' }), // Add onDelete cascade here
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

// export const progress = pgTable('progress', {
//     id: uuid('id').defaultRandom().primaryKey(),
//     juz: integer('juz').notNull(),
//     surah: integer('surah').notNull(),
//     page: integer('page').notNull(),
//     ayat: integer('ayat').notNull(),
//     memberId: uuid('member_id').notNull().references(() => member.id, { onDelete: 'cascade' }), // Add onDelete cascade here
//     createdAt: timestamp('created_at').defaultNow().notNull(),
// });

export const progress = pgTable('progress', {
    id: uuid('id').defaultRandom().primaryKey(),
    startJuz: integer('start_juz').notNull(),
    startSurah: integer('start_surah').notNull(),
    startPage: integer('start_page').notNull(),
    startAyat: integer('start_ayat').notNull(),
    endJuz: integer('end_juz').notNull(),
    endSurah: integer('end_surah').notNull(),
    endPage: integer('end_page').notNull(),
    endAyat: integer('end_ayat').notNull(),
    amount: integer('amount').notNull(),
    memberId: uuid('member_id').notNull().references(() => member.id, { onDelete: 'cascade' }), // Add onDelete cascade here
    createdAt: timestamp('created_at').defaultNow().notNull(),
});
