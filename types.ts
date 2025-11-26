export interface Product {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  details?: string[];
}

export interface ContactFormState {
  name: string;
  email: string;
  company: string;
  details: string;
}

export enum SectionId {
  HERO = 'hero',
  ABOUT = 'about',
  PROCESS = 'process',
  SHOWCASE = 'showcase',
  PORTFOLIO = 'portfolio',
  CONTACT = 'contact',
}

// Global declaration for GSAP since we are loading via CDN
declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
  }
}