import { txLog } from '../../../utils/txLog';
import {
  accounts,
  ethers,
} from "../lib";

let { Gerald } = accounts;

const options = {
  gasLimit: 3000000,
  gasPrice: 10000,
};
const precompile = "0x0000000000000000000000000000000000000801";

type substrateToEvmProps = {
  receiver: string,
  amount: string,
  cb: Callback
}

export const withdrawBalance = async ({
  receiver,
  amount,
  cb,
}: substrateToEvmProps) => {
  try {
  const amountS = ethers.BigNumber.from(amount + "0".repeat(12));
  const abi=[{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"freeBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"whoami","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"withdrawBalance","outputs":[],"stateMutability":"nonpayable","type":"function"}]
  let icontract = new ethers.Contract(precompile, abi, Gerald);

  let tx = await icontract.withdrawBalance(receiver, amountS, options);

  console.log("transaction info:")
  console.table(tx);

  console.log("waiting...")
  let receipt = await tx.wait();

  console.log("transaction receipt:")
  console.table(receipt);
    // await web3Enable('NFTMart');
    // await web3Accounts();
    // const injector = await web3FromAddress(address);
    // const price = bnToBn(amount);
    // const call = (await PolkaSDK.getSaveInstance()).api.tx.deposit.depositBalance(Gerald, price);
    // await call.signAndSend(
    //   address, { signer: injector.signer }, (result: any) => txLog(result, cb.success),
    // );
  } catch (error:any) {
    cb.error(error);
  }
};
