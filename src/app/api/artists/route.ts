import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const limit = searchParams.get('limit');

    // Build query
    const query: any = {};
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (featured === 'true') {
      query.featured = true;
    }

    // Build options
    const options: any = {
      sort: { createdAt: -1 }
    };

    if (limit) {
      options.limit = parseInt(limit);
    }

    const take = limit ? parseInt(limit) : undefined;
    const artists = await prisma.artist.findMany({
      where: {
        category: category && category !== 'all' ? category : undefined,
        featured: featured === 'true' ? true : undefined,
      },
      orderBy: { createdAt: 'desc' },
      take,
    });

    return NextResponse.json(artists.map(a => ({
      _id: a.id,
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
    })));

  } catch (error: any) {
    console.error('Error fetching artists:', error);
    return NextResponse.json(
      { error: 'Failed to fetch artists' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
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
        youtube: artistData.socialLinks?.youtube,
        instagram: artistData.socialLinks?.instagram,
        twitter: artistData.socialLinks?.twitter,
        tiktok: artistData.socialLinks?.tiktok,
        featured: !!artistData.featured,
      }
    });

    return NextResponse.json({ message: 'Artist created successfully', artist: created }, { status: 201 });

  } catch (error: any) {
    console.error('Error creating artist:', error);
    return NextResponse.json(
      { error: 'Failed to create artist' },
      { status: 500 }
    );
  }
} 