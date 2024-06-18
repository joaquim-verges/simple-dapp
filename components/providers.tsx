'use client';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {http} from 'viem';
import {baseSepolia} from 'viem/chains';

import type {PrivyClientConfig} from '@privy-io/react-auth';
import {PrivyProvider} from '@privy-io/react-auth';
import {WagmiProvider, createConfig} from '@privy-io/wagmi';
import { BiconomyProvider } from '@biconomy/use-aa';

const queryClient = new QueryClient();

// API keys
const biconomyPaymasterApiKey =
    process.env.NEXT_PUBLIC_PAYMASTER_API_KEY as string;
const bundlerUrl = process.env.NEXT_PUBLIC_BUNDLER_URL as string;
const alchemyApiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY as string;
const privyAuthUrl = process.env.NEXT_PUBLIC_PRIVY_AUTH_URL as string;
const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID as string;

// greeter contract on base sepolia
export const contractAddress = '0xC252d497C08AdCCDc6820EcA64856D332BE15c99';

export const wagmiConfig = createConfig({
  chains: [baseSepolia],
  transports: {
    [baseSepolia.id]: http(`https://base-sepolia.g.alchemy.com/v2/${alchemyApiKey}`),
  },
});

const privyConfig: PrivyClientConfig = {
  embeddedWallets: {
    createOnLogin: 'users-without-wallets',
    requireUserPasswordOnCreate: true,
    noPromptOnSignature: false,
  },
  loginMethods: ['wallet', 'email', 'google'],
};

export default function Providers({children}: {children: React.ReactNode}) {
  return (
    <PrivyProvider
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      apiUrl={privyAuthUrl}
      appId={privyAppId}
      config={privyConfig}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig} reconnectOnMount={false}>
        <BiconomyProvider
          config={{
            biconomyPaymasterApiKey,
            bundlerUrl,
          }}
          queryClient={queryClient}
        >
          {children}
          </BiconomyProvider>
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}
