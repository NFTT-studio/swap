import { ethers } from "ethers"

const provider = new ethers.providers.JsonRpcProvider("https://staging.nftmart.io/rpc/http");
const abi=[{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"freeBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"whoami","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"withdrawBalance","outputs":[],"stateMutability":"nonpayable","type":"function"}]


  const Alith = new ethers.Wallet(
    "0x5fb92d6e98884f76de468fa3f6278f8807c48bebc13595d45af5bdc4da702133",
    provider,
  );
  
  // 0x6Be02d1d3665660d22FF9624b7BE0551ee1Ac91b
  const Gerald = new ethers.Wallet(
    "0x99b3c12287537e38c90a9219d4cb074a89a16e9cdb20bf85728ebd97c343e342",
    provider,
  );
  
  const accounts = {
    Alith,
    Gerald,
  };
  
  function Eth(n: ethers.BigNumber) {
    return ethers.utils.formatEther(n) + " ETH";
  }
  
  function Wei(n: ethers.BigNumber) {
    return ethers.utils.formatUnits(n, "wei") + " WEI";
  }
  
  function Gas(n: ethers.BigNumber) {
    return ethers.utils.formatUnits(n, 0) + " Gas";
  }
  
  function Gwei(n: ethers.BigNumber) {
    return ethers.utils.formatUnits(n, "gwei") + " GWEI";
  }
  
  async function balanceOf(addr: string): Promise<ethers.BigNumber> {
    let balance = await provider.getBalance(addr);
    return balance;
  }
  
  async function sleep(n: number) {
    await new Promise((resolve) => {
      setTimeout(resolve, n);
    });
  }
  
  export { accounts, balanceOf, Eth, ethers, Gas, Gwei, provider, sleep, Wei,abi };