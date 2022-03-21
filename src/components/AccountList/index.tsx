import React from 'react';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { Box, Text, Divider } from '@chakra-ui/react';

import { encodeAddress } from '@polkadot/util-crypto';
import SelectIcon from '../../assets/images/select_icon.png';

interface AccountProps {
  handleClick: (index: number) => Promise<void>;
  index: number;
  length: number;
  address: string;
  InjectedAccountList: InjectedAccountWithMeta[]
  setOpening: React.Dispatch<React.SetStateAction<boolean>>,
}

const Account = ({
  handleClick, index, length, address, InjectedAccountList,
  setOpening,
}: AccountProps) => {
  return (
    <>
      {InjectedAccountList && (
        <Box
          key={address}
          minHeight="80px"
          padding="20px"
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          onClick={() => {
            handleClick(index);
            setOpening(false);
          }}
          cursor="pointer"
        >
          <Box
            display="inline-block"
            w="80%"
          >
            <Text fontWeight="medium">{InjectedAccountList[index].meta.name}</Text>
            {address ? <Text color="#858999">{encodeAddress(address, 12191)}</Text> : null}
          </Box>
          <Box
            display="inline-flex"
            alignItems="center"
            height="20px"
            fontSize="14px"
            fontFamily="TTHoves-Medium, TTHoves"
            fontWeight="500"
            color="#000000"
          >
            <Box ml="20px" display="inline-block" as="img" src={SelectIcon} w="32px" h="32px" />
          </Box>
        </Box>
      )}
      {index !== length - 1 && <Divider />}
    </>
  );
};

interface AccountListProps {
  InjectedAccountList: InjectedAccountWithMeta[];
  handleClick: (index: number) => Promise<void>;
  setOpening: React.Dispatch<React.SetStateAction<boolean>>;
}

const AccountList: React.FC<AccountListProps> = ({ InjectedAccountList, handleClick, setOpening }) => (
  <>
    {InjectedAccountList.map((account, index) => (
      <Account
        key={account.address}
        handleClick={handleClick}
        address={account.address}
        index={index}
        length={InjectedAccountList.length}
        InjectedAccountList={InjectedAccountList}
        setOpening={setOpening}
      />
    ))}
  </>
);

export default AccountList;
