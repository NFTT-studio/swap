import ContractUtil from "../contractUtil";
import {u8aToHex} from '@polkadot/util';
import { decodeAddress } from '@polkadot/util-crypto';

type EthereumProviderEip1193 = {
  request: (args: {
    method: string
    params?: unknown[] | object
  }) => Promise<unknown>
}
type substrateToEvmProps = {
  isProvider: EthereumProviderEip1193| undefined,
  receiver: string,
  amount: string,
  cb: Callback
}

export const erc20toNative = async ({
  isProvider,
  receiver,
  amount,
  cb,
}: substrateToEvmProps) => {
  try {
    if(isProvider){
      const contractUtil = new ContractUtil(isProvider);
      const address=u8aToHex(decodeAddress(receiver))
      
      var swapTx =  await contractUtil.erc20toNative(receiver,amount);
      console.log(swapTx);
      // localStorage.setItem('erc20Hash', swapTx)
      // cb.success(swapTx);
    }
  } catch (error:any) {
    cb.error(error.error);
  }
};
