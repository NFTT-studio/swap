/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import MainContainer from '../../MainContainer';
import PolkaSwap from '../polkaSwap';
import EvmSwap from '../evmSwap';
import NFTMart from '../../assets/images/NFTMart.png';

const Home = () => {
  const [defaultIndex, setIndex] = useState(localStorage.getItem('defaultIndex'));

  return (
    <>
      <MainContainer title={"NFTMart"}>
        {defaultIndex === "0" ?
          <PolkaSwap setIndex={setIndex} /> : null}
        {defaultIndex === "1" ?
          <EvmSwap setIndex={setIndex} /> : null}

        {/* <Tabs
          maxW="620px"
          w="100%"
          isFitted
          variant='enclosed'
          _focus={{ boxShadow: 'none' }}
          border="1px solid #E5E5E5"
          p="10px 0"
          defaultIndex={Number(defaultIndex)}
        >
          <TabList mb='1em'>
            <Tab
              onClick={() => {
                localStorage.setItem('defaultIndex', '0')
              }}
              _focus={{ boxShadow: 'none' }}
            >NMT Substrate to Evm</Tab>
            <Tab
              onClick={() => {
                localStorage.setItem('defaultIndex', '1')
              }}
              _focus={{ boxShadow: 'none' }}
            >NMT Evm to Substrate</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              
            </TabPanel>
            <TabPanel>
              <EvmSwap />
            </TabPanel>
          </TabPanels>
        </Tabs> */}
      </MainContainer>
    </>
  );
};

export default Home;
