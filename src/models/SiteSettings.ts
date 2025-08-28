import mongoose from 'mongoose';

export interface ISocialLink {
  platform: 'youtube' | 'instagram' | 'twitter' | 'tiktok' | 'facebook' | 'linkedin' | 'website' | string;
  label: string;
  url: string;
  iconClass?: string;
}

export interface ITeamMember {
  name: string;
  role: string;
  image?: string;
  bio?: string;
  social?: ISocialLink[];
}

export interface IGetInTouch {
  headline?: string;
  description?: string;
  email?: string;
  phone?: string;
  addressLines?: string[];
}

export interface ISiteSettings extends mongoose.Document {
  socialLinks: ISocialLink[];
  team: ITeamMember[];
  getInTouch?: IGetInTouch;
  createdAt: Date;
  updatedAt: Date;
}

const socialLinkSchema = new mongoose.Schema<ISocialLink>({
  platform: { type: String, required: true, trim: true },
  label: { type: String, required: true, trim: true },
  url: { type: String, required: true, trim: true },
  iconClass: { type: String },
}, { _id: false });

const teamMemberSchema = new mongoose.Schema<ITeamMember>({
  name: { type: String, required: true, trim: true },
  role: { type: String, required: true, trim: true },
  image: { type: String },
  bio: { type: String },
  social: { type: [socialLinkSchema], default: [] },
}, { _id: false });

const getInTouchSchema = new mongoose.Schema<IGetInTouch>({
  headline: { type: String },
  description: { type: String },
  email: { type: String },
  phone: { type: String },
  addressLines: { type: [String], default: [] },
}, { _id: false });

const siteSettingsSchema = new mongoose.Schema<ISiteSettings>({
  socialLinks: { type: [socialLinkSchema], default: [] },
  team: { type: [teamMemberSchema], default: [] },
  getInTouch: { type: getInTouchSchema, default: {} },
}, { timestamps: true });

export default mongoose.models.SiteSettings || mongoose.model<ISiteSettings>('SiteSettings', siteSettingsSchema);


