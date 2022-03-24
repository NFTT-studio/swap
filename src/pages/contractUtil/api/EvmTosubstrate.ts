import { txLog } from '../../../utils/txLog';
import {
  ethers,
} from "../lib";
import {u8aToHex} from '@polkadot/util';
import { decodeAddress } from '@polkadot/util-crypto';

  

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
  receiver: string,
  amount: string,
  cb: Callback
}

export const withdrawBalance = async ({
  isProvider,
  receiver,
  amount,
  cb,
}: substrateToEvmProps) => {
  try {
    if(isProvider){
      const provider =await new ethers.providers.Web3Provider(isProvider);
      const signer = provider.getSigner();

      const address=u8aToHex(decodeAddress(receiver))
      const amountS = ethers.BigNumber.from(amount + "0".repeat(12));
      const abi=[{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"freeBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"whoami","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"withdrawBalance","outputs":[],"stateMutability":"nonpayable","type":"function"}]
      const precompile = "0x0000000000000000000000000000000000000801";
      let icontract = new ethers.Contract(precompile, abi, provider);
  
      let tx = await icontract.connect(signer).withdrawBalance(address, amountS, options)
  
      console.log("transaction info:")
      console.table(tx);
  
      console.log("waiting...")
      let receipt = await tx.wait();
  
      console.log("transaction receipt:")
      console.table(receipt);
      localStorage.setItem('evmHash', tx.hash)
      cb.success(tx.hash);
    }

    // await call.signAndSend(
    //   address, { signer: injector.signer }, (result: any) => txLog(result, cb.success),
    // );
  } catch (error:any) {
    cb.error(error);
  }
};
