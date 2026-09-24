import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Grafias alternativas da área Casa de Máquinas levam ao endereço oficial.
  async redirects() {
    return [
      { source: '/casa-de-maquinas', destination: '/casa_de_maquinas', permanent: true },
      { source: '/casa_maquinas', destination: '/casa_de_maquinas', permanent: true },
    ];
  },
};

export default nextConfig;
