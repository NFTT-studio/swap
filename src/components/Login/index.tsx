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
        maxWidth="470px"
        alignItems="center" justifyContent="center">
        <Flex
          width="100%"
          cursor="pointer"
          onClick={() => setOpening(true)}
        >
          <Input
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
