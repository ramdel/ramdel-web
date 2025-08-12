import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'es', 'fr'],
  
  // Used when no locale matches
  defaultLocale: 'en',
  
  // Auto-detect locale based on request
  localeDetection: true,
  
  // Redirect to locale-specific paths
  localePrefix: 'as-needed'
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(fr|en|es)/:path*']
};
