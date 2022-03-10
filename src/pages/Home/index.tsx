/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import React, { useState, MouseEventHandler, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
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
