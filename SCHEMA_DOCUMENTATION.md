# Schema Markup Documentation - FONTFORSOCIAL.COM

## Overview
This document provides a comprehensive guide to all Schema.org structured data implemented across the FONTFORSOCIAL.COM website. All 1550+ pages have been updated with proper schema markup for better SEO and search engine visibility.

## Website Information
- **Site Name**: FONTFORSOCIAL.COM
- **Site URL**: https://www.fontforsocial.com
- **Author**: Deepak Chauhan
- **Email**: dc556316@gmail.com
- **LinkedIn**: https://www.linkedin.com/in/deepakchauhan333/

---

## Schema Types Implemented

### 1. Root Layout (`/app/layout.tsx`)
**Schemas**: Organization + WebSite

#### Organization Schema
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "FONTFORSOCIAL.COM",
  "url": "https://www.fontforsocial.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://www.fontforsocial.com/logo.png",
    "width": 200,
    "height": 64
  },
  "foundingDate": "2025",
  "founder": {
    "@type": "Person",
    "name": "Deepak Chauhan"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "dc556316@gmail.com",
    "contactType": "Customer Support"
  }
}
```

#### WebSite Schema with SearchAction
```json
{
  "@type": "WebSite",
  "name": "FONTFORSOCIAL.COM",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://www.fontforsocial.com/font/{search_term_string}"
    }
  }
}
```

---

### 2. Homepage (`/app/page.tsx`)
**Schema**: WebApplication
**Pages**: 1

Features:
- Application category: UtilityApplication
- Free pricing (0 USD)
- Aggregate rating (4.8/5 from 1250 reviews)
- Publisher information
- Author information

---

### 3. Platform Pages (`/app/[platform]/page.tsx`)
**Schema**: CollectionPage + BreadcrumbList
**Pages**: 14 (facebook, instagram, twitter, tiktok, etc.)

Each platform page includes:
- Platform-specific description
- Breadcrumb navigation
- Publisher information
- Author information
- Date published and modified

**Example URL**: `/facebook`, `/instagram`, `/tiktok`

---

### 4. Font Type Generator Pages (`/app/[platform]/[fontType]/page.tsx`)
**Schemas**: WebPage + BreadcrumbList + FAQPage + SoftwareApplication
**Pages**: ~1470 (14 platforms × 105 font types)

#### Multiple Schemas Per Page:
1. **BreadcrumbList**: Home → Platform → Font Type
2. **FAQPage**: Platform and font-specific FAQs
3. **WebPage**: Main page schema with author, publisher, dates
4. **SoftwareApplication**: Embedded in mainEntity

**Example URLs**:
- `/facebook/fancy-font-generator`
- `/instagram/cursive-font-generator`
- `/tiktok/bold-font-generator`

---

### 5. Individual Font Pages (`/app/font/[slug]/page.tsx`)
**Schema**: WebPage + BreadcrumbList
**Pages**: 1000+ fonts

Each font page includes:
- Font-specific description
- Breadcrumb: Home → Fonts → Font Name
- Publisher: FONTFORSOCIAL.COM
- Author information
- Date published and modified

**Example URLs**:
- `/font/aesthetic-font`
- `/font/bubble-text`
- `/font/cursive-font`

---

### 6. Font Listing Page (`/app/font/page.tsx`)
**Schema**: CollectionPage
**Pages**: 1

Features:
- Lists all 1000+ available fonts
- Collection page schema
- Publisher information

---

### 7. About Page (`/app/about/page.tsx`)
**Schema**: AboutPage + Organization
**Pages**: 1

Includes:
- Organization details
- Founding information
- Author information
- Knowledge areas (Unicode fonts, Text styling, etc.)

---

### 8. Contact Page (`/app/contact/page.tsx`)
**Schema**: ContactPage
**Pages**: 1

Features:
- Contact information
- Publisher details
- Support email

---

### 9. Privacy Policy (`/app/privacy/page.tsx`)
**Schema**: WebPage
**Pages**: 1

Standard legal page with:
- Publisher information
- Author details
- Last modified date

---

### 10. Terms of Service (`/app/terms/page.tsx`)
**Schema**: WebPage
**Pages**: 1

Standard legal page with:
- Publisher information
- Author details
- Last modified date

---

## Schema Properties Used Across All Pages

### Common Properties
- **@context**: Always "https://schema.org"
- **@type**: Varies by page type
- **name**: Page/entity name
- **description**: SEO-optimized description
- **url**: Canonical URL using NEXT_PUBLIC_SITE_URL
- **datePublished**: "2025-09-04T00:00:00Z"
- **dateModified**: Dynamic (new Date().toISOString())

### Author Object (Consistent Across All Pages)
```json
{
  "@type": "Person",
  "name": "Deepak Chauhan",
  "url": "https://www.linkedin.com/in/deepakchauhan333/",
  "email": "dc556316@gmail.com"
}
```

### Publisher Object (Consistent Across All Pages)
```json
{
  "@type": "Organization",
  "name": "FONTFORSOCIAL.COM",
  "url": "https://www.fontforsocial.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://www.fontforsocial.com/logo.png",
    "width": 200,
    "height": 64
  }
}
```

---

## Total Page Count by Type

| Page Type | Count | Schema Types |
|-----------|-------|--------------|
| Homepage | 1 | WebApplication |
| Platform Pages | 14 | CollectionPage, BreadcrumbList |
| Font Type Pages | ~1470 | WebPage, BreadcrumbList, FAQPage, SoftwareApplication |
| Individual Fonts | 1000+ | WebPage, BreadcrumbList |
| Font Listing | 1 | CollectionPage |
| About | 1 | AboutPage, Organization |
| Contact | 1 | ContactPage |
| Privacy | 1 | WebPage |
| Terms | 1 | WebPage |
| **TOTAL** | **~2489** | Multiple types |

---

## SEO Benefits

### 1. Rich Snippets
- **Breadcrumbs**: Visible in search results for all font pages
- **FAQs**: Expandable FAQ sections in search results
- **Ratings**: Star ratings visible for homepage
- **Organization**: Knowledge panel eligibility

### 2. Search Features
- **Sitelinks Search Box**: Enabled via WebSite schema
- **Logo**: Consistent branding in search results
- **Author Attribution**: Google Authorship

### 3. Structured Navigation
- Clear hierarchy via BreadcrumbList
- Platform-specific organization
- Font categorization

---

## Validation

### Tools to Validate Schema
1. **Google Rich Results Test**: https://search.google.com/test/rich-results
2. **Schema Markup Validator**: https://validator.schema.org/
3. **Google Search Console**: Monitor rich results performance

### Testing URLs
Test these representative URLs:
- Homepage: `https://www.fontforsocial.com`
- Platform: `https://www.fontforsocial.com/facebook`
- Font Type: `https://www.fontforsocial.com/facebook/fancy-font-generator`
- Individual Font: `https://www.fontforsocial.com/font/aesthetic-font`
- About: `https://www.fontforsocial.com/about`

