import { useEffect } from 'react';
import type { SEOProps } from '../types';

const DEFAULT_BASE_URL = 'https://votive.vedicvn.com';
const DEFAULT_TITLE = 'Votive Academy - Luận Giải Chiêm Tinh Vệ Đà & Khóa Học Chiêm Tinh';
const DEFAULT_DESCRIPTION = 'Votive Academy - Dịch vụ luận giải Chiêm Tinh Vệ Đà (Vedic Astrology) chuyên nghiệp. Chiêm tinh cơ bản, chuyên sâu, Prasna. Khóa học chiêm tinh học online từ cơ bản đến nâng cao.';

export function SEO({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  canonical,
  ogImage,
}: SEOProps) {
  const baseUrl = import.meta.env.VITE_BASE_URL || DEFAULT_BASE_URL;
  const canonicalUrl = canonical || baseUrl;
  const fullOgImage = ogImage || `${baseUrl}/og-image.jpg`;

  useEffect(() => {
    document.title = title;

    const updateMetaTag = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement | null;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    updateMetaTag('description', description);
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:url', canonicalUrl, true);
    updateMetaTag('og:image', fullOgImage, true);
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', fullOgImage);

    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonicalUrl;

  }, [title, description, canonicalUrl, fullOgImage]);

  return null;
}
