'use client';

import {useWalletBalance, useActiveAccount} from 'thirdweb/react';
import { chain, client } from './providers';

const Balance = () => {
  const account = useActiveAccount();
  const {data, isError, isLoading} = useWalletBalance({
    address: account?.address,
    client,
    chain
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
          Balance: {data?.displayValue} {data?.symbol}
        </p>
      )}
    </>
  );
};

export default Balance;
