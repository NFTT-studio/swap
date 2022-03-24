/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import {
  Link,
  Flex,
  Text,
  Button,
  InputGroup,
  Input,
  InputRightAddon,
  useToast,
} from '@chakra-ui/react';
import {
  useFormik,
} from 'formik';
import * as Yup from 'yup';
import { withdrawBalance } from '../contractUtil/api/EvmTosubstrate';
import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from "ethers"


const Home = () => {
  const toast = useToast();
  const defaultIndex = localStorage.getItem('defaultIndex');

  type EthereumProviderEip1193 = {
    request: (args: {
      method: string
      params?: unknown[] | object
    }) => Promise<unknown>
  }
  const [install, setInstall] = useState(false);
  const [isProvider, setIsProvider] = useState<EthereumProviderEip1193>();
  const [chainId, setChainId] = useState("");
  const [currentAccount, setCurrentAccount] = useState("");
  const handleChainChanged = (_chainId: any) => {
    window.location.reload();

    // this.setState({chainId:_chainId});
  }
  const handleAccountsChanged = async (accounts: any) => {
    console.log(accounts);
    if (accounts[0]) {
      setCurrentAccount(accounts[0])
      console.log(accounts[0])
    } else {
      setCurrentAccount("")
    }
  }

  const [isSubmitting, setIsSubmitting] = useState(false);
  const schema = Yup.object().shape({
    // Gerald: Yup.string().required("必填"),
    // amount: Yup.number().required("必填"),
  });
  const requestAccount = async () => {
    try {
      if (isProvider) {
        let accounts = await isProvider.request({ method: 'eth_requestAccounts' });
        console.log(accounts);
        await handleAccountsChanged(accounts);
      }
    } catch (error: any) {
      toast({
        title: 'error',
        status: 'error',
        position: 'top',
        duration: 3000,
        description: error.message,
      });
    }

  }
  const _handleSwithChain = async () => {
    try {
      await isProvider?.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x2f9f' }],
      });
    } catch (switchError) {
      console.info(switchError);
    }
  }
  useEffect(() => {
    const initExtension = async () => {
      const provider: any = await detectEthereumProvider();
      if (provider) {
        setIsProvider(provider);
        setInstall(true);
        provider?.on('chainChanged', handleChainChanged);
        provider?.on('accountsChanged', handleAccountsChanged);
        let chainId = await provider.request({ method: 'eth_chainId' });
        setChainId(chainId);
        console.log(provider, chainId);
      } else {
        console.log('Please install MetaMask!');
      }
    };

    initExtension();
  }, []);
  useEffect(() => {
    const initExtension = async () => {
      await requestAccount();
    };
    if (defaultIndex === "1") {
      initExtension();
    }
  }, [isProvider, defaultIndex]);
  const _handleConnectClick = async () => {
    if (!isProvider) {
      toast({
        title: 'error',
        status: 'error',
        position: 'top',
        duration: 3000,
        description: "Please Install MetaMask First",
      });
      return;
    }
    if (chainId !== '0x2f9f') {
      toast({
        title: 'error',
        status: 'error',
        position: 'top',
        duration: 3000,
        description: "Please Select NFTMart EVM Testnet First",
      });
      return;
    }
    requestAccount();
  }

  const formik = useFormik({
    initialValues: {
      receiver: '',
      amount: '',
    },
    onSubmit: (formValue, formAction) => {
      setIsSubmitting(true);
      withdrawBalance({
        isProvider: isProvider,
        receiver: formValue?.receiver,
        amount: formValue?.amount,
        cb: {
          success: (result: any) => {
            toast({
              title: 'success',
              status: 'success',
              position: 'top',
              duration: 9000,
              description: `Transaction hash:${result.toString()}`,
              isClosable: true,
            });
            setIsSubmitting(false);
          },
          error: (error) => {
            toast({
              title: 'error',
              status: 'error',
              position: 'top',
              duration: 9000,
              description: error.message,
              isClosable: true,
            });
            setIsSubmitting(false);
          },
        },
      });
    },
    validationSchema: schema,
  });

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        style={{
          width: "100%",
          maxWidth: "580px",
        }}
      >
        <Flex
          maxW="100%"
          w="100%"
          p="30px"
          flexDirection="column"
          background="#FFFFFF"
          borderRadius="4px"
          border="1px solid #E5E5E5"
        >
          {chainId !== '0x2f9f' ?
            <Flex mb="34px" alignItems="center" justifyContent="center">
              <Button
                onClick={_handleSwithChain}
                background='#f50057'
                width="100%"
                // whiteSpace="normal"
                height="40px"
                color="#FFFFFF"
                fontSize="18px"
                fontFamily="TTHoves-Medium, TTHoves"
                fontWeight="500"
                _hover={{
                  background: '#c51162',
                }}
              >
                {`Please Select NFTMart EVM Testnet First`}
              </Button>
            </Flex>
            : null}
          <Flex mb="30px" h="21px" alignItems="center" justifyContent="center">
            <Text
              fontSize="1.5rem"
            >
              NMT Evm to Substrate
            </Text>
          </Flex>
          {!install ?
            <Flex mb="34px" alignItems="center" justifyContent="center">
              <Link
                textDecoration="none"
                target="blank"
                href="https://metamask.io/download.html"
              >
                <Button
                  background='#f50057'
                  width="100%"
                  // whiteSpace="normal"
                  height="66px"
                  color="#FFFFFF"
                  fontSize="18px"
                  fontFamily="TTHoves-Medium, TTHoves"
                  fontWeight="500"
                  _hover={{
                    background: '#c51162',
                  }}
                >
                  {`Please click and install MetaMask!`}
                  <br />
                  {`https://metamask.io/download.html `}
                </Button>
              </Link>
            </Flex>
            : null}
          {install && currentAccount === "" ?
            <Flex mb="34px" alignItems="center" justifyContent="center">
              <Button
                background='#f50057'
                width="100%"
                whiteSpace="normal"
                height="66px"
                color="#FFFFFF"
                fontSize="18px"
                fontFamily="TTHoves-Medium, TTHoves"
                fontWeight="500"
                onClick={() => _handleConnectClick()}
                _hover={{
                  background: '#c51162',
                }}
              >
                {`Connect Wallet`}
              </Button>
            </Flex>
            : null}
          {install && currentAccount !== "" ?
            <InputGroup
              width="100%"
              height="40px"
              background="#FFFFFF"
              borderRadius="4px"
              mb="10px"
              _focus={{
                boxShadow: 'none',
              }}
            >
              <Input
                id="address"
                name="address"
                value={currentAccount}
                isReadOnly
                fontSize="14px"
                fontFamily="TTHoves-Regular, TTHoves"
                fontWeight="400"
                lineHeight="14px"
                isDisabled
                _focus={{
                  boxShadow: 'none',
                  color: '#000000',
                  border: '1px solid #000000',
                }}
                _after={{
                  boxShadow: 'none',
                  color: '#000000',
                  border: '1px solid #000000',
                }}
                placeholder="To Native Address"
                _placeholder={{
                  color: '#999999',
                  fontSize: '12px',
                }}
              />
            </InputGroup>
            : null}
          <InputGroup
            width="100%"
            height="40px"
            background="#FFFFFF"
            borderRadius="4px"
            mb="10px"
            _focus={{
              boxShadow: 'none',
            }}
          >
            <Input
              id="receiver"
              name="receiver"
              value={formik.values.receiver}
              onChange={formik.handleChange}
              fontSize="16px"
              fontFamily="TTHoves-Regular, TTHoves"
              fontWeight="400"
              lineHeight="14px"
              color="#000000"
              _focus={{
                boxShadow: 'none',
                color: '#000000',
                border: '1px solid #000000',
              }}
              _after={{
                boxShadow: 'none',
                color: '#000000',
                border: '1px solid #000000',
              }}
              placeholder="To Native Address"
              _placeholder={{
                color: '#999999',
                fontSize: '12px',
              }}
            />
          </InputGroup>
          {formik.errors.receiver && formik.touched.receiver ? (
            <div style={{ color: 'red' }}>{formik.errors.receiver}</div>
          ) : null}
          <InputGroup
            width="100%"
            height="40px"
            background="#FFFFFF"
            borderRadius="4px"
            mb="10px"
            _focus={{
              boxShadow: 'none',

            }}
          >
            <Input
              id="amount"
              name="amount"
              value={formik.values.amount}
              onChange={formik.handleChange}
              fontSize="16px"
              fontFamily="TTHoves-Regular, TTHoves"
              fontWeight="400"
              lineHeight="14px"
              color="#000000"
              _focus={{
                boxShadow: 'none',
                color: '#000000',
                border: '1px solid #000000',
              }}
              _after={{
                boxShadow: 'none',
                color: '#000000',
                border: '1px solid #000000',
              }}
              placeholder="Swap Amount"
              _placeholder={{
                color: '#999999',
                fontSize: '12px',
              }}
            />
            <InputRightAddon
              width="72px"
              height="40px"
              background="#F4F4F4"
              borderRadius="0px 4px 4px 0px"
              border="1px solid #E5E5E5"
              fontSize="14px"
              fontFamily="TTHoves-Regular, TTHoves"
              fontWeight="400"
              color="#999999"
              lineHeight="14px"
              // eslint-disable-next-line react/no-children-prop
              children="NMT"
            />
          </InputGroup>
          {formik.errors.amount && formik.touched.amount ? (
            <div style={{ color: 'red' }}>{formik.errors.amount}</div>
          ) : null}
          <Flex w="100%" justifyContent="center" pt="10px">
            <Button
              isLoading={isSubmitting}
              bg="#000000"
              color="#FFFFFF"
              fontSize="14px"
              fontFamily="TTHoves-Medium, TTHoves"
              fontWeight="500"
              lineHeight="20px"
              borderRadius="4px"
              isDisabled={chainId !== '0x2f9f' || !currentAccount}
              type="submit"
              _hover={{
                background: '#000000 !important',
              }}
            >
              SWAP
            </Button>
          </Flex>
          <Flex
            mt="10px"
            width="100%"
            flexFlow="wrap"
            justifyContent="flex-start"
            alignItems="center"
            background="#F8F8F9"
            borderRadius="2px"
            p="10px"
          >
            <Text
              width="312px"
              fontSize="12px"
              fontFamily="PingFangSC-Regular, PingFang SC"
              fontWeight="400"
              color="#858999"
            >
              Power by NFTMart.io   NMTSwap Source Code
            </Text>
          </Flex>
        </Flex>
      </form>
    </>
  );
};

export default Home;
