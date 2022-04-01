import {
  ethers,
  balanceOf,
} from "../common";
  

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

  } catch (error:any) {
    console.log(error.toString())
  }
};
