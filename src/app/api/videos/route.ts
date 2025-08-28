import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const limit = searchParams.get('limit');
    const artist = searchParams.get('artist');

    const take = limit ? parseInt(limit) : undefined;

    const videos = await prisma.video.findMany({
      where: {
        category: category && category !== 'all' ? category : undefined,
        featured: featured === 'true' ? true : undefined,
        artistId: artist || undefined,
      },
      orderBy: { uploadDate: 'desc' },
      take,
      include: { artist: true },
    });

    const transformedVideos = videos.map((video: any) => ({
      id: video.id,
      _id: video.id,
      title: video.title,
      artist: video.artist ? { name: video.artist.name, _id: video.artist.id } : { name: 'Unknown Artist' },
      description: video.description,
      youtubeId: video.youtubeId,
      category: video.category,
      year: new Date(video.uploadDate).getFullYear().toString(),
      duration: '3:25', // Placeholder
      views: video.views ? `${video.views.toLocaleString()}+ views` : 'Unknown views',
      uploadDate: video.uploadDate,
      thumbnail: video.thumbnail,
      featured: video.featured
    }));

    return NextResponse.json(transformedVideos);

  } catch (error: any) {
    console.error('Error fetching videos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch videos' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const videoData = await request.json();

    const createdVideo = await prisma.video.create({
      data: videoData,
    });

    return NextResponse.json(
      { message: 'Video created successfully', video: createdVideo },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('Error creating video:', error);
    return NextResponse.json(
      { error: 'Failed to create video' },
      { status: 500 }
    );
  }
}
