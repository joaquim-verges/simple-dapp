'use client';

import Wrapper from 'components/Wrapper';
import {GREETER_ABI, shorten} from 'lib/utils';
import {useAccount, useSwitchChain} from 'wagmi';

import Button from './Button';
import MonoLabel from './MonoLabel';
import { baseSepolia } from 'viem/chains';
import { useSendSponsoredTransaction, useUserOpWait } from '@biconomy/use-aa';
import { encodeFunctionData } from 'viem';
import { PaymasterMode } from '@biconomy/account';
import { contractAddress } from './providers';

const GREETINGS = [
  "Hello!",
  "Hola!",
  "Bonjour!",
  "Ciao!",
  "Hallo!",
  "Hej!",
  "Namaste!",
  "Konnichiwa!",
  "Annyeonghaseyo!",
  "Olá!",
  "Zdravstvuyte!",
  "Nǐ hǎo!",
  "Shikamoo!",
];

function pickRandomGreeting() {
  return GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
}

const ContractWrite = () => {
  const {chain} = useAccount();
  const {switchChain} = useSwitchChain();

  const {
    mutate: sendTransaction,
    data: userOpResponse,
    error,
    isPending,
  } = useSendSponsoredTransaction();

  const {
    isLoading: waitIsLoading,
    isSuccess: waitIsSuccess,
    error: waitError,
    data,
  } = useUserOpWait(userOpResponse);

  const setGreeting = () =>
    // can't use regular WAGMI hooks to send AA transactions :(
    sendTransaction({
      transactions: {
        to: contractAddress,
        data: encodeFunctionData({
          abi: GREETER_ABI,
          functionName: "setGreeting",
          args: [pickRandomGreeting()],
        }),
      },
      options: {
        // had to add this to sponsor tx, but wasn't in the docs?
        paymasterServiceData: {mode: PaymasterMode.SPONSORED},
      }
    });

  if (!chain) {
    return (
      <Wrapper title="Sponsored transaction">
        <Button onClick_={() => switchChain({ chainId: baseSepolia.id })} cta="Switch to Base Sepolia" />
      </Wrapper>
    );
  }

  if (!contractAddress) {
    return (
      <Wrapper title="Sponsored transaction">
        <p>Unsupported network. Please switch to Base Sepolia.</p>
      </Wrapper>
    );
  }

  return (
    <Wrapper title="Sponsored transaction">
      {data && waitIsSuccess && (
        <p>
          Transaction hash: <MonoLabel label={shorten(data.receipt?.transactionHash)} />
        </p>
      )}
      {error || waitError && <p>Error sending transaction. {error?.message || waitError?.message}</p>}
        <Button
          disabled={isPending || waitIsLoading}
          onClick_={() => setGreeting()}
          cta="Set Greeting"
        />
    </Wrapper>
  );
};

export default ContractWrite;
