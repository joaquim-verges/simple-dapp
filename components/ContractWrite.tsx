'use client';

import Wrapper from 'components/Wrapper';
import Button from './Button';
import MonoLabel from './MonoLabel';
import { useSendTransaction } from 'thirdweb/react';
import { prepareContractCall } from 'thirdweb';
import { contract } from './providers';
import { shorten } from 'lib/utils';

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
  const {mutate: sendTransaction, data, isPending, error} = useSendTransaction();

  const setGreeting = () => {
    const tx = prepareContractCall({
      contract,
      method: 'function setGreeting(string)',
      params: [pickRandomGreeting()],
    });
    sendTransaction(tx);
  };

  return (
    <Wrapper title="Sponsored transaction">
      {data && (
        <p>
          Transaction hash: <MonoLabel label={shorten(data.transactionHash)} />
        </p>
      )}
      {error && <p>Error sending transaction. {error?.message}</p>}
        <Button
          disabled={isPending}
          onClick_={() => setGreeting()}
          cta="Set Greeting"
        />
    </Wrapper>
  );
};

export default ContractWrite;
