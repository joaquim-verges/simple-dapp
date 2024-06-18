'use client';

import Wrapper from 'components/Wrapper';
import {GREETER_ABI} from 'lib/utils';
import { useAccount, useReadContract} from 'wagmi';

import MonoLabel from './MonoLabel';
import { contractAddress } from './providers';



const ContractRead = () => {
  const {chain} = useAccount();

  // Doesnt auto reload because biconomy 'sendSponsoredTransaction' does not invalidate this query :(
  const {data, isError, isLoading} = useReadContract({
    address: contractAddress,
    abi: GREETER_ABI,
    functionName: 'greeting',
    args: [],
  });

  if (!chain) {
    return (
      <Wrapper title="Contract Read">
        <p>Loading...</p>
      </Wrapper>
    );
  }

  if (!contractAddress) {
    return (
      <Wrapper title="Contract Read">
        <p>Unsupported network. Please switch to Goerli or Mainnet.</p>
      </Wrapper>
    );
  }

  if (isError) {
    return (
      <Wrapper title="Contract Read">
        <p>Error reading from contract.</p>
      </Wrapper>
    );
  }
  
  if (isLoading) {
    return (
      <Wrapper title="Contract Read">
        <p>Loading...</p>
      </Wrapper>
    );
  }
    
  return (
      <Wrapper title="Contract Read">
        <p>
          Current greeting is:{' '}
          {!data ? (
            <MonoLabel label="Error." />
          ) : (
            <MonoLabel label={data} />
          )}
        </p>
      </Wrapper>
    );
};

export default ContractRead;
