import React, { FC, useState, useRef } from 'react';
import {
  Button,
  Flex,
  AlertDialog,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Input,
  InputGroup,
  InputRightAddon,
  Textarea,
} from '@chakra-ui/react';
import AccountList from '../../components/AccountList';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';

type SortByProps = {
  handleClick: (index: number) => Promise<void>;
  injectedAccounts: InjectedAccountWithMeta[],
  value: string,
}

const SortBy: FC<SortByProps> = ({ injectedAccounts, handleClick, value }) => {
  const [opening, setOpening] = useState(false);
  const cancelRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Flex
        width="100%"
        maxWidth="320px"
        alignItems="center" justifyContent="center">
        {!value ?
          <Button
            background='#f50057'
            width="100%"
            height="60px"
            whiteSpace="normal"
            color="#FFFFFF"
            fontSize="18px"
            fontFamily="TTHoves-Medium, TTHoves"
            fontWeight="500"
            onClick={() => setOpening(true)}
            _hover={{
              background: '#c51162',
            }}
          >
            {`Please click to select your account`}
          </Button> : null
        }
        {value ?
          <Flex
            width="100%"
            maxWidth="320px"
            cursor="pointer"
            onClick={() => setOpening(true)}
          >
            <Textarea
              width="100%"
              height="60px"
              minHeight="60px"
              background="#FFFFFF"
              borderRadius="5px"
              id="address"
              name="address"
              value={value}
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
          </Flex>
          : null}
      </Flex>
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={() => setOpening(false)}
        isOpen={opening}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent
          width="100% !important"
          maxWidth="700px !important"
        >
          <AlertDialogHeader w="100%">Changes</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody w="100%">
            <AccountList
              InjectedAccountList={injectedAccounts}
              handleClick={handleClick}
              setOpening={setOpening}
            />
          </AlertDialogBody>

        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default SortBy;
