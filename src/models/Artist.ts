import mongoose from 'mongoose';

export interface IArtist extends mongoose.Document {
  name: string;
  bio: string;
  category: 'pioneers' | 'collaborators' | 'emerging';
  image: string;
  thumbnail: string;
  stats: {
    yearsActive: number;
    tracksReleased: number;
    streams: number;
  };
  socialLinks: {
    youtube?: string;
    instagram?: string;
    twitter?: string;
    tiktok?: string;
  };
  videos: Array<{
    title: string;
    youtubeId: string;
    description: string;
    uploadDate: Date;
  }>;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const artistSchema = new mongoose.Schema<IArtist>({
  name: {
    type: String,
    required: [true, 'Artist name is required'],
    trim: true,
  },
  bio: {
    type: String,
    required: [true, 'Artist bio is required'],
    minlength: [10, 'Bio must be at least 10 characters long'],
  },
  category: {
    type: String,
    enum: ['pioneers', 'collaborators', 'emerging'],
    required: [true, 'Category is required'],
  },
  image: {
    type: String,
    required: [true, 'Artist image is required'],
  },
  thumbnail: {
    type: String,
    required: [true, 'Artist thumbnail is required'],
  },
  stats: {
    yearsActive: {
      type: Number,
      required: [true, 'Years active is required'],
      min: 0,
    },
    tracksReleased: {
      type: Number,
      required: [true, 'Tracks released is required'],
      min: 0,
    },
    streams: {
      type: Number,
      required: [true, 'Streams count is required'],
      min: 0,
    },
  },
  socialLinks: {
    youtube: String,
    instagram: String,
    twitter: String,
    tiktok: String,
  },
  videos: [{
    title: {
      type: String,
      required: [true, 'Video title is required'],
    },
    youtubeId: {
      type: String,
      required: [true, 'YouTube ID is required'],
    },
    description: {
      type: String,
      required: [true, 'Video description is required'],
    },
    uploadDate: {
      type: Date,
      default: Date.now,
    },
  }],
  featured: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Artist || mongoose.model<IArtist>('Artist', artistSchema); 