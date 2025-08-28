import mongoose from 'mongoose';

export interface IEvent extends mongoose.Document {
  title: string;
  description: string;
  date: Date;
  location: string;
  type: 'festival' | 'concert' | 'release' | 'competition' | 'workshop';
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  image: string;
  featured: boolean;
  lineup: mongoose.Types.ObjectId[];
  ticketPrice?: number;
  ticketUrl?: string;
  capacity?: number;
  createdAt: Date;
  updatedAt: Date;
}

const eventSchema = new mongoose.Schema<IEvent>({
  title: {
    type: String,
    required: [true, 'Event title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Event description is required'],
    minlength: [20, 'Description must be at least 20 characters long'],
  },
  date: {
    type: Date,
    required: [true, 'Event date is required'],
  },
  location: {
    type: String,
    required: [true, 'Event location is required'],
    trim: true,
  },
  type: {
    type: String,
    enum: ['festival', 'concert', 'release', 'competition', 'workshop'],
    required: [true, 'Event type is required'],
  },
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming',
  },
  image: {
    type: String,
    required: [true, 'Event image is required'],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  lineup: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist',
  }],
  ticketPrice: {
    type: Number,
    min: 0,
  },
  ticketUrl: String,
  capacity: {
    type: Number,
    min: 1,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Event || mongoose.model<IEvent>('Event', eventSchema); 