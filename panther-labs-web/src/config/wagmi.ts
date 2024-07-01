import { http, createConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { injected } from "wagmi/connectors";

export const config = createConfig({
  chains: [polygonMumbai],
  connectors: [injected()],
  transports: {
    [polygonMumbai.id]: http(),
  },
});
