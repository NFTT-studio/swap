import { txLog } from '../../../utils/txLog';
import {
  ethers,
  abi,
  balanceOf,
} from "../lib";
  

const options = {
  gasLimit: 3000000,
  gasPrice: 10000,
};
const precompile = "0x0000000000000000000000000000000000000801";

type EthereumProviderEip1193 = {
  request: (args: {
    method: string
    params?: unknown[] | object
  }) => Promise<unknown>
}
type substrateToEvmProps = {
  isProvider: EthereumProviderEip1193| undefined,
  currentAccount: string,
}

export const getBalance = async ({
  isProvider,
  currentAccount,
}: substrateToEvmProps) => {
  try {
    if(isProvider){
    const balance = await balanceOf(currentAccount);
    return parseInt(ethers.utils.formatEther(balance))  
    }

    // await call.signAndSend(
    //   address, { signer: injector.signer }, (result: any) => txLog(result, cb.success),
    // );
  } catch (error:any) {
    console.log(error.toString())
  }
};
