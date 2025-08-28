import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const featured = searchParams.get('featured');
    const limit = searchParams.get('limit');
    const type = searchParams.get('type');

    // Build query filters
    const where: any = {};
    if (status && status !== 'all') where.status = status;
    if (featured === 'true') where.featured = true;
    if (type && type !== 'all') where.type = type;

    // Limit results
    const take = limit ? parseInt(limit) : undefined;

    const events = await prisma.event.findMany({
      where,
      orderBy: { date: 'asc' },
      take,
    });

    // Transform data if needed
    const transformed = events.map((e: any) => ({
      id: e.id || e._id,
      _id: e._id || e.id,
      title: e.title,
      description: e.description,
      date: e.date,
      location: e.location,
      type: e.type,
      status: e.status,
      image: e.image,
      featured: e.featured,
      ticketPrice: e.ticketPrice,
      ticketUrl: e.ticketUrl,
      capacity: e.capacity,
      lineup: Array.isArray(e.lineup)
        ? e.lineup.map((a: any) => ({ id: a._id || a.id, name: a.name }))
        : [],
    }));

    return NextResponse.json(transformed);
  } catch (error: any) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const eventData = await request.json();

    const created = await prisma.event.create({ data: eventData });

    return NextResponse.json(
      { message: 'Event created successfully', event: created },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating event:', error);
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
}
