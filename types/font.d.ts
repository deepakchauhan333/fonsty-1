// Type definitions for font previews
declare module 'font' {
  export interface FontPreview {
    id: string;
    name: string;
    text: string;
    style?: string;
    category?: string;
  }

  export interface FontCategory {
    id: string;
    name: string;
    description: string;
    keywords: string[];
  }
}
