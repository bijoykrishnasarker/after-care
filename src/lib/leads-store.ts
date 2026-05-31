import { getDb, isMongoConfigured } from "@/lib/mongodb";

export type Lead = {
  email: string;
  source: string;
  subscribedAt: string;
  nurtureStep: number;
  lastEmailAt: string | null;
};

const collectionName = "leads";
let indexesReady = false;

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

async function getLeadsCollection() {
  const db = await getDb();
  if (!db) return null;

  const collection = db.collection<Lead>(collectionName);

  if (!indexesReady) {
    await collection.createIndex({ email: 1 }, { unique: true });
    await collection.createIndex({ nurtureStep: 1, subscribedAt: 1 });
    indexesReady = true;
  }

  return collection;
}

export async function captureLead(input: { email: string; source?: string }) {
  const email = normalizeEmail(input.email);
  const source = input.source ?? "lead-magnet";
  const now = new Date().toISOString();

  const collection = await getLeadsCollection();
  if (!collection) {
    return {
      email,
      source,
      subscribedAt: now,
      nurtureStep: 0,
      lastEmailAt: null,
      isNew: true,
    };
  }

  const existing = await collection.findOne({ email });
  if (existing) {
    return { ...existing, isNew: false };
  }

  const lead: Lead = {
    email,
    source,
    subscribedAt: now,
    nurtureStep: 0,
    lastEmailAt: null,
  };

  await collection.insertOne(lead);
  return { ...lead, isNew: true };
}

export async function markLeadEmailSent(email: string, nurtureStep: number) {
  const collection = await getLeadsCollection();
  if (!collection) return;

  await collection.updateOne(
    { email: normalizeEmail(email) },
    {
      $set: {
        nurtureStep,
        lastEmailAt: new Date().toISOString(),
      },
    },
  );
}

export async function getLeadsForNurture(maxStep: number) {
  const collection = await getLeadsCollection();
  if (!collection) return [];

  return collection
    .find({ nurtureStep: { $lt: maxStep } })
    .sort({ subscribedAt: 1 })
    .limit(100)
    .toArray();
}

export { isMongoConfigured };
