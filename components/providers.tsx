'use client';

import { createThirdwebClient, getContract } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";
import { ThirdwebProvider } from "thirdweb/react";

// API key
const clientId =
    process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID as string;

export const client = createThirdwebClient({
  clientId,
})

export const chain = baseSepolia;

// greeter contract
export const contract = getContract({
  address: "0xC252d497C08AdCCDc6820EcA64856D332BE15c99",
  chain,
  client,
});


export default function Providers({children}: {children: React.ReactNode}) {
  return (
    <ThirdwebProvider>
      {children}
    </ThirdwebProvider>
  );
}
