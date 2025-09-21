import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // Get all newsletter subscribers
    const subscribers = await prisma.newsletterSubscription.findMany({
      orderBy: { createdAt: 'desc' }
    });

    // Calculate stats
    const stats = {
      total: subscribers.length,
      active: subscribers.filter(s => s.status === 'active').length,
      unsubscribed: subscribers.filter(s => s.status === 'unsubscribed').length
    };

    return NextResponse.json({
      subscribers,
      stats
    });

  } catch (error) {
    console.error('Error fetching newsletter subscribers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subscribers' },
      { status: 500 }
    );
  }
}
