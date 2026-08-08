import React, { useEffect } from 'react';
import { BlogPost } from '../types/blog';

interface Props {
  title?: string;
  description?: string;
  article?: BlogPost | null;
  canonicalUrl?: string;
}

export const SEOHead: React.FC<Props> = ({
  title = 'Sarpam — Autonomous Research. Modern Intelligence.',
  description = 'Sarpam is a luxury AI research publication platform presenting autonomous AI-researched, fact-checked, and verified scientific papers.',
  article,
  canonicalUrl
}) => {
  useEffect(() => {
    const pageTitle = article
      ? `${article.meta_title || article.title} | Sarpam AI Research`
      : title;
    const pageDesc = article ? article.meta_description || article.excerpt : description;
    const currentUrl = canonicalUrl || window.location.href;
    const imageUrl = article?.featured_image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200';

    // Update document title
    document.title = pageTitle;

    // Helper to update meta tag
    const setMetaTag = (selector: string, attr: string, value: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        if (selector.includes('name=')) {
          element.setAttribute('name', selector.split('name="')[1].replace('"', ''));
        } else if (selector.includes('property=')) {
          element.setAttribute('property', selector.split('property="')[1].replace('"', ''));
        }
        document.head.appendChild(element);
      }
      element.setAttribute(attr, value);
    };

    setMetaTag('meta[name="description"]', 'content', pageDesc);
    setMetaTag('meta[property="og:title"]', 'content', pageTitle);
    setMetaTag('meta[property="og:description"]', 'content', pageDesc);
    setMetaTag('meta[property="og:image"]', 'content', imageUrl);
    setMetaTag('meta[property="og:url"]', 'content', currentUrl);
    setMetaTag('meta[property="og:type"]', 'content', article ? 'article' : 'website');
    setMetaTag('meta[name="twitter:card"]', 'content', 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', 'content', pageTitle);
    setMetaTag('meta[name="twitter:description"]', 'content', pageDesc);
    setMetaTag('meta[name="twitter:image"]', 'content', imageUrl);

    // Inject JSON-LD Structured Data Schema for Article
    let scriptElement = document.getElementById('sarpam-jsonld');
    if (!scriptElement) {
      scriptElement = document.createElement('script');
      scriptElement.id = 'sarpam-jsonld';
      scriptElement.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptElement);
    }

    if (article) {
      const schemaData = {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        'headline': article.title,
        'description': article.excerpt,
        'image': article.featured_image,
        'datePublished': article.published_at,
        'dateModified': article.updated_at || article.published_at,
        'author': {
          '@type': 'Organization',
          'name': article.author || 'Sarpam Autonomous Intelligence'
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'Sarpam Research Platform',
          'logo': {
            '@type': 'ImageObject',
            'url': 'https://sarpam.ai/logo.png'
          }
        },
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': currentUrl
        }
      };
      scriptElement.textContent = JSON.stringify(schemaData);
    } else {
      const schemaData = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        'name': 'Sarpam',
        'url': currentUrl,
        'description': description,
        'publisher': {
          '@type': 'Organization',
          'name': 'Sarpam'
        }
      };
      scriptElement.textContent = JSON.stringify(schemaData);
    }
  }, [title, description, article, canonicalUrl]);

  return null;
};
