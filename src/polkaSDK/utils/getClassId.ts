/* eslint-disable @typescript-eslint/no-explicit-any */
export const getClassId = (c: any) => {
  let key = c[0];
  const len = key.length;
  key = key.buffer.slice(len - 4, len);
  return new Uint32Array(key)[0];
};
