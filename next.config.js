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
    clientUrl: 'https://filecrate.cc',
    serverUrl: 'https://filecrate.cc',
  },
}
