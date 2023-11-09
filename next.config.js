/** @type {import('next').NextConfig} */

const nextConfig = {}
const isGithubActions = process.env.GITHUB_ACTIONS || false

if (isGithubActions) {
  nextConfig.output = 'export';
  nextConfig.basePath = '/next-app';
}
module.exports = nextConfig
