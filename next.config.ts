import type { NextConfig } from "next";
const isProd = process.env.NODE_ENV === "production";
const pathGithub = '/crud_frontend_next_static';
const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  basePath: isProd ? pathGithub : '',
  assetPrefix: isProd ? pathGithub+'/' : '',
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_ASSET_PREFIX: isProd ? pathGithub : '',
    NEXT_PUBLIC_API_URL: isProd
    ? 'https://crud-backend-nhc3.onrender.com/api'
    : 'http://localhost:8000/api'
  },
};

export default nextConfig;
