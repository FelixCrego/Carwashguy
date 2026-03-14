const globalSiteConfig = (typeof window !== 'undefined' && window.SITE_CONFIG) ? window.SITE_CONFIG : {};
const globalAreaConfig = (typeof window !== 'undefined' && window.AREA_CONFIG) ? window.AREA_CONFIG : {};

const getNested = (obj, path) => path.split('.').reduce((acc, key) => (
  acc && typeof acc === 'object' ? acc[key] : undefined
), obj);

const pickValue = (...values) => values.find((value) => typeof value !== 'undefined' && value !== null && value !== '');

const getEnv = (key) => {
  if (typeof process !== 'undefined' && process.env && typeof process.env[key] !== 'undefined') {
    return process.env[key];
  }
  return undefined;
};


const derivedBusinessName = pickValue(getEnv('NEXT_PUBLIC_BUSINESS_NAME'), getNested(globalSiteConfig, 'business.name'), '');
const derivedBusinessNameLower = (typeof derivedBusinessName === 'string' ? derivedBusinessName.toLowerCase() : '');
const derivedBusinessHandle = (typeof derivedBusinessName === 'string' ? derivedBusinessName.toLowerCase().replace(/[^a-z0-9]+/g, '') : '');

const siteConfig = {
  businessName: pickValue(getEnv('NEXT_PUBLIC_BUSINESS_NAME'), getNested(globalSiteConfig, 'business.name'), '{{BUSINESS_NAME}}'),
  businessNameLower: pickValue(getEnv('NEXT_PUBLIC_BUSINESS_NAME_LOWER'), getNested(globalSiteConfig, 'business.nameLower'), derivedBusinessNameLower, '{{BUSINESS_NAME_LOWER}}'),
  legalName: pickValue(getEnv('NEXT_PUBLIC_BUSINESS_LEGAL_NAME'), getNested(globalSiteConfig, 'business.legalName'), '{{BUSINESS_LEGAL_NAME}}'),
  businessHandle: pickValue(getEnv('NEXT_PUBLIC_BUSINESS_HANDLE'), getNested(globalSiteConfig, 'business.handle'), derivedBusinessHandle, '{{BUSINESS_HANDLE}}'),
  primaryColor: pickValue(getEnv('NEXT_PUBLIC_PRIMARY_COLOR'), getNested(globalSiteConfig, 'branding.primaryColor'), '#000000'),
  secondaryColor: pickValue(getEnv('NEXT_PUBLIC_SECONDARY_COLOR'), getNested(globalSiteConfig, 'branding.secondaryColor'), '#FFFFFF'),
  logoUrl: pickValue(getEnv('NEXT_PUBLIC_LOGO_URL'), getNested(globalSiteConfig, 'branding.logoUrl'), '{{PRIMARY_LOGO_URL}}'),
  footerLogoUrl: pickValue(getEnv('NEXT_PUBLIC_FOOTER_LOGO_URL'), getNested(globalSiteConfig, 'branding.footerLogoUrl'), '{{FOOTER_LOGO_URL}}'),
  defaultImage: pickValue(getEnv('NEXT_PUBLIC_DEFAULT_IMAGE_URL'), getNested(globalSiteConfig, 'branding.defaultImageUrl'), '{{DEFAULT_IMAGE_URL}}'),
  featureImageUrl: pickValue(getEnv('NEXT_PUBLIC_FEATURE_IMAGE_URL'), getNested(globalSiteConfig, 'branding.featureImageUrl'), getNested(globalSiteConfig, 'branding.heroImageUrl'), '{{FEATURE_IMAGE_URL}}'),
  phoneDisplay: pickValue(getEnv('NEXT_PUBLIC_BUSINESS_PHONE_DISPLAY'), getNested(globalSiteConfig, 'business.phoneDisplay'), '{{BUSINESS_PHONE_DISPLAY}}'),
  phoneHref: pickValue(getEnv('NEXT_PUBLIC_BUSINESS_PHONE_E164'), getNested(globalSiteConfig, 'business.phoneE164'), '{{BUSINESS_PHONE_E164}}'),
  email: pickValue(getEnv('NEXT_PUBLIC_BUSINESS_EMAIL'), getNested(globalSiteConfig, 'business.email'), '{{BUSINESS_EMAIL}}'),
  tagline: pickValue(getEnv('NEXT_PUBLIC_BUSINESS_TAGLINE'), getNested(globalSiteConfig, 'business.tagline'), '{{BUSINESS_TAGLINE}}'),
  hours: pickValue(getEnv('NEXT_PUBLIC_BUSINESS_HOURS'), getNested(globalSiteConfig, 'business.hours'), '{{BUSINESS_HOURS}}'),
  licenseText: pickValue(getEnv('NEXT_PUBLIC_BUSINESS_LICENSE_TEXT'), getNested(globalSiteConfig, 'business.licenseText'), '{{BUSINESS_LICENSE_TEXT}}'),
  trustText: pickValue(getEnv('NEXT_PUBLIC_BUSINESS_TRUST_TEXT'), getNested(globalSiteConfig, 'business.trustText'), '{{BUSINESS_TRUST_TEXT}}'),

  location: {
    primaryCity: pickValue(getEnv('NEXT_PUBLIC_PRIMARY_CITY'), getNested(globalSiteConfig, 'geo.primaryLocation'), getNested(globalSiteConfig, 'business.city'), '{{PRIMARY_CITY}}'),
    primaryCityLower: pickValue(getEnv('NEXT_PUBLIC_PRIMARY_CITY_LOWER'), getNested(globalSiteConfig, 'geo.primaryLocationLower'), getNested(globalSiteConfig, 'business.city'), '{{PRIMARY_CITY_LOWER}}'),
    primaryStateName: pickValue(getEnv('NEXT_PUBLIC_PRIMARY_STATE_NAME'), getEnv('NEXT_PUBLIC_STATE_NAME'), getNested(globalSiteConfig, 'geo.primaryStateName'), getNested(globalSiteConfig, 'geo.stateName'), getNested(globalSiteConfig, 'business.primaryStateName'), getNested(globalSiteConfig, 'business.stateName'), getNested(globalSiteConfig, 'business.state'), '{{PRIMARY_STATE_NAME}}'),
    primaryStateCode: pickValue(getEnv('NEXT_PUBLIC_PRIMARY_STATE_CODE'), getEnv('NEXT_PUBLIC_STATE_CODE'), getNested(globalSiteConfig, 'geo.primaryStateCode'), getNested(globalSiteConfig, 'geo.stateCode'), getNested(globalSiteConfig, 'business.primaryStateCode'), getNested(globalSiteConfig, 'business.stateCode'), '{{PRIMARY_STATE_CODE}}'),
    metroArea: pickValue(getEnv('NEXT_PUBLIC_METRO_AREA'), getNested(globalSiteConfig, 'geo.metroArea'), '{{METRO_AREA}}'),
    serviceRegion: pickValue(getEnv('NEXT_PUBLIC_SERVICE_REGION'), getNested(globalSiteConfig, 'geo.serviceRegion'), '{{SERVICE_REGION}}'),
    fullAddressLine: pickValue(getEnv('NEXT_PUBLIC_FULL_ADDRESS_LINE'), getNested(globalSiteConfig, 'geo.fullAddressLine'), '{{FULL_ADDRESS_LINE}}')
  },

  serviceAreas: Array.isArray(globalAreaConfig.serviceAreas) ? globalAreaConfig.serviceAreas : ["Titusville", "Mims", "Port St. John", "Cocoa", "Rockledge", "Merritt Island", "Cocoa Beach", "Cape Canaveral", "Viera"],

  blogLocations: Array.isArray(globalAreaConfig.blogLocations) ? globalAreaConfig.blogLocations : [
    pickValue(getEnv('NEXT_PUBLIC_BLOG_LOCATION_1'), 'Titusville'),
    pickValue(getEnv('NEXT_PUBLIC_BLOG_LOCATION_2'), 'Cocoa'),
    pickValue(getEnv('NEXT_PUBLIC_BLOG_LOCATION_3'), 'Merritt Island')
  ],

  socialMedia: {
    instagram: getEnv('NEXT_PUBLIC_SOCIAL_INSTAGRAM_URL') || '{{SOCIAL_INSTAGRAM_URL}}',
    facebook: getEnv('NEXT_PUBLIC_SOCIAL_FACEBOOK_URL') || '{{SOCIAL_FACEBOOK_URL}}',
    youtube: getEnv('NEXT_PUBLIC_SOCIAL_YOUTUBE_URL') || '{{SOCIAL_YOUTUBE_URL}}',
    googleBusiness: getEnv('NEXT_PUBLIC_SOCIAL_GOOGLE_BUSINESS_URL') || '{{SOCIAL_GOOGLE_BUSINESS_URL}}',
    tiktok: getEnv('NEXT_PUBLIC_SOCIAL_TIKTOK_URL') || '{{SOCIAL_TIKTOK_URL}}',
    x: getEnv('NEXT_PUBLIC_SOCIAL_X_URL') || '{{SOCIAL_X_URL}}',
    linkedin: getEnv('NEXT_PUBLIC_SOCIAL_LINKEDIN_URL') || '{{SOCIAL_LINKEDIN_URL}}'
  }
};

