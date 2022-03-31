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
  Image,
  Textarea,
} from '@chakra-ui/react';
import {
  useFormik,
} from 'formik';
import * as Yup from 'yup';
import { withdrawBalance } from '../contractUtil/api/EvmTosubstrate';
import { getBalance } from '../contractUtil/api/getBalance';
import detectEthereumProvider from '@metamask/detect-provider';
import NFTMart from '../../assets/images/NFTMart.png';
import arrow from '../../assets/images/arrow.png';


interface Props {
  setIndex: React.Dispatch<React.SetStateAction<string | null>>;
}
const Home = ({ setIndex }: Props) => {
  const toast = useToast();
  const [Tx, setTx] = useState("");
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
  const [free, setFres] = useState<number>(0);
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
    const init = async () => {
      console.log(isProvider, chainId === '0x2f9f', currentAccount);
      if (isProvider && currentAccount) {
        let nmtBalance = await getBalance({ isProvider, currentAccount });
        console.log(nmtBalance, isProvider, currentAccount);
        setFres(nmtBalance || 0);
      }
    };
    init();
  }, [currentAccount, Tx, isProvider]);
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
              title: 'Transaction hash:',
              status: 'success',
              position: 'top',
              duration: 9000,
              description: `${result.toString()}`,
              isClosable: true,
            });
            setTx(result.toString());
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
        }}
      >
        <Flex
          maxW="100%"
          w="100%"
          p="30px"
          flexDirection="column"
          alignItems="center"
          background="#FFFFFF"
          borderRadius="5px"
          border="1px solid #E5E5E5"
        >
          {!install ?
            <Flex width="100%" mb="25px" alignItems="center" justifyContent="center">
              <Link
                maxWidth="714px"
                width="100%"
                textDecoration="none"
                target="blank"
                _hover={{
                  textDecoration: "none",
                }}
                href="https://metamask.io/download.html"
              >
                <Button
                  textDecoration="none"
                  background='#f50057'
                  maxWidth="714px"
                  width="100%"
                  // whiteSpace="normal"
                  height="36px"
                  color="#FFFFFF"
                  fontSize="18px"
                  fontFamily="TTHoves-Medium, TTHoves"
                  fontWeight="500"
                  _hover={{
                    textDecoration: "none",
                    background: '#c51162',
                  }}
                >
                  {`please install metamask`}
                </Button>
              </Link>
            </Flex>
            : null}
          <Flex width="100%" mb="30px" alignItems="center" justifyContent="center">
            <Flex
              flexDirection="column"
              alignItems="center"
            >
              <Flex
                mb="25px"
              >
                <Image
                  src={NFTMart}
                />
              </Flex>
              <Text
                w="90px"
                textAlign="center"
              >
                NMT Native
              </Text>
            </Flex>
            <Flex
              ml="44%"
              flexDirection="column"
              alignItems="center"
            >
              <Flex
                mb="25px"
                position="relative"
              >
                <Image
                  src={NFTMart}
                />
                <Text
                  cursor=""
                  height="26px"
                  m="0px"
                  p="0px"
                  position="absolute"
                  right="3px"
                  bottom="0"
                  textAlign="center"
                  color="#FF0707"
                  fontWeight='bold'
                  fontSize="20px"
                >
                  E
                </Text>
              </Flex>
              <Text
                w="90px"
                textAlign="center"
              >
                NMT EVM
              </Text>
            </Flex>
          </Flex>

          <Flex
            w="100%"
            alignItems="center" justifyContent="center"
          >
            <Textarea
              width="100%"
              maxWidth="320px"
              height="60px"
              minHeight="60px"
              background="#FFFFFF"
              borderRadius="5px"
              id="receiver"
              name="receiver"
              value={formik.values.receiver}
              onChange={formik.handleChange}
              fontSize="16px"
              fontFamily="TTHoves-Regular, TTHoves"
              fontWeight="400"
              color="#000000"
              _focus={{
                boxShadow: 'none',
                color: '#000000',
              }}
              _after={{
                boxShadow: 'none',
                color: '#000000',
                border: '1px solid #000000',
              }}
              placeholder="To Native Address"
              _placeholder={{
                color: '#999999',
                fontSize: '16px',
              }}
            />
            {formik.errors.receiver && formik.touched.receiver ? (
              <div style={{ color: 'red' }}>{formik.errors.receiver}</div>
            ) : null}
            <Flex
              p="2%"
              width="20%"
              flexDirection="column"
              alignItems="center"
            >
              <Flex
                position="relative"
              >
                <Image
                  transform="rotate(180deg)"
                  src={arrow}
                />
                <Text
                  background='#f50057'
                  _hover={{
                    background: '#c51162',
                  }}
                  cursor="pointer"
                  w="120px"
                  h="40px"
                  lineHeight="40px"
                  color="#FFFFFF"
                  fontSize="18px"
                  fontFamily="TTHoves-Medium, TTHoves"
                  fontWeight="500"
                  m="0px"
                  position="absolute"
                  left="calc(50% - 65px)"
                  top="-40px"
                  textAlign="center"
                  onClick={() => {
                    localStorage.setItem('defaultIndex', '0')
                    setIndex("0");
                  }}
                >
                  switch
                </Text>
              </Flex>
            </Flex>
            {install && currentAccount === "" ?
              <Flex
                width="100%"
                maxWidth="320px"
                alignItems="center" justifyContent="center">
                <Button
                  background='#f50057'
                  width="100%"
                  height="60px"
                  whiteSpace="normal"
                  color="#FFFFFF"
                  fontSize="18px"
                  fontFamily="TTHoves-Medium, TTHoves"
                  fontWeight="500"
                  _hover={{
                    background: '#c51162',
                  }}
                  onClick={() => _handleConnectClick()}
                >
                  {`Connect Wallet`}
                </Button>
              </Flex>
              : null}
            {install && chainId !== '0x2f9f' ?
              <Flex
                width="100%"
                maxWidth="320px"
                alignItems="center" justifyContent="center">
                <Button
                  onClick={_handleSwithChain}
                  background='#f50057'
                  width="100%"
                  height="60px"
                  whiteSpace="normal"
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
            {install && currentAccount !== "" && chainId === '0x2f9f' ?
              <Textarea
                maxWidth="320px"
                width="100%"
                height="60px"
                minHeight="60px"
                background="#FFFFFF"
                borderRadius="5px"
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
              : null}

          </Flex>


          <InputGroup
            width="100%"
            maxWidth="320px"
            background="#FFFFFF"
            borderRadius="5px"
            m="20px 0"
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
              placeholder={`Remaining amount ${free && free}`}
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
          <Flex w="100%" justifyContent="center" >
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
          {Tx ?
            <Link
              textDecoration="none"
              target="blank"
              href={`https://scan.nftmart.io/mainnet/analytics/search/${Tx}`}
              _hover={{
                textDecoration: "none",
              }}
            >
              <Text
                mt="20px"
                fontSize="20px"
                fontFamily="PingFangSC-Regular, PingFang SC"
                fontWeight="Bold"
                color="#000000"
              >
                Tx: {Tx}
              </Text>
            </Link> : null
          }

          <Text
            mt="20px"
            fontSize="40px"
            fontFamily="PingFangSC-Regular, PingFang SC"
            fontWeight="Bold"
            color="#000000"
          >
            in transaction...
          </Text>
          <Flex
            mt="20px"
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
