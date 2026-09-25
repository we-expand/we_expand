import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Grafias alternativas da área Casa de Máquinas levam ao endereço oficial.
  async redirects() {
    return [
      ...['/casa-de-maquinas', '/casa_de_maquinas', '/casa_maquinas'].map(source => ({
        source,
        destination: '/casademaquinas',
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
