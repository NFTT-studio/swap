/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import MainContainer from '../../MainContainer';
import PolkaSwap from '../polkaSwap';
import EvmSwap from '../evmSwap';

const Home = () => {
  const [defaultIndex, setIndex] = useState(localStorage.getItem('defaultIndex'));

  return (
    <>
      <MainContainer title={"NFTMart"}>
        {defaultIndex === "0" ?
          <PolkaSwap setIndex={setIndex} /> : null}
        {defaultIndex === "1" ?
          <EvmSwap setIndex={setIndex} /> : null}
      </MainContainer>
    </>
  );
};

export default Home;
