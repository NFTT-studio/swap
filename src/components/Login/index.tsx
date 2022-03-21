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
      <Flex alignItems="center" justifyContent="center">
        {!value ?
          <Button
            background='#f50057'
            width="100%"
            whiteSpace="normal"
            height="66px"
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
            <InputRightAddon
              p="0 15px"
              cursor="pointer"
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
              children="Switch"
              onClick={() => setOpening(true)}
            />
          </InputGroup> : null}
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