window.siteConfig = siteConfig;

window.TEMPLATE_CONFIG = {
  business: {
    name: siteConfig.businessName,
    nameLower: siteConfig.businessNameLower,
    legalName: siteConfig.legalName,
    phoneDisplay: siteConfig.phoneDisplay,
    phoneHref: siteConfig.phoneHref,
    email: siteConfig.email,
    tagline: siteConfig.tagline,
    hours: siteConfig.hours,
    licenseText: siteConfig.licenseText,
    trustText: siteConfig.trustText
  },

  location: siteConfig.location,

  social: siteConfig.socialMedia,

  theme: {
    primaryColor: siteConfig.primaryColor,
    secondaryColor: siteConfig.secondaryColor
  },

  media: {
    defaultImage: siteConfig.defaultImage,
    defaultLogo: siteConfig.logoUrl,
    featureImageUrl: siteConfig.featureImageUrl,
    assets: {
      'XP_Logo-removebg-preview.png': siteConfig.logoUrl,
      'XP Logo.jpg': siteConfig.logoUrl,
      'XP Garage Logo.jpg': siteConfig.logoUrl,
      'Master Class Logo (1).jpg': siteConfig.logoUrl,
      'masterclass-logo.svg': siteConfig.logoUrl,
      'footerlogo.png': pickValue(siteConfig.footerLogoUrl, siteConfig.logoUrl),
      'footerlogo2.png': pickValue(siteConfig.footerLogoUrl, siteConfig.logoUrl),

      'pic 1.jpg': siteConfig.featureImageUrl,
      'pic 2.jpg': siteConfig.featureImageUrl,
      'pic 3.jpg': siteConfig.featureImageUrl,
      'pic 4.jpg': siteConfig.featureImageUrl,
      'pic 5.jpg': siteConfig.featureImageUrl,
      'pic 6.JPG': siteConfig.featureImageUrl,
      'int pic 1.JPG': siteConfig.featureImageUrl,
      'int pic 2.JPG': siteConfig.featureImageUrl,
      before: siteConfig.featureImageUrl,
      before2: siteConfig.featureImageUrl,
      'before3.jpeg': siteConfig.featureImageUrl,
      'after.jpeg': siteConfig.featureImageUrl,
      '358509473_263719652930382_6011789792449378313_n.jpg': siteConfig.featureImageUrl,
      'ChatGPT Image Mar 8, 2026, 05_30_06 PM (1).png': siteConfig.featureImageUrl
    }
  },

  placeholders: {
    serviceAreas: {
      areaA: siteConfig.serviceAreas[0],
      areaB: siteConfig.serviceAreas[1],
      areaC: siteConfig.serviceAreas[2],
      areaD: siteConfig.serviceAreas[3],
      areaE: siteConfig.serviceAreas[4],
      areaF: siteConfig.serviceAreas[5],
      areaG: siteConfig.serviceAreas[6],
      areaH: siteConfig.serviceAreas[7],
      areaI: siteConfig.serviceAreas[8]
    },
    blogLocations: {
      blogLocationA: siteConfig.blogLocations[0],
      blogLocationB: siteConfig.blogLocations[1],
      blogLocationC: siteConfig.blogLocations[2]
    }
  },

  replacements: {
    'Masterclass Detailing': siteConfig.businessName,
    Gabriel: 'Eliot Ferrer',
    'XP Garage': siteConfig.businessName,
    'xp garage': siteConfig.businessNameLower,
    masterclassdetailing: siteConfig.businessHandle,
    'hello@masterclassdetailing.com': siteConfig.email,
    '(858) 888-9351': siteConfig.phoneDisplay,
    '+18588889351': siteConfig.phoneHref,

    'Rancho Bernardo, CA': `${siteConfig.location.primaryCity}, ${siteConfig.location.primaryStateCode}`,
    'Rancho Bernardo': siteConfig.location.primaryCity,
    'rancho bernardo': siteConfig.location.primaryCityLower,
    'GARAGE-BASED IN': 'MOBILE DETAILING IN',
    'garage-based detailing service': 'mobile detailing service',
    'from our local garage': 'at your home, office, or jobsite',
    California: siteConfig.location.primaryStateName,
    CA: siteConfig.location.primaryStateCode,
    'San Diego': siteConfig.location.metroArea,
    'North County San Diego': siteConfig.location.serviceRegion,

    Poway: siteConfig.serviceAreas[0],
    '4S Ranch': siteConfig.serviceAreas[1],
    'Rancho Peñasquitos': siteConfig.serviceAreas[2],
    'Carmel Mountain Ranch': siteConfig.serviceAreas[3],
    'Scripps Ranch': siteConfig.serviceAreas[4],

    'Cape Coral': siteConfig.blogLocations[0],
    Estero: siteConfig.blogLocations[1],
    'Bonita Springs': siteConfig.blogLocations[2],
    'Del Mar': siteConfig.serviceAreas[5],
    Escondido: siteConfig.serviceAreas[6],
    'Fort Myers Beach': siteConfig.serviceAreas[5],
    'Lehigh Acres': siteConfig.serviceAreas[6],
    'North Fort Myers': siteConfig.serviceAreas[7],
    Sanibel: siteConfig.serviceAreas[8],

    '{{BUSINESS_NAME}}': siteConfig.businessName,
    '{{BUSINESS_NAME_LOWER}}': siteConfig.businessNameLower,
    '{{BUSINESS_LEGAL_NAME}}': siteConfig.legalName,
    '{{BUSINESS_HANDLE}}': siteConfig.businessHandle,
    '{{BUSINESS_EMAIL}}': siteConfig.email,
    '{{BUSINESS_PHONE_DISPLAY}}': siteConfig.phoneDisplay,
    '{{BUSINESS_PHONE_E164}}': siteConfig.phoneHref,
    '{{BUSINESS_TAGLINE}}': siteConfig.tagline,
    '{{BUSINESS_HOURS}}': siteConfig.hours,
    '{{BUSINESS_LICENSE_TEXT}}': siteConfig.licenseText,
    '{{BUSINESS_TRUST_TEXT}}': siteConfig.trustText,

    '{{PRIMARY_CITY}}': siteConfig.location.primaryCity,
    '{{PRIMARY_CITY_LOWER}}': siteConfig.location.primaryCityLower,
    '{{PRIMARY_STATE_NAME}}': siteConfig.location.primaryStateName,
    '{{PRIMARY_STATE_CODE}}': siteConfig.location.primaryStateCode,
    '{{METRO_AREA}}': siteConfig.location.metroArea,
    '{{SERVICE_REGION}}': siteConfig.location.serviceRegion,
    '{{FULL_ADDRESS_LINE}}': siteConfig.location.fullAddressLine,

    '{{PRIMARY_LOGO_URL}}': siteConfig.logoUrl,
    '{{FOOTER_LOGO_URL}}': pickValue(siteConfig.footerLogoUrl, siteConfig.logoUrl),
    '{{DEFAULT_IMAGE_URL}}': siteConfig.defaultImage,
    '{{FEATURE_IMAGE_URL}}': siteConfig.featureImageUrl,

    '{{SERVICE_AREA_1}}': siteConfig.serviceAreas[0],
    '{{SERVICE_AREA_2}}': siteConfig.serviceAreas[1],
    '{{SERVICE_AREA_3}}': siteConfig.serviceAreas[2],
    '{{SERVICE_AREA_4}}': siteConfig.serviceAreas[3],
    '{{SERVICE_AREA_5}}': siteConfig.serviceAreas[4],
    '{{SERVICE_AREA_6}}': siteConfig.serviceAreas[5],
    '{{SERVICE_AREA_7}}': siteConfig.serviceAreas[6],
    '{{SERVICE_AREA_8}}': siteConfig.serviceAreas[7],
    '{{SERVICE_AREA_9}}': siteConfig.serviceAreas[8],

    '{{BLOG_LOCATION_1}}': siteConfig.blogLocations[0],
    '{{BLOG_LOCATION_2}}': siteConfig.blogLocations[1],
    '{{BLOG_LOCATION_3}}': siteConfig.blogLocations[2]
  }
};
