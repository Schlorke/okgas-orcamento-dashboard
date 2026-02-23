/** @type {import('next').NextConfig} */
const nextConfig = {
  /** Next 16: evita erro quando há webpack custom e build usa Turbopack por padrão */
  turbopack: {},
  webpack: (config, { isServer }) => {
    // Configuração para pacotes ESM
    config.externals = config.externals || []

    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
      }
    }

    return config
  },
}

export default nextConfig
