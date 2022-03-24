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
import { getBalance } from '../polkaSDK/api/getBalance';
import { substrateToEvm } from '../polkaSDK/api/substrateToEvm';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { web3Accounts, web3Enable, web3FromSource } from '@polkadot/extension-dapp';
import { encodeAddress } from '@polkadot/util-crypto';
import Login from '../../components/Login';
import { parseMoneyText } from '../../utils/fomart';


const Home = () => {
  const toast = useToast();
  const [injected, setInjected] = useState(false);
  const [free, setFres] = useState("");
  const [value, setValue] = useState("");
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
          <Flex mb="30px" h="21px" alignItems="center" justifyContent="center">
            <Text
              fontSize="1.5rem"
            >
              NMT Substrate to Evm
            </Text>
          </Flex>
          {!injected ?
            <Flex mb="34px" alignItems="center" justifyContent="center">
              <Link
                textDecoration="none"
                target="blank"
                href="https://docs.google.com/forms/d/1WCNeiufW1XxLsyme7dJUys7y7t-XJRyp1nQR0bhnvVQ"
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
                  {`Please click and install Polkadot {.js}`}
                  <br />
                  {`https://polkadot.js.org/extension/ `}
                </Button>
              </Link>
            </Flex>
            : null}
          {injected && injectedAccounts.length === 0 ?
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
              id="Gerald"
              name="Gerald"
              value={formik.values.Gerald}
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
          {formik.errors.Gerald && formik.touched.Gerald ? (
            <div style={{ color: 'red' }}>{formik.errors.Gerald}</div>
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
              placeholder={`Remaining amount ${free}`}
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
