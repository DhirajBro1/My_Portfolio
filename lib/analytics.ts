// Google Analytics utility functions
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID || '', {
      page_path: url,
    });
  }
};

export const event = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Specific event tracking functions
export const trackCommentSubmit = (name: string) => {
  event('comment_submit', 'engagement', `Submitted by ${name}`);
};

export const trackRatingSubmit = (rating: number, name: string) => {
  event('rating_submit', 'engagement', `${rating} stars from ${name}`, rating);
};

export const trackAPKDownload = (projectName: string) => {
  event('apk_download', 'download', projectName);
};

export const trackContactForm = (name: string, email: string) => {
  event('contact_form_submit', 'engagement', `${name} (${email})`);
};

export const trackSocialClick = (platform: string) => {
  event('social_click', 'engagement', platform);
};

export const trackProjectView = (projectName: string) => {
  event('project_view', 'engagement', projectName);
};

export const trackSkillInteraction = (skillName: string) => {
  event('skill_view', 'engagement', skillName);
};

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}
