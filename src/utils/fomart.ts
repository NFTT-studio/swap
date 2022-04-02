/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable import/prefer-default-export */
import BigNumber from 'bignumber.js';
type NumberValue = string | number;
export const toBigNumber = (n: NumberValue) => new BigNumber(String(n));

const baseOptions = [
  { power: 0, text: 'TEST', value: '-' },
  { power: 3, text: 'Kilo', value: 'k' },
  { power: 6, text: 'Mill', value: 'M' },
  { power: 9, text: 'Bill', value: 'B' },
  { power: 12, text: 'Tril', value: 'T' },
  { power: 15, text: 'Peta', value: 'P' },
  { power: 18, text: 'Exa', value: 'E' },
  { power: 21, text: 'Zeta', value: 'Z' },
  { power: 24, text: 'Yotta', value: 'Y' },
];

export const parseMoneyText = (text: string) => {
  const cutUnit = text.substring(0, text.length - 3);

  const baseOption = baseOptions.find((option) => cutUnit.includes(option.value)) || baseOptions[0];

  const [moneyText, unit] = text.replace(baseOption.value, '').split(' ');
  const normalizedMoney = toBigNumber(moneyText).times(10 ** baseOption.power);
  return { value: normalizedMoney, unit };
};
export  function moneyDelete(num:string){
  if(num&&num!=undefined&&num!=null){
    let _num = num;
    _num = _num.toString();
    _num = _num.replace(/,/gi,'');
    return (Number(_num)/1000000000000).toFixed(0)
  }else{
    
     return (Number(num)/1000000000000).toFixed(0)
  }
}
