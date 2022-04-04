/* eslint-disable @typescript-eslint/no-explicit-any */
import { mapNFTToAsset } from './mapNFTToAsset';

export const mapNFTsToAsset = (NFTS: any[], cid: number) => {
  let arr = NFTS.map((n) => mapNFTToAsset(n, cid, n.tokenId));

  arr = arr.filter((nft) => nft);

  return arr;
};
