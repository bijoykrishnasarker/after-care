import { randomUUID } from "crypto";
import { getDb, isMongoConfigured } from "@/lib/mongodb";

export type AccessGrant = {
  email: string;
  paymentIntentId: string;
  accessToken: string;
  grantedAt: string;
};

const collectionName = "access_grants";
const devGrants = new Map<string, AccessGrant>();
let indexesReady = false;

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function buildGrant(input: { email: string; paymentIntentId: string }): AccessGrant {
  return {
    email: normalizeEmail(input.email),
    paymentIntentId: input.paymentIntentId,
    accessToken: randomUUID(),
    grantedAt: new Date().toISOString(),
  };
}

async function getAccessCollection() {
  const db = await getDb();
  if (!db) return null;

  const collection = db.collection<AccessGrant>(collectionName);

  if (!indexesReady) {
    await collection.createIndex({ email: 1 }, { unique: true });
    await collection.createIndex({ accessToken: 1 }, { unique: true });
    await collection.createIndex({ paymentIntentId: 1 }, { unique: true });
    indexesReady = true;
  }

  return collection;
}

function findDevGrant(input: { email?: string; token?: string; paymentIntentId?: string }) {
  for (const grant of devGrants.values()) {
    if (input.email && grant.email === normalizeEmail(input.email)) return grant;
    if (input.token && grant.accessToken === input.token) return grant;
    if (input.paymentIntentId && grant.paymentIntentId === input.paymentIntentId) {
      return grant;
    }
  }
  return null;
}

export async function grantAccess(input: {
  email: string;
  paymentIntentId: string;
}) {
  const email = normalizeEmail(input.email);
  const collection = await getAccessCollection();

  if (collection) {
    const existing = await collection.findOne({
      $or: [{ email }, { paymentIntentId: input.paymentIntentId }],
    });

    if (existing) return existing;

    const grant = buildGrant(input);

    try {
      await collection.insertOne(grant);
      return grant;
    } catch {
      const duplicate = await collection.findOne({
        $or: [{ email }, { paymentIntentId: input.paymentIntentId }],
      });
      if (duplicate) return duplicate;
      throw new Error("Unable to save access grant.");
    }
  }

  const existing = findDevGrant({ email, paymentIntentId: input.paymentIntentId });
  if (existing) return existing;

  const grant = buildGrant(input);
  devGrants.set(grant.email, grant);
  return grant;
}

export async function hasAccess(email: string) {
  const normalized = normalizeEmail(email);
  const collection = await getAccessCollection();

  if (collection) {
    return Boolean(await collection.findOne({ email: normalized }));
  }

  return devGrants.has(normalized);
}

export async function getGrantByToken(token: string) {
  const collection = await getAccessCollection();

  if (collection) {
    return collection.findOne({ accessToken: token });
  }

  return findDevGrant({ token });
}

export async function getGrantByEmail(email: string) {
  const normalized = normalizeEmail(email);
  const collection = await getAccessCollection();

  if (collection) {
    return collection.findOne({ email: normalized });
  }

  return devGrants.get(normalized) ?? null;
}

export { isMongoConfigured };
