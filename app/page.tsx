'use client';

import Balance from 'components/Balance';
import ContractRead from 'components/ContractRead';
import ContractWrite from 'components/ContractWrite';
import {chain, client} from 'components/providers';
import {ConnectButton, useActiveAccount} from 'thirdweb/react';

const MonoLabel = ({label}: {label: string}) => {
  return <span className="rounded-xl bg-slate-200 px-2 py-1 font-mono">{label}</span>;
};

export default function Home() {
  const account = useActiveAccount();

  return (
    <>
      <main className="min-h-screen bg-slate-200 p-4 text-slate-800">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="border-1 flex flex-col items-start gap-2 rounded border border-black bg-slate-100 p-3">
            <h1 className="mb-4 text-4xl font-bold">thirdweb</h1>
            {!account && (
              <>
                <p>You are not logged in</p>
              </>
            )}
            <ConnectButton
              client={client}
              theme={'light'}
              accountAbstraction={{
                chain,
                sponsorGas: true,
              }}
            />
            {account && (
              <>
                <h2 className="mt-6 text-2xl">Account</h2>
                <p>
                  address: <MonoLabel label={account.address} />
                </p>
                <Balance />
                <ContractRead />
                <ContractWrite />
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
