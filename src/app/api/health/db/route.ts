import { NextResponse } from "next/server";
import { getDb, isMongoConfigured } from "@/lib/mongodb";

export async function GET() {
  if (!isMongoConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        message: "MONGODB_URI is empty. Paste your Atlas string in .env.local",
      },
      { status: 503 },
    );
  }

  try {
    const db = await getDb();
    if (!db) {
      return NextResponse.json(
        { ok: false, message: "Could not open database connection." },
        { status: 503 },
      );
    }

    await db.command({ ping: 1 });
    const collections = await db.listCollections().toArray();

    return NextResponse.json({
      ok: true,
      database: db.databaseName,
      collections: collections.map((c) => c.name),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Connection failed";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}
