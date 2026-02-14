import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB ?? 'portfolio');
    const comments = await db
      .collection('comments')
      .find()
      .sort({ createdAt: -1 })
      .limit(100)
      .toArray();

    const sanitized = comments.map((c) => ({
      ...c,
      _id: String(c._id),
      createdAt: c.createdAt instanceof Date ? c.createdAt.toISOString() : c.createdAt,
    }));

    return NextResponse.json(sanitized);
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error('GET /api/comments error:', errorMsg, err);
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, comment, rating } = body as { name?: string; comment?: string; rating?: number };
    if (!name || !comment) {
      return NextResponse.json({ error: 'Missing fields: name and comment are required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB ?? 'portfolio');
    const doc = { name, comment, rating: rating ? Number(rating) : null, createdAt: new Date() };
    const result = await db.collection('comments').insertOne(doc);

    return NextResponse.json({ insertedId: String(result.insertedId) }, { status: 201 });
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error('POST /api/comments error:', errorMsg, err);
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
