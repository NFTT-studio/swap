/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
import { WsProvider, ApiPromise, Keyring } from '@polkadot/api';
import { Client } from 'rpc-websockets';
import { NODE_URL, SS58_FORMAT, TYPES } from '../constants';

interface PolkaSDKInitOptions {
  ss58Format: number
}

class PolkaSDK {
  private static __instance: PolkaSDK

  static __onInit: () => void

  isInitialized!: boolean

  wsProvider!: WsProvider

  ws!: Client;

  api!: ApiPromise

  keyring!: Keyring

  static async getSaveInstance() {
    if (!PolkaSDK.__instance || !PolkaSDK.__instance.isInitialized) {
      const tmp:PolkaSDK = new PolkaSDK();
      // PolkaSDK.__instance = new PolkaSDK();
      await tmp.init({
        ss58Format: SS58_FORMAT,
      });
      PolkaSDK.__instance = tmp;
    }
    return PolkaSDK.__instance;
  }

  // static getInstance() {
  //   if (!PolkaSDK.__instance) {
  //     PolkaSDK.__instance = new PolkaSDK();
  //   }
  //   return PolkaSDK.__instance;
  // }

  public async init(options: PolkaSDKInitOptions) {
    if (!PolkaSDK.__instance) {
      PolkaSDK.__instance = new PolkaSDK();
    }
    if (PolkaSDK.__onInit !== undefined) {
      PolkaSDK.__onInit();
    }

    await this.initWithOptions(options);
  }

  public onInit(callback: () => void) {
    PolkaSDK.__onInit = callback;
  }

  async initWithOptions(options: PolkaSDKInitOptions) {
    this.wsProvider = new WsProvider(NODE_URL);
    this.ws = new Client(NODE_URL);
    this.api = await ApiPromise.create({ provider: this.wsProvider, types: TYPES });
    this.keyring = new Keyring({ type: 'sr25519', ss58Format: options.ss58Format });
    this.isInitialized = true;
  }
}

export default PolkaSDK;
