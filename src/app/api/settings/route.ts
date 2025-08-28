import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const settings = await prisma.siteSettings.findFirst();
    return NextResponse.json(settings || { socialLinks: [], team: [], getInTouch: {} });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const existing = await prisma.siteSettings.findFirst();
    const saved = existing
      ? await prisma.siteSettings.update({ where: { id: existing.id }, data: { socialLinks: body.socialLinks ?? [], team: body.team ?? [], getInTouch: body.getInTouch ?? {} } })
      : await prisma.siteSettings.create({ data: { socialLinks: body.socialLinks ?? [], team: body.team ?? [], getInTouch: body.getInTouch ?? {} } });
    return NextResponse.json({ message: 'Settings saved', settings: saved });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 });
  }
}


