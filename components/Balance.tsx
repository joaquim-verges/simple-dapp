'use client';

import { useSmartAccount } from '@biconomy/use-aa';
import { baseSepolia } from 'viem/chains';
import {useBalance} from 'wagmi';

const Balance = () => {
  const {smartAccountAddress} = useSmartAccount();
  const {data, isError, isLoading} = useBalance({
    address: smartAccountAddress,
    chainId: baseSepolia.id
  });

  if (isLoading) return <div>Fetching balance…</div>;
  if (isError) return <div>Error fetching balance</div>;
  return (
    <>
      <h2 className="mt-6 text-2xl">Balance</h2>
      {isLoading && <p>fetching balance...</p>}
      {isError && <p>Error fetching balance.</p>}
      {data && (
        <p>
          Balance: {data?.formatted} {data?.symbol}
        </p>
      )}
    </>
  );
};

export default Balance;
