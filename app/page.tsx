'use client';

import {useSmartAccount} from '@biconomy/use-aa';
import Balance from 'components/Balance';
import Button from 'components/Button';
import ContractRead from 'components/ContractRead';
import ContractWrite from 'components/ContractWrite';
import {shorten} from 'lib/utils';
import {useAccount} from 'wagmi';

import {usePrivy, useWallets} from '@privy-io/react-auth';

const MonoLabel = ({label}: {label: string}) => {
  return <span className="rounded-xl bg-slate-200 px-2 py-1 font-mono">{label}</span>;
};

export default function Home() {
  // Privy hooks
  const {ready, authenticated, login, logout} = usePrivy();
  const {wallets, ready: walletsReady} = useWallets();

  // WAGMI hooks
  const {address} = useAccount();

  // Biconomy hooks
  const {smartAccountAddress} = useSmartAccount();

  if (!ready) {
    return null;
  }

  return (
    <>
      <main className="min-h-screen bg-slate-200 p-4 text-slate-800">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="border-1 flex flex-col items-start gap-2 rounded border border-black bg-slate-100 p-3">
            <h1 className="text-4xl font-bold">Privy + WAGMI + Biconomy</h1>
            {ready && !authenticated && (
              <>
                <p>You are not authenticated with Privy</p>
                <div className="flex items-center gap-4">
                  <Button onClick_={login} cta="Login with Privy" />
                </div>
              </>
            )}

            {walletsReady &&
              wallets.map((wallet) => {
                return (
                  <div
                    key={wallet.address}
                    className="flex min-w-full flex-row flex-wrap items-center justify-between gap-2 bg-slate-50 p-4"
                  >
                    <div>
                      <MonoLabel label={shorten(wallet.address)} />
                    </div>
                  </div>
                );
              })}

            {ready && authenticated && (
              <>
                <p className="mt-2">You are logged in with privy.</p>
                <Button onClick_={logout} cta="Logout from Privy" />
              </>
            )}
            {address && smartAccountAddress && (
              <>
                <h2 className="mt-6 text-2xl">Account</h2>
                <p>
                  address: <MonoLabel label={smartAccountAddress} />
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
