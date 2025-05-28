import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface InstagramUserResponse {
  user: {
    username: string;
    full_name: string;
    biography: string;
    biography_with_entities: {
      raw_text: string;
      entities: any[];
    };
    bio_links: any[];
    external_url: string | null;
    profile_pic_url: string;
    profile_pic_url_hd: string;
    is_private: boolean;
    is_verified: boolean;
    is_business_account: boolean;
    is_professional_account: boolean;
    category_name: string;
    business_category_name: string | null;
    business_contact_method: string;
    edge_followed_by: {
      count: number;
    };
    edge_follow: {
      count: number;
    };
    follows_viewer: boolean;
    followed_by_viewer: boolean;
    has_clips: boolean;
    has_guides: boolean;
    has_channel: boolean;
    highlight_reel_count: number;
    edge_felix_video_timeline: {
      count: number;
      edges: any[];
    };
    edge_owner_to_timeline_media: {
      count: number;
      edges: InstagramPost[];
    };
  };
}

export interface InstagramPost {
  node: {
    id: string;
    shortcode: string;
    display_url: string;
    thumbnail_src: string;
    is_video: boolean;
    edge_media_to_caption: {
      edges: Array<{ node: { text: string } }>;
    };
    edge_media_to_comment: {
      count: number;
    };
    edge_liked_by: {
      count: number;
    };
    taken_at_timestamp: number;
    location: {
      id: string;
      name: string;
      slug: string;
    } | null;
  };
}

export interface EngagementData {
  username: string;
  profilePicUrl: string;
  followers: number;
  likesPerPost: number;
  commentsPerPost: number;
  engagementRate: number;
  engagementQuality: "Poor" | "Average" | "Good" | "Excellent";
  // New fields
  following?: number;
  mediaCount?: number;
  biography?: string;
  fullName?: string;
  isPrivate?: boolean;
  isVerified?: boolean;
  cachedTimestamp?: number;
}

export interface InstagramApiErrorResponse {
  error: true;
  message: string;
}
