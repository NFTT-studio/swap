import { web3FromAddress } from '@polkadot/extension-dapp';

import { bnToBn } from '@polkadot/util';
import PolkaSDK from '..';
import { txLog } from '../../../utils/txLog';
import { unit } from '../utils/unit';
import { web3Enable, web3Accounts, web3FromSource } from '@polkadot/extension-dapp';

type substrateToEvmProps = {
  address: string,
  Gerald: string,
  amount: string,
  cb: Callback
}

export const substrateToEvm = async ({
  address,
  Gerald,
  amount,
  cb,
}: substrateToEvmProps) => {
  try {
    await web3Enable('NFTMart');
    await web3Accounts();
    const injector = await web3FromAddress(address);
    const price = bnToBn(amount);
    const call = (await PolkaSDK.getSaveInstance()).api.tx.deposit.depositBalance(Gerald, price);
    await call.signAndSend(
      address, { signer: injector.signer }, (result: any) => txLog(result, cb.success),
    );
  } catch (error:any) {
    cb.error(error);
  }
};
