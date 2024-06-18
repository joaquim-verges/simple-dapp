'use client';

import Wrapper from 'components/Wrapper';
import MonoLabel from './MonoLabel';
import { contract } from './providers';
import { useReadContract } from 'thirdweb/react';



const ContractRead = () => {
  // auto reloads on contract state change
  const {data, isError, isLoading} = useReadContract({
    contract,
    method: 'function greeting() returns (string)',
  });

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
