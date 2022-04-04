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
} from '@chakra-ui/react';
import {
  useFormik,
} from 'formik';
import * as Yup from 'yup';
import { erc20toNative } from '../../SDK/erc20SDK/api/erc20toNative';
import { getBalance } from '../../SDK/erc20SDK/api/getBalance';
import detectEthereumProvider from '@metamask/detect-provider';
import NFTMart from '../../assets/images/NFTMart.png';
import arrow from '../../assets/images/arrow.png';


interface Props {
  setIndex: React.Dispatch<React.SetStateAction<string>>;
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
  const [install, setInstall] = useState(true);
  const [isProvider, setIsProvider] = useState<EthereumProviderEip1193>();
  const [chainId, setChainId] = useState("0x1");
  const [currentAccount, setCurrentAccount] = useState("");
  const [free, setFree] = useState<number>(0);
  const handleChainChanged = (_chainId: any) => {
    window.location.reload();
  }
  const handleAccountsChanged = async (accounts: any) => {
    if (accounts[0]) {
      setCurrentAccount(accounts[0])
      console.log(accounts[0])
    } else {
      setCurrentAccount("")
    }
  }

  const [isSubmitting, setIsSubmitting] = useState(false);
  const schema = Yup.object().shape({
    receiver: Yup.string().required("Required"),
    amount: Yup.number().min(1).required("Required"),
  });
  const requestAccount = async () => {
    try {
      if (isProvider) {
        let accounts = await isProvider.request({ method: 'eth_requestAccounts' });
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
        params: [{ chainId: '0x1' }],
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
      if (isProvider && currentAccount) {
        let nmtBalance = await getBalance({ isProvider, currentAccount });
        console.log(nmtBalance, currentAccount);
        setFree(nmtBalance || 0);
      }
    };
    init();
  }, [currentAccount, Tx, isProvider]);
  useEffect(() => {
    // const initExtension = async () => {
    //   await requestAccount();
    // };
    // if (defaultIndex === "1") {
    //   initExtension();
    // }
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
    if (chainId !== '0x1') {
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
      erc20toNative({
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
              description: `success`,
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
          height: "100%",
        }}
      >
        <Flex
          maxW="100%"
          w="100%"
          height="100%"
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
          {install && chainId !== '0x1' ?
            <Flex
              mb="25px"
              width="100%"
              maxWidth="714px"
              textDecoration="none"
              _hover={{
                textDecoration: "none",
              }}
              alignItems="center"
              justifyContent="center">
              <Button
                onClick={_handleSwithChain}
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
                {`Please Select NFTMart EVM Testnet First`}
              </Button>
            </Flex>
            : null}
          <Flex width="100%" mb="30px" alignItems="center" justifyContent="center">
            <Flex
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
              </Flex>
              <Text
                w="90px"
                textAlign="center"
              >
                NMT ERC20
              </Text>
            </Flex>
            <Flex
              ml="44%"
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
          </Flex>

          <Flex
            w="100%"
            alignItems="center" justifyContent="center"
          >
            {install && currentAccount !== "" && chainId === '0x1' ?
              <Input
                maxWidth="470px"
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
            {install && currentAccount === "" ?
              <Flex
                width="100%"
                maxWidth="470px"
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
                  src={arrow}
                />
              </Flex>
            </Flex>
            <Input
              width="100%"
              maxWidth="470px"
              height="60px"
              minHeight="60px"
              background="#FFFFFF"
              borderRadius="5px"
              id="receiver"
              name="receiver"
              value={formik.values.receiver}
              onChange={formik.handleChange}
              fontSize="14px"
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
                fontSize: '14px',
              }}
            />
            {formik.errors.receiver && formik.touched.receiver ? (
              <div style={{ color: 'red' }}>{formik.errors.receiver}</div>
            ) : null}

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
              fontSize="14px"
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
              isDisabled={chainId !== '0x1' || !currentAccount}
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
              {""}
            </Text>
          </Flex>
        </Flex>
      </form>
    </>
  );
};

export default Home;
