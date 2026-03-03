export interface NavItem {
  label: string;
  href: string;
}

export enum ImageSize {
  Resolution1K = "1K",
  Resolution2K = "2K",
  Resolution4K = "4K"
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface AIStudio {
  hasSelectedApiKey?: () => Promise<boolean>;
  openSelectKey?: () => Promise<void>;
}

declare global {
  interface Window {
    aistudio?: AIStudio;
  }
}
