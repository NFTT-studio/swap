/* eslint-disable @typescript-eslint/no-unused-vars */
import PolkaSDK from '..';

export const getBalance = async (address: string) => {
  const  balance:any  = await (await PolkaSDK.getSaveInstance()).api.query.system.account(address);
  return balance.toHuman()?.data;
};
