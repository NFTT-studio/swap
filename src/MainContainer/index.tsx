import React from 'react';
import {
  Flex,
} from '@chakra-ui/react';
import Helmet from 'react-helmet';

interface Props {
  children: React.ReactNode;
  title: string;
}

const MainContainer = ({ children, title }: Props) => {

  return (
    <>
      <Helmet>
        {title && <title>{title}</title>}
        <link rel="canonical" href="../" />
      </Helmet>
      <Flex
        as="main"
        height="100%"
        maxWidth="100vw"
        minHeight="100vh"
        w="100%"
        p="80px 20px 0 20px"
        boxSizing="border-box"
        flexDirection="column"
        alignItems="center"
      >
        {children}
      </Flex>
    </>
  );
};

export default MainContainer;
