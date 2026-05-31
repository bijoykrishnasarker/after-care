import { MongoClient, ServerApiVersion, type Db } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME ?? "aftercare";

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function createClient() {
  if (!uri) {
    return null;
  }

  return new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
}

function createClientPromise() {
  const client = createClient();
  if (!client) {
    return null;
  }

  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      global._mongoClientPromise = client.connect();
    }
    return global._mongoClientPromise;
  }

  return client.connect();
}

const clientPromise = createClientPromise();

export async function getDb(): Promise<Db | null> {
  if (!clientPromise) {
    return null;
  }

  const client = await clientPromise;
  return client.db(dbName);
}

export function isMongoConfigured() {
  return Boolean(uri);
}
