import { useConfig } from '@/composables/useConfig'

export interface SeoMetaData {
  title?: string
  description?: string | (() => string)
  ogTitle?: string | (() => string)
  ogDescription?: string | (() => string)
  ogType?: 'website' | 'article'
  ogUrl?: string | (() => string)
  twitterCard?: 'summary' | 'summary_large_image'
  twitterTitle?: string | (() => string)
  twitterDescription?: string | (() => string)
}

export function getSeoConfig() {
  const { lguName, labels, siteBrandName, getFullSiteTitle, getOpenGraphUrl } = useConfig()

  function createSeoData(
    title: string,
    descriptionFn: () => string,
    urlPath: string,
    ogType: 'website' | 'article' = 'website',
    twitterCard: 'summary' | 'summary_large_image' = 'summary',
  ): SeoMetaData {
    return {
      title,
      description: descriptionFn,
      ogTitle: () => title,
      ogDescription: descriptionFn,
      ogType,
      ogUrl: () => urlPath ? `${getOpenGraphUrl()}${urlPath}` : getOpenGraphUrl(),
      twitterCard,
      twitterTitle: () => title,
      twitterDescription: descriptionFn,
    }
  }

  const seoData: Record<string, SeoMetaData> = {
    'index': createSeoData(
      getFullSiteTitle('Home'),
      () => `Welcome to Better ${lguName.value} — your digital gateway to ${labels.value.lguTypeLabel} of ${lguName.value} services, government information, and community resources.`,
      '',
    ),
    'about': createSeoData(
      getFullSiteTitle('About'),
      () => `Learn about Better ${lguName.value} — our mission, history, and how ${siteBrandName.value} promotes transparency and accessibility in local governance.`,
      'about',
    ),
    'accessibility': createSeoData(
      getFullSiteTitle('Accessibility'),
      () => `Read our Accessibility Statement. Better ${lguName.value} is committed to ensuring our digital services are accessible to all citizens.`,
      'accessibility',
    ),
    'faq': createSeoData(
      getFullSiteTitle('FAQ'),
      () => `Frequently Asked Questions (FAQ) about ${lguName.value}'s services, processes, and government programs. Find quick answers here.`,
      'faq',
    ),
    'budget': createSeoData(
      getFullSiteTitle('Budget & Transparency'),
      () => `Explore the budget and transparency reports of ${lguName.value}. Learn how public funds are allocated and utilized.`,
      'budget',
    ),
    'government-index': createSeoData(
      getFullSiteTitle('Government'),
      () => `Meet the leadership and offices serving ${lguName.value}. View the executive, legislative, and department heads of the ${labels.value.lguTypeLabel}.`,
      'government',
    ),
    'history': createSeoData(
      getFullSiteTitle('History'),
      () => `Tracing the roots and evolution of our community in ${lguName.value}.`,
      'history',
    ),
    'join-us': createSeoData(
      getFullSiteTitle('Join Us'),
      () => `Be part of the movement for transparent and accessible governance data in ${lguName.value}.`,
      'join-us',
    ),
    'privacy': createSeoData(
      getFullSiteTitle('Privacy Policy'),
      () => `Privacy Policy of ${lguName.value}. Learn how we protect, collect, and use your personal information.`,
      'privacy',
    ),
    'terms': createSeoData(
      getFullSiteTitle('Terms of Use'),
      () => `Terms of Use for the Official Portal of ${lguName.value}. Read our policies, guidelines, and terms.`,
      'terms',
    ),
    'tourism': createSeoData(
      getFullSiteTitle('Tourism'),
      () => `Explore the beauty, culture, and hospitality of ${lguName.value}. Discover local attractions and vibrant festivals.`,
      'tourism',
    ),
    'news-index': createSeoData(
      getFullSiteTitle('News & Announcements'),
      () => `Stay updated with the latest news, announcements, and press releases from the ${labels.value.lguTypeLabel} of ${lguName.value}.`,
      'news',
    ),
    'legislative-index': createSeoData(
      getFullSiteTitle('Legislative'),
      () => `Ordinances and resolutions of the ${labels.value.legislativeBody} ng ${lguName.value}.`,
      'legislative',
    ),
    'legislative-ordinance-framework': createSeoData(
      getFullSiteTitle('Ordinance Framework'),
      () => `${labels.value.deptPrefix} ordinances enacted by the ${labels.value.legislativeBody} of ${lguName.value}.`,
      'legislative/ordinance-framework',
    ),
    'legislative-resolution-framework': createSeoData(
      getFullSiteTitle('Resolution Framework'),
      () => `Resolutions passed by the ${labels.value.legislativeBody} of ${lguName.value}.`,
      'legislative/resolution-framework',
    ),
    'services-index': createSeoData(
      getFullSiteTitle('Services'),
      () => `Browse and access all public services provided by the local government of ${lguName.value}.`,
      'services',
    ),
    'sitemap': createSeoData(
      getFullSiteTitle('Sitemap'),
      () => `Complete sitemap of Better ${lguName.value} — find all pages, services, and government resources available on this portal.`,
      'sitemap',
    ),
    'statistics': createSeoData(
      getFullSiteTitle('Statistics'),
      () => `Explore statistics and data on ${lguName.value}'s governance activities. Find insights and trends.`,
      'statistics',
    ),
    'contact': createSeoData(
      getFullSiteTitle('Contact Us'),
      () => `Get in touch with the ${labels.value.lguTypeLabel} of ${lguName.value}. Find contact information for various offices and departments.`,
      'contact',
    ),
    'news-slug': createSeoData(
      getFullSiteTitle('News Article'),
      () => `Read the latest news and announcements from the ${labels.value.lguTypeLabel} of ${lguName.value}.`,
      'news',
      'article',
      'summary_large_image',
    ),
    'services-category': createSeoData(
      getFullSiteTitle('Service Category'),
      () => `Browse government services by category in ${lguName.value}.`,
      'services',
    ),
    'service-details-slug': createSeoData(
      getFullSiteTitle('Service Details'),
      () => `Detailed information about local government services in ${lguName.value}.`,
      'services',
    ),
  }

  return seoData
}
