import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const revalidate = 0;

// GET /api/artists
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const limit = searchParams.get('limit');

    const where: any = {};
    if (category && category !== 'all') {
      where.category = category;
    }
    if (featured === 'true') {
      where.featured = true;
    }

    const take = limit ? parseInt(limit) : undefined;

    const artists = await prisma.artist.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take,
    });

    return NextResponse.json(
      artists.map((a) => ({
        id: a.id,
        name: a.name,
        bio: a.bio,
        category: a.category,
        image: a.image,
        thumbnail: a.thumbnail,
        stats: {
          yearsActive: a.yearsActive,
          tracksReleased: a.tracksReleased,
          streams: a.streams,
        },
        featured: a.featured,
      }))
    );
  } catch (error) {
    console.error('Error fetching artists:', error);
    return NextResponse.json(
      { error: 'Failed to fetch artists' },
      { status: 500 }
    );
  }
}

// POST /api/artists
export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const artistData = await request.json();

    const created = await prisma.artist.create({
      data: {
        name: artistData.name,
        bio: artistData.bio,
        category: artistData.category,
        image: artistData.image,
        thumbnail: artistData.thumbnail,
        yearsActive: artistData.stats?.yearsActive ?? 0,
        tracksReleased: artistData.stats?.tracksReleased ?? 0,
        streams: artistData.stats?.streams ?? 0,
        youtube: artistData.socialLinks?.youtube ?? null,
        instagram: artistData.socialLinks?.instagram ?? null,
        twitter: artistData.socialLinks?.twitter ?? null,
        tiktok: artistData.socialLinks?.tiktok ?? null,
        featured: !!artistData.featured,
      },
    });

    return NextResponse.json(
      { message: 'Artist created successfully', artist: created },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating artist:', error);
    return NextResponse.json(
      { error: 'Failed to create artist' },
      { status: 500 }
    );
  }
}
