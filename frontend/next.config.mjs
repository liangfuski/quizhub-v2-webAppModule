// Next.js automatically sets NODE_ENV to "development" when 
// running the next dev command, and "production" for next start and next build
/** @type {import('next').NextConfig} */

// 172.17.0.1 allowing the docker container to access to 
// the host machine
const nextConfig = {
    output: "standalone",
    env: {
        NEXT_PUBLIC_ROOT_PATH:
            process.env.NODE_ENV === 'production'
                ? 'http://172.17.0.1:3001/api'
                : 'http://localhost:3001/api',
    }
};

export default nextConfig;
