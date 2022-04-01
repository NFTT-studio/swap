/* eslint-disable @typescript-eslint/no-explicit-any */
type SuccessCallback = (result: any) => void;
type ErrorCallback = (error: error) => void;

type Callback = {
  success: SuccessCallback,
  error: ErrorCallback
}
