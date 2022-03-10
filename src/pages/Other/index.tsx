/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import {
  Image,
  Flex,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';
import Helmet from 'react-helmet';
import returnImg from "../../assets/images/return.png";
var QRCode = require('qrcode.react');

const Home = () => {
  const [time, setTime] = useState("");
  const [isLargerThan700] = useMediaQuery('(min-width: 700px)');
  function GetQueryString(name: string) {
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
    const r = decodeURI(window.location.search.substr(1)).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }
  const name = GetQueryString('name');
  const sex = GetQueryString('sex');
  const classes = GetQueryString('class');
  const data = [
    {
      key: '学生',
      value: name,
    },
    {
      key: '性别',
      value: sex,
    },
    {
      key: '班级',
      value: classes,
    },
  ];
  const add0 = (m: number) => (m < 10 ? `0${m}` : m);
  const format = () => {
    const times = new Date();
    const y = times.getFullYear();
    const m = times.getMonth() + 1;
    const d = times.getDate();
    const h = times.getHours();
    const mm = times.getMinutes();
    const s = times.getSeconds();
    setTime(`${y}-${add0(m)}-${add0(d)} ${add0(h)}:${add0(mm)}:${add0(s)}`);
  };
  useEffect(() => {
    setInterval(() => { format() });
  }, []);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>保定学院-学生工作服务平台</title>
      </Helmet>
      {isLargerThan700
        ? (
          <Text
            fontSize="32px"
            fontFamily="TTHoves-Bold, TTHove"
            fontWeight="bold"
            color="#000000"
            lineHeight="38px"
          >
            Oteher
          </Text>
        ) : (
          <Flex
            fontFamily="TTHoves-Bold, TTHove"
            color="#000000"
            minHeight="100Vh"
            background="#F1EFF4"
            flexDirection="column"
          >
            <Flex
              height="40px"
              fontSize="18px"
              background="#3B8DBC"
              justifyContent="space-between"
              alignItems="center"
              position="relative"
            >
              <Image
                ml="20px"
                w="auto"
                height="20px"
                src={returnImg}
              />
              <Flex
                position="absolute"
                color="#FFFFFF"
                w="100%"
                h="100%"
                justifyContent="center"
                alignItems="center"
              >
                请假码
              </Flex>
              <Flex
              >
              </Flex>
            </Flex>
            <Flex
              mt="5px"
              p="0 20px"
              background="#FFFFFF"
              justifyContent="center"
              flexDirection="column"
            >
              {data.map((item) => (
                <Flex
                  w="100%"
                  background="#FFFFFF"
                  borderBottom="1px solid #CED0CF"
                >
                  <Flex
                    w="100%"
                    alignItems="center"
                    height="40px"
                  >
                    <Flex
                      mr="25%"
                      alignItems="center"
                      height="40px"
                      fontSize="16px"
                    >
                      {item.key}
                    </Flex>
                    <Flex
                      alignItems="center"
                      height="40px"
                      fontSize="16px"
                    >
                      {item.value}
                    </Flex>
                  </Flex>
                </Flex>
              ))}
              <Flex
                mt="20px"
                height="180px"
                background="#FFFFFF"
                justifyContent="center"
                flexDirection="column"
              >
                <Flex
                  w="100%"
                  height="100%"
                  alignItems="flex-start"
                  justifyContent="space-between"
                  position="relative"
                >
                  <Flex
                    alignItems="center"
                    fontSize="16px"
                  >
                    请假码
                  </Flex>
                  <Flex
                    w="100%"
                    fontSize="16px"
                    position="absolute"
                    flexDirection="column"
                    alignItems="center"
                  >
                    <QRCode
                      value={name}
                      size={128}
                      bgColor={"#ffffff"}
                      fgColor={"#018905"}
                      level={"L"}
                      includeMargin={false}
                      renderAs={"svg"}
                    />
                    <Flex
                      mt="10px"
                      alignItems="center"
                      fontSize="12px"
                    >
                      {time}
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        )
      }
    </>
  );
};

export default Home;
