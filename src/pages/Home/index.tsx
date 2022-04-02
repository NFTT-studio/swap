/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import MainContainer from '../../MainContainer';
import PolkaSwap from '../polkaSwap';
import EvmSwap from '../evmSwap';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Flex, Link } from '@chakra-ui/react'

const Home = () => {
  const [tabIndex] = useState(localStorage.getItem('tabIndex') || "0");
  const [defaultIndex, setIndex] = useState(localStorage.getItem('defaultIndex') || "0");

  return (
    <>
      <MainContainer title={"NFTMart"}>
        <Tabs
          w="100%"
          isManual variant='enclosed'
          _focus={{ boxShadow: 'none' }}
          border="1px solid #E5E5E5"
          p="10px 0"
          defaultIndex={Number(tabIndex)}
        >
          <TabList
            m="0px 16px"
            boxSizing='border-box'
          >
            <Tab
              w="50%"
              onClick={() => {
                localStorage.setItem('tabIndex', '0')
              }}
              _focus={{ boxShadow: 'none' }}
            >One</Tab>
            <Tab
              w="50%"
              onClick={() => {
                localStorage.setItem('tabIndex', '1')
              }}
              _focus={{ boxShadow: 'none' }}
            >Two</Tab>
          </TabList>
          <TabPanels w="100%">
            <TabPanel>
              <EvmSwap setIndex={setIndex} />
            </TabPanel>
            <TabPanel>
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
