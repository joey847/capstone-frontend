/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: '/app',
        destination: '/',
        permanent: true,
      },
    ]
  },

  env: {
    clientUrl: 'http://localhost:3000',
    serverUrl: 'http://localhost:5000',
  },
}
