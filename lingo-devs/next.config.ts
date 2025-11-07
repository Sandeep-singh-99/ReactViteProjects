import type { NextConfig } from "next";
import lingoCompiler from "lingo.dev/compiler";

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["example.com"],
  },
  // Explicitly tell Next.js to use Webpack (ignore Turbopack)
  turbopack: false,
};

export default lingoCompiler.next({
  sourceLocale: "en",
  targetLocales: ["es", "fr", "de", "ja"],
  models: {
    "*:*": "gemini:gemini-2.5-flash",
  },
  useDirective: true,
})(nextConfig);


// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;
