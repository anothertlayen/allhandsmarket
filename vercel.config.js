// This file is used by Vercel to configure the build process
module.exports = {
  // Skip TypeScript type checking
  typescript: {
    ignoreBuildErrors: true,
  },
  // Skip ESLint
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Use the default Next.js build command
  build: {
    env: {
      NEXT_PUBLIC_SKIP_TYPE_CHECK: 'true',
      NEXT_PUBLIC_SKIP_LINT: 'true',
    },
  },
};