const withNextIntl = require('next-intl/plugin')(
  // This is the default location for the i18n config
  './src/i18n.ts'
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static exports for better performance
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};

module.exports = withNextIntl(nextConfig);
