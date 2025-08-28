import dbConnect from '../lib/db';
import Artist from '../models/Artist';
import Video from '../models/Video';
import Event from '../models/Event';
import User from '../models/User';

async function seed() {
  try {
    await dbConnect();
    console.log('Connected to database');

    // Clear existing data
    await Artist.deleteMany({});
    await Video.deleteMany({});
    await Event.deleteMany({});
    await User.deleteMany({});

    console.log('Cleared existing data');

    // Create admin user
    const adminUser = new User({
      username: 'admin',
      email: 'admin@injaichannel.com',
      password: 'admin123',
      role: 'admin',
    });
    await adminUser.save();
    console.log('Created admin user');

    // Create artists
    const artists = [
      {
        name: 'Straiker',
        bio: 'A founding figure in Guigui rap, Straiker is known for his energetic flow and street anthems.',
        category: 'pioneers',
        image: 'https://i.ytimg.com/vi/rRhwls8f-Pc/hqdefault.jpg',
        thumbnail: 'https://i.ytimg.com/vi/rRhwls8f-Pc/hqdefault.jpg',
        stats: {
          yearsActive: 10,
          tracksReleased: 40,
          streams: 200000,
        },
        socialLinks: {
          youtube: 'https://www.youtube.com/@straiker',
          instagram: 'https://www.instagram.com/straiker',
        },
        videos: [
          {
            title: 'Straiker - Mental (Official Music Video)',
            youtubeId: 'rRhwls8f-Pc',
            description: 'Official music video showcasing Straiker\'s powerful lyrical delivery.',
            uploadDate: new Date('2024-01-15'),
          },
          {
            title: 'STRAIKER CONCERT AU CABARET SAUVAGE DE PARIS ( 2024 ) ( AUDACE )',
            youtubeId: 'Wv60uKiLt6I',
            description: 'Live performance at Cabaret Sauvage in Paris.',
            uploadDate: new Date('2024-01-10'),
          },
        ],
        featured: true,
      },
      {
        name: 'Soul Bang\'s',
        bio: 'Guinean R&B icon blending soulful melodies with rap verses.',
        category: 'collaborators',
        image: 'https://i.ytimg.com/vi/ysMKr3c7fx4/hqdefault.jpg',
        thumbnail: 'https://i.ytimg.com/vi/ysMKr3c7fx4/hqdefault.jpg',
        stats: {
          yearsActive: 8,
          tracksReleased: 35,
          streams: 180000,
        },
        socialLinks: {
          youtube: 'https://www.youtube.com/@soulbangs',
          instagram: 'https://www.instagram.com/soulbangs',
        },
        videos: [
          {
            title: 'Soul Bang\'s – Love Story',
            youtubeId: 'ysMKr3c7fx4',
            description: 'A smooth collaboration with Eddy Kenzo.',
            uploadDate: new Date('2024-01-08'),
          },
        ],
        featured: true,
      },
      {
        name: 'Fish Killer',
        bio: 'Instinct Killers\' dynamic rapper with an impactful stage presence.',
        category: 'pioneers',
        image: 'https://i.ytimg.com/vi/SOIw-SNdsEA/hqdefault.jpg',
        thumbnail: 'https://i.ytimg.com/vi/SOIw-SNdsEA/hqdefault.jpg',
        stats: {
          yearsActive: 12,
          tracksReleased: 50,
          streams: 250000,
        },
        socialLinks: {
          youtube: 'https://www.youtube.com/@fishkiller',
          instagram: 'https://www.instagram.com/fishkiller',
        },
        videos: [
          {
            title: 'Fish Killer – Bad Man',
            youtubeId: 'SOIw-SNdsEA',
            description: 'Clip officiel 2022 — The raw essence of Guigui street rap.',
            uploadDate: new Date('2024-01-01'),
          },
        ],
        featured: true,
      },
      {
        name: 'MC Jin',
        bio: 'MC Jin pays homage to Bruce Lee through rap.',
        category: 'collaborators',
        image: 'https://i.ytimg.com/vi/EpX4InYKSbs/hqdefault.jpg',
        thumbnail: 'https://i.ytimg.com/vi/EpX4InYKSbs/hqdefault.jpg',
        stats: {
          yearsActive: 15,
          tracksReleased: 60,
          streams: 300000,
        },
        socialLinks: {
          youtube: 'https://www.youtube.com/@mcjin',
          instagram: 'https://www.instagram.com/mcjin',
        },
        videos: [
          {
            title: 'MC Jin – Beat Kune Do',
            youtubeId: 'EpX4InYKSbs',
            description: 'MC Jin pays homage to Bruce Lee through rap.',
            uploadDate: new Date('2023-12-20'),
          },
        ],
        featured: false,
      },
    ];

    const createdArtists = await Artist.insertMany(artists);
    console.log('Created artists');

    // Create videos
    const videos = [
      {
        title: 'Straiker - Mental (Official Music Video)',
        artist: createdArtists[0]._id,
        youtubeId: 'rRhwls8f-Pc',
        description: 'Official music video by Straiker',
        thumbnail: 'https://i.ytimg.com/vi/rRhwls8f-Pc/hqdefault.jpg',
        category: 'music',
        featured: true,
        views: 202000,
        uploadDate: new Date('2025-01-15'),
      },
      {
        title: 'Fish Killer – Woulémakoui (Clip Officiel)',
        artist: createdArtists[2]._id,
        youtubeId: 'nLxvdVZVLWo',
        description: 'Official clip from Instinct Killers\'s channel',
        thumbnail: 'https://i.ytimg.com/vi/nLxvdVZVLWo/hqdefault.jpg',
        category: 'music',
        featured: true,
        views: 5000000,
        uploadDate: new Date('2022-06-15'),
      },
      {
        title: 'MC Jin – Beat Kune Do',
        artist: createdArtists[3]._id,
        youtubeId: 'EpX4InYKSbs',
        description: 'Official video featuring Jin\'s signature freestyle style',
        thumbnail: 'https://i.ytimg.com/vi/EpX4InYKSbs/hqdefault.jpg',
        category: 'music',
        featured: true,
        views: 35000,
        uploadDate: new Date('2024-03-20'),
      },
      {
        title: 'Soul Bang\'s – Love Story (Visualizer)',
        artist: createdArtists[1]._id,
        youtubeId: 'ysMKr3c7fx4',
        description: 'Visualizer collaboration delivering soulful and rap fusion',
        thumbnail: 'https://i.ytimg.com/vi/ysMKr3c7fx4/hqdefault.jpg',
        category: 'music',
        featured: true,
        views: 5600,
        uploadDate: new Date('2025-07-10'),
      },
    ];

    await Video.insertMany(videos);
    console.log('Created videos');

    // Create events
    const events = [
      {
        title: 'Guigui Rap Festival 2024',
        description: 'Annual celebration of Guigui rap culture with live performances',
        date: new Date('2024-03-15'),
        location: 'Downtown Arena',
        type: 'festival',
        status: 'upcoming',
        image: 'https://i.ytimg.com/vi/rRhwls8f-Pc/hqdefault.jpg',
        featured: true,
        lineup: [createdArtists[0]._id, createdArtists[1]._id, createdArtists[2]._id],
        ticketPrice: 50,
        capacity: 1000,
      },
      {
        title: 'New Album Release',
        description: 'MC Flow\'s highly anticipated new album drops worldwide',
        date: new Date('2024-03-22'),
        location: 'Digital Release',
        type: 'release',
        status: 'upcoming',
        image: 'https://i.ytimg.com/vi/ysMKr3c7fx4/hqdefault.jpg',
        featured: false,
        lineup: [createdArtists[3]._id],
      },
      {
        title: 'Street Cypher Competition',
        description: 'Open mic competition for emerging Guigui rap talent',
        date: new Date('2024-04-05'),
        location: 'Central Park',
        type: 'competition',
        status: 'upcoming',
        image: 'https://i.ytimg.com/vi/SOIw-SNdsEA/hqdefault.jpg',
        featured: false,
        capacity: 500,
      },
    ];

    await Event.insertMany(events);
    console.log('Created events');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed(); 