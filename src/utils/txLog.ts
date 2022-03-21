/* eslint-disable @typescript-eslint/no-explicit-any */
import { createStandaloneToast, UseToastOptions } from '@chakra-ui/react';

const toastStandalone = createStandaloneToast();

export type toastStatus = 'success' | 'info' | 'warning' | 'error' | undefined;

export const toast = ({
  title = 'Tips',
  description = '',
  status = 'success',
  duration = 9000,
  isClosable = true,
  position = 'bottom-right',
}: UseToastOptions) => {
  toastStandalone({
    position,
    title,
    description,
    status,
    duration,
    isClosable,
  });
};
// eslint-disable-next-line max-len
export const txLog = (result: any, onSuccess = (res: any) => res) => {
  // toast({
  //   title: '',
  //   desc: t('Trx.broadcasting'),
  //   status: 'info',
  //   duration: 8000,
  // });
  // console.log(result.status, '=====');
  if (result.status.isInBlock) {
    toast({
      title: '',
      description: 'Trx.inblock',
      status: 'info',
      duration: 8000,
    });
    console.log(`Transaction included at blockHash ${result.status.asInBlock}`);
  } else if (result.status.isFinalized) {
    toast({
      title: '',
      description: 'Trx.finalize',
      status: 'success',
      duration: 8000,
    });
    onSuccess(result);
    console.log(`Transaction finalized at blockHash ${result.status.asFinalized}`);
  } else if (result.status.isBroadcast) {
    toast({
      title: '',
      description: 'Trx.broadcasting',
      status: 'info',
      duration: 10000,
    });
  } else if (result.status.isInvalid) {
    toast({
      title: 'error',
      description: 'Trx.failed',
      status: 'info',
      duration: 5000,
    });
  }
};