---

## Maintenance Guidelines

### When Adding New Pages
1. Always include publisher schema with FONTFORSOCIAL.COM
2. Use consistent author information
3. Add appropriate breadcrumbs
4. Include datePublished and dateModified
5. Use canonical URLs from environment variables

### When Updating Existing Pages
1. Update dateModified to current timestamp
2. Maintain schema structure consistency
3. Validate after changes
4. Test in Google Rich Results

### Environment Variables Required
```env
NEXT_PUBLIC_SITE_URL=https://www.fontforsocial.com
NEXT_PUBLIC_SITE_NAME=FONTFORSOCIAL.COM
```

---

## Advanced Schema Features

### 1. FAQ Schema on Font Pages
Each font-type page includes platform and font-specific FAQs with proper Question/Answer structure.

### 2. Breadcrumb Navigation
Three-level breadcrumbs:
- Level 1: Home
- Level 2: Platform or Category
- Level 3: Specific Font/Tool

### 3. Software Application Schema
Font generators are marked as SoftwareApplication with:
- Free pricing
- Cross-platform compatibility
- Utility application category

### 4. Aggregate Ratings
Homepage includes aggregate rating:
- Rating: 4.8/5
- Review count: 1250

---

## Future Enhancements

### Recommended Additions
1. **VideoObject**: Add tutorial videos with schema
2. **HowTo**: Step-by-step font usage guides
3. **Review**: Individual user reviews with schema
4. **Product**: Mark popular fonts as products
5. **Event**: Font release announcements

### Analytics Integration
- Track rich result impressions in Search Console
- Monitor CTR improvements from rich snippets
- A/B test schema variations

---

## Troubleshooting

### Common Issues
1. **Missing Publisher**: Ensure all pages have publisher object
2. **Invalid URLs**: Always use absolute URLs with protocol
3. **Date Format**: Use ISO 8601 format for dates
4. **Logo Size**: Ensure logo meets Google requirements (min 112x112px)

### Validation Errors
- Check for proper JSON-LD syntax
- Verify all required properties are present
- Ensure URLs are accessible
- Validate image URLs return 200 status

---

## Contact for Schema Updates
For questions or updates to schema markup:
- **Developer**: Deepak Chauhan
- **Email**: dc556316@gmail.com
- **LinkedIn**: https://www.linkedin.com/in/deepakchauhan333/

---

**Last Updated**: 2025-10-05
**Version**: 1.0
**Total Pages with Schema**: 2489+
