import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Clear existing
  await prisma.video.deleteMany();
  await prisma.event.deleteMany();
  await prisma.artist.deleteMany();
  await prisma.user.deleteMany();
  await prisma.siteSettings.deleteMany();

  // Admin user
  const hashed = await bcrypt.hash('admin123', 12);
  await prisma.user.create({
    data: {
      username: 'admin',
      email: 'admin@injaichannel.com',
      password: hashed,
      role: 'admin',
    }
  });

  // Artists
  const straiker = await prisma.artist.create({ data: {
    name: 'Straiker',
    bio: 'A founding figure in Guigui rap, Straiker is known for his energetic flow and street anthems.',
    category: 'pioneers',
    image: 'https://i.ytimg.com/vi/rRhwls8f-Pc/hqdefault.jpg',
    thumbnail: 'https://i.ytimg.com/vi/rRhwls8f-Pc/hqdefault.jpg',
    yearsActive: 10,
    tracksReleased: 40,
    streams: 200000,
    youtube: 'https://www.youtube.com/@straiker',
    instagram: 'https://www.instagram.com/straiker',
    featured: true,
  }});

  const soul = await prisma.artist.create({ data: {
    name: "Soul Bang's",
    bio: 'Guinean R&B icon blending soulful melodies with rap verses.',
    category: 'collaborators',
    image: 'https://i.ytimg.com/vi/ysMKr3c7fx4/hqdefault.jpg',
    thumbnail: 'https://i.ytimg.com/vi/ysMKr3c7fx4/hqdefault.jpg',
    yearsActive: 8,
    tracksReleased: 35,
    streams: 180000,
    youtube: 'https://www.youtube.com/@soulbangs',
    instagram: 'https://www.instagram.com/soulbangs',
    featured: true,
  }});

  const fish = await prisma.artist.create({ data: {
    name: 'Fish Killer',
    bio: "Instinct Killers' dynamic rapper with an impactful stage presence.",
    category: 'pioneers',
    image: 'https://i.ytimg.com/vi/SOIw-SNdsEA/hqdefault.jpg',
    thumbnail: 'https://i.ytimg.com/vi/SOIw-SNdsEA/hqdefault.jpg',
    yearsActive: 12,
    tracksReleased: 50,
    streams: 250000,
    youtube: 'https://www.youtube.com/@fishkiller',
    instagram: 'https://www.instagram.com/fishkiller',
    featured: true,
  }});

  const jin = await prisma.artist.create({ data: {
    name: 'MC Jin',
    bio: 'MC Jin pays homage to Bruce Lee through rap.',
    category: 'collaborators',
    image: 'https://i.ytimg.com/vi/EpX4InYKSbs/hqdefault.jpg',
    thumbnail: 'https://i.ytimg.com/vi/EpX4InYKSbs/hqdefault.jpg',
    yearsActive: 15,
    tracksReleased: 60,
    streams: 300000,
    youtube: 'https://www.youtube.com/@mcjin',
    instagram: 'https://www.instagram.com/mcjin',
    featured: false,
  }});

  // Videos
  await prisma.video.createMany({ data: [
    { title: 'Straiker - Mental (Official Music Video)', artistId: straiker.id, youtubeId: 'rRhwls8f-Pc', description: 'Official music video by Straiker', thumbnail: 'https://i.ytimg.com/vi/rRhwls8f-Pc/hqdefault.jpg', category: 'music', featured: true, views: 202000, uploadDate: new Date('2025-01-15') },
    { title: 'Fish Killer – Woulémakoui (Clip Officiel)', artistId: fish.id, youtubeId: 'nLxvdVZVLWo', description: "Official clip from Instinct Killers's channel", thumbnail: 'https://i.ytimg.com/vi/nLxvdVZVLWo/hqdefault.jpg', category: 'music', featured: true, views: 5000000, uploadDate: new Date('2022-06-15') },
    { title: 'MC Jin – Beat Kune Do', artistId: jin.id, youtubeId: 'EpX4InYKSbs', description: "Official video featuring Jin's signature freestyle style", thumbnail: 'https://i.ytimg.com/vi/EpX4InYKSbs/hqdefault.jpg', category: 'music', featured: true, views: 35000, uploadDate: new Date('2024-03-20') },
    { title: "Soul Bang's – Love Story (Visualizer)", artistId: soul.id, youtubeId: 'ysMKr3c7fx4', description: 'Visualizer collaboration delivering soulful and rap fusion', thumbnail: 'https://i.ytimg.com/vi/ysMKr3c7fx4/hqdefault.jpg', category: 'music', featured: true, views: 5600, uploadDate: new Date('2025-07-10') },
  ]});

  // Events
  await prisma.event.create({ data: {
    title: 'Guigui Rap Festival 2024',
    description: 'Annual celebration of Guigui rap culture with live performances',
    date: new Date('2024-03-15'),
    location: 'Downtown Arena',
    type: 'festival',
    status: 'upcoming',
    image: 'https://i.ytimg.com/vi/rRhwls8f-Pc/hqdefault.jpg',
    featured: true,
    ticketPrice: 50,
    capacity: 1000,
  }});

  await prisma.event.create({ data: {
    title: 'New Album Release',
    description: "MC Flow's highly anticipated new album drops worldwide",
    date: new Date('2024-03-22'),
    location: 'Digital Release',
    type: 'release',
    status: 'upcoming',
    image: 'https://i.ytimg.com/vi/ysMKr3c7fx4/hqdefault.jpg',
  }});

  // Settings
  await prisma.siteSettings.create({ data: {
    socialLinks: [
      { platform: 'youtube', label: 'YouTube', url: 'https://www.youtube.com/', iconClass: 'fab fa-youtube' },
      { platform: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/', iconClass: 'fab fa-instagram' }
    ] as any,
    team: [
      { name: 'Admin One', role: 'Founder', image: '', bio: 'Founder of the platform' }
    ] as any,
    getInTouch: { headline: 'Get in Touch', description: 'Reach out to us', email: 'info@injai-channel.com', phone: '+1 (555) 123-4567', addressLines: ['123 Music Street', 'Hip Hop City, HC 12345'] } as any
  }});
}

main().then(()=>{ console.log('Seeded PostgreSQL successfully'); process.exit(0);}).catch(e=>{ console.error(e); process.exit(1);});


