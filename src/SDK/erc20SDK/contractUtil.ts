import { ethers } from "ethers"

const SWAP_ADDRESS ="0xb5d65ff6ee3a366adafac882b2737a37dc73b66a"
const NMT_ADDRESS ="0xd81b71cBb89B2800CDb000AA277Dc1491dc923C3"

class   ContractUtil{
    provider
    // contract
    constructor(connect:any) {
        this.provider = new ethers.providers.Web3Provider(connect,"any")
        // this.contract = new ethers.Contract(SWAP_ADDRESS,this.abi,this.provider);
    }

    isNMTAllowanceEnough=async (owner:any,amount:any)=>{
        const allowanceAbi = [
            "function allowance(address owner, address spender) external view returns (uint256)"
        ];
        const contract = new ethers.Contract(NMT_ADDRESS, allowanceAbi, this.provider);
        const allowance = await contract.allowance(owner,SWAP_ADDRESS);
        return parseInt(ethers.utils.formatEther( allowance)) >parseInt( amount);
    }

    isNMTBalanceEnough=async (owner:any,amount:any)=>{

        return (await this.NMTBalance(owner)) >= parseInt( amount);
    }

    NMTBalance=async (owner:any)=>{
        const balanceOfabi = [
            "function balanceOf(address) view returns (uint)"
        ];
        const contract = new ethers.Contract(NMT_ADDRESS, balanceOfabi, this.provider);
        const balance = await contract.balanceOf(owner);
        return parseInt(ethers.utils.formatEther( balance))
    }

    NMTapproveAll=async()=>{
        const approveAbi = [
            "function approve(address spender, uint256 amount) external returns (bool)"
        ];
        const contract = new ethers.Contract(NMT_ADDRESS, approveAbi, this.provider);
        const signer = this.provider.getSigner()
        let tx = await contract.connect(signer).approve(SWAP_ADDRESS, "10000000000000000000000000");
        return tx;
    }

    erc20toNative=async(nativeAddress:any,amount:any)=>{

        const swapAbi = [
            "function erc20toNative(string memory nativeAddress,uint256 amount) public returns (bool)"
        ];
        const contract = new ethers.Contract(SWAP_ADDRESS, swapAbi, this.provider);
        const signer = this.provider.getSigner();

        let tx = await contract.connect(signer).erc20toNative(nativeAddress,ethers.utils.parseUnits(amount).toString());
        return tx;
    }
}
export default ContractUtil;