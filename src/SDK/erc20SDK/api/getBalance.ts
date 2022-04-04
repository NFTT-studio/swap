import ContractUtil from "../contractUtil";

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
      const contractUtil = new ContractUtil(isProvider);
      const nmtBalance = await contractUtil.NMTBalance(currentAccount)
      return nmtBalance;
    }
  } catch (error:any) {
    console.log(error)
  }
};
