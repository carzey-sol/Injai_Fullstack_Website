import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const featured = searchParams.get('featured');
    const limit = searchParams.get('limit');
    const type = searchParams.get('type');

    // Build query
    const query: any = {};
    
    if (status && status !== 'all') {
      query.status = status;
    }
    
    if (featured === 'true') {
      query.featured = true;
    }

    if (type && type !== 'all') {
      query.type = type;
    }

    // Build options
    const take = limit ? parseInt(limit) : undefined;
    const events = await prisma.event.findMany({
      where: {
        status: status && status !== 'all' ? status : undefined,
        featured: featured === 'true' ? true : undefined,
        type: type && type !== 'all' ? type : undefined,
      },
      orderBy: { date: 'asc' },
      take,
    });

    const transformed = events.map((e: any) => ({
      id: e._id,
      _id: e._id,
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
      lineup: Array.isArray(e.lineup) ? e.lineup.map((a: any) => ({ id: a._id, name: a.name })) : []
    }));

    return NextResponse.json(transformed);

  } catch (error: any) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const eventData = await request.json();

    const created = await prisma.event.create({ data: eventData });
    return NextResponse.json({ message: 'Event created successfully', event: created }, { status: 201 });

  } catch (error: any) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
} 