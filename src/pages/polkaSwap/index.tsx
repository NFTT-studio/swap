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
import { getBalance } from '../polkaSDK/api/getBalance';
import { substrateToEvm } from '../polkaSDK/api/substrateToEvm';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { web3Accounts, web3Enable, web3FromSource } from '@polkadot/extension-dapp';
import { encodeAddress } from '@polkadot/util-crypto';
import Login from '../../components/Login';
import { moneyDelete } from '../../utils/fomart';
import NFTMart from '../../assets/images/NFTMart.png';
import arrow from '../../assets/images/arrow.png';


interface Props {
  setIndex: React.Dispatch<React.SetStateAction<string | null>>;
}
const Home = ({ setIndex }: Props) => {
  const toast = useToast();
  const [injected, setInjected] = useState(false);
  const [free, setFres] = useState(0);
  const [value, setValue] = useState("");
  const [Tx, setTx] = useState("");
  const [injectedAccounts, setInjectedAccounts] = useState<InjectedAccountWithMeta[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const schema = Yup.object().shape({
    Gerald: Yup.string().required("必填"),
    amount: Yup.number().required("必填"),
  });
  const handleClick = async (index: number) => {
    // treat first account as signer
    await web3FromSource(injectedAccounts[index].meta.source);
    // eslint-disable-next-line no-multi-assign
    injectedAccounts[index].address = encodeAddress(injectedAccounts[index].address, 12191);
    setValue(injectedAccounts[index].address);
  };
  useEffect(() => {
    const initExtension = async () => {
      const allInjected = await web3Enable('NFTMart');
      if (allInjected.length === 0) {
        setInjected(false);
      } else {
        setInjected(true);
        // get accounts info in extension
        const web3InjectedAccounts = await web3Accounts();
        if (web3InjectedAccounts.length !== 0) {
          console.log(web3InjectedAccounts);
          setInjectedAccounts(web3InjectedAccounts);
        }
      }
    };

    initExtension();
  }, []);
  useEffect(() => {
    if (value) {
      getBalance(value).then(res => {
        setFres(res.free)
      });
    }
  }, [value]);
  const formik = useFormik({
    initialValues: {
      amount: '',
      Gerald: '',
    },
    onSubmit: (formValue, formAction) => {
      setIsSubmitting(true);
      substrateToEvm({
        address: value,
        amount: formValue?.amount,
        Gerald: formValue?.Gerald,
        cb: {
          success: (result: any) => {
            if (result.dispatchError) {
              toast({
                title: 'error',
                status: 'error',
                position: 'top',
                duration: 3000,
                description: result.dispatchError.toString(),
              });
              setIsSubmitting(false);
            } else {
              toast({
                title: "success",
                status: 'success',
                position: 'top',
                duration: 3000,
              });
              setTx(result.txHash.toString())
              setIsSubmitting(false);
            }
          },
          error: (error) => {
            if (error.toString() === 'Error: Cancelled') {
              setIsSubmitting(false);
            } else {
              toast({
                title: 'error',
                status: 'error',
                position: 'top',
                duration: 3000,
                description: error,
              });
            }
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
          {!injected ?
            <Flex width="100%" mb="25px" alignItems="center" justifyContent="center">
              <Link
                maxWidth="714px"
                width="100%"
                textDecoration="none"
                target="blank"
                _hover={{
                  textDecoration: "none",
                }}
                href="https://docs.google.com/forms/d/1WCNeiufW1XxLsyme7dJUys7y7t-XJRyp1nQR0bhnvVQ"
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
                  {`please install polkdot{.js}`}
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
            {injected && injectedAccounts.length === 0 ?
              <Flex mb="34px" alignItems="center" justifyContent="center">
                <Button
                  width="100%"
                  whiteSpace="normal"
                  height="66px"
                  color="#FFFFFF"
                  fontSize="18px"
                  fontFamily="TTHoves-Medium, TTHoves"
                  fontWeight="500"
                  background='#f50057'
                  _hover={{
                    background: '#c51162',
                  }}
                >
                  {`Please use Polkadot extension create or import your account`}
                </Button>
              </Flex>
              : null}
            {injected && injectedAccounts.length > 0 ?
              <Login
                injectedAccounts={injectedAccounts}
                handleClick={handleClick}
                value={value}
              />
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
                    localStorage.setItem('defaultIndex', '1')
                    setIndex("1");
                  }}
                >
                  switch
                </Text>
              </Flex>
            </Flex>
            <Textarea
              width="100%"
              maxWidth="320px"
              height="60px"
              minHeight="60px"
              background="#FFFFFF"
              borderRadius="5px"
              id="Gerald"
              name="Gerald"
              value={formik.values.Gerald}
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
          </Flex>


          {formik.errors.Gerald && formik.touched.Gerald ? (
            <div style={{ color: 'red' }}>{formik.errors.Gerald}</div>
          ) : null}
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
              placeholder={`Remaining amount ${free && moneyDelete(free.toString())}`}
              _placeholder={{
                color: '#999999',
                fontSize: '12px',
              }}
            />
            <InputRightAddon
              width="72px"
              height="40px"
              background="#F4F4F4"
              borderRadius="0px 5px 5px 0px"
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
              borderRadius="5px"
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
