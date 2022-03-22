/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import {
  useFormik,
} from 'formik';
import MainContainer from '../../MainContainer';
import PolkaSwap from '../polkaSwap';
import EvmSwap from '../evmSwap';



const Home = () => {
  return (
    <>
      <MainContainer title={"NFTMart"}>
        <Tabs
          maxW="620px"
          w="100%"
          isFitted
          variant='enclosed'
          _focus={{ boxShadow: 'none' }}
          border="1px solid #E5E5E5"
          p="10px"
        >
          <TabList mb='1em'>
            <Tab>NMT Substrate to Evm</Tab>
            <Tab>NMT Evm to Substrate</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <PolkaSwap />
            </TabPanel>
            <TabPanel>
              <EvmSwap />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </MainContainer>
    </>
  );
};

export default Home;
