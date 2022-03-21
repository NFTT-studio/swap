/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import detectEthereumProvider from '@metamask/detect-provider';
import {
  Spinner,
  Image,
  Flex,
  Text,
  Center,
  Button,
  SimpleGrid,
  useMediaQuery,
} from '@chakra-ui/react';



const Home = () => {
  const [isLargerThan700] = useMediaQuery('(min-width: 700px)');
  function startApp(provider: any) {
    // If the provider returned by detectEthereumProvider is not the same as
    // window.ethereum, something is overwriting it, perhaps another wallet.
    if (provider !== window.ethereum) {
      console.error('Do you have multiple wallets installed?');
    }
    // Access the decentralized web!
  }
  const iSprovider = async () => {
    const provider = await detectEthereumProvider();
    if (provider) {
      startApp(provider);
    } else {
      console.log('Please install MetaMask!');
    }
  }
  useEffect(() => {
    iSprovider()
  }, []);
  return (
    <>
      {isLargerThan700
        ? (
          <Text
            fontSize="32px"
            fontFamily="TTHoves-Bold, TTHove"
            fontWeight="bold"
            color="#000000"
            lineHeight="38px"
          >
            111
          </Text>
        ) : (
          <Text
            fontSize="32px"
            fontFamily="TTHoves-Bold, TTHove"
            fontWeight="bold"
            color="#000000"
            lineHeight="38px"
          >
            111
          </Text>
        )}
    </>
  );
};

export default Home;
