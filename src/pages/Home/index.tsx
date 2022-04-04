/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import MainContainer from '../../MainContainer';
import PolkaSwap from '../polkaSwap';
import EvmSwap from '../evmSwap';
import ERC20Swap from '../erc20Swap';

import { Tabs, TabList, TabPanels, Tab, TabPanel, Flex, Link } from '@chakra-ui/react'

const Home = () => {
  const [tabIndex] = useState(localStorage.getItem('tabIndex') || "0");
  const [defaultIndex, setIndex] = useState(localStorage.getItem('defaultIndex') || "0");

  return (
    <>
      <MainContainer title={"NFTMart"}>
        <Tabs
          w="100%"
          maxWidth="1280px"
          h="100%"
          minHeight="700px"
          m="20px 20px"
          boxSizing="border-box"
          isManual variant='enclosed'
          _focus={{ boxShadow: 'none' }}
          border="1px solid #E5E5E5"
          p="10px 0"
          defaultIndex={Number(tabIndex)}
        >
          <TabList
            m="0px 16px"
            height="100%"
            boxSizing='border-box'
          >
            <Tab
              w="50%"
              onClick={() => {
                localStorage.setItem('tabIndex', '0')
              }}
              _focus={{ boxShadow: 'none' }}
            >{"NMT ERC20 to Native"}</Tab>
            <Tab
              w="50%"
              onClick={() => {
                localStorage.setItem('tabIndex', '1')
              }}
              _focus={{ boxShadow: 'none' }}
            >{"Substrate <-> EVM"}</Tab>
          </TabList>
          <TabPanels w="100%" height="100%">
            <TabPanel height="100%">
              <ERC20Swap setIndex={setIndex} />
            </TabPanel>
            <TabPanel height="100%">
              {defaultIndex === "0" ?
                <PolkaSwap setIndex={setIndex} /> : null}
              {defaultIndex === "1" ?
                <EvmSwap setIndex={setIndex} /> : null}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </MainContainer>
      <Flex
        background="#f5f5f5"
        height="80px"
        color="rgba(0, 0, 0, 0.87)"
        justifyContent="center"
        alignItems="center"
      >
        Power by
        &nbsp;
        <Link
          textDecoration="none"
          target="blank"
          _hover={{
            textDecoration: "none",
          }}
          _focus={{
            boxShadow: "none",
          }}
          href="https://www.nftmart.io"
        >
          NFTMart.io
        </Link>

      </Flex >
    </>
  );
};

export default Home;
