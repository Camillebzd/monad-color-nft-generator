import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  monadTestnet
} from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Monad Color NFT Generator',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '',
  chains: [
    monadTestnet,
  ],
  ssr: true,
});
