/* eslint-disable @typescript-eslint/no-unused-expressions */
import Web3 from 'web3';
import * as ethers from 'ethers';
import QRCodeModal from "@walletconnect/qrcode-modal";
import WalletConnect from '@walletconnect/client';
import { apiGetAccountNonce, apiGetGasPrices } from '../helpers/api';
import { convertAmountToRawNumber, convertStringToHex } from '../helpers/bignumber';
import { sanitizeHex } from '../helpers/utilities';
import { isMobile } from './userAgent';
import { ABIData } from './abi';
import { toast } from 'react-toastify';

type networkChangeCallback = () => void;

type accountChangeCallback = () => void;

const bridge = "https://bridge.walletconnect.org";

export class NxWeb3 {
  private static _ins: NxWeb3;
  // @ts-ignore
  WalletConnector: WalletConnect;
  static get instance(): NxWeb3 {
    return this._ins || (this._ins = new NxWeb3());
  }

  // @ts-ignore
  web3: Web3;

  isInited: boolean = false;

  accountAddress: string = '';

  balance: number = 0;

  price: number = 0;

  // Wallet Type
  // 0 not connect
  // 1 MetaMask
  // 2 Wallet Connect
  connectType: number = 0;

  get ethBalance(): number {
    return this.dether(this.balance);
  }

  get address(): string {
    return this.accountAddress;
  }

  set address(address: string) {
    this.accountAddress = address;
  }

  // contract address
  contractAddress: string = '0x64b88f10faf1603b70fb7370A00C43369F329515'
  // 0x449ed490894e5411533c6ccf718531ae99629f30 For test
  // 0xC1Ae3FE5f93C2C042FAc7bDcdF94fDD673544e31

  contractAbi: object[] = ABIData;
  constructor() {
    console.log('init');
  }

  async takeConstructor(callback: networkChangeCallback, accountaccountCallbackback: accountChangeCallback) {
    this.isInited = await this.init();
    if (this.isInited) {
      await this.connect();
      this.connectType = 1;
      this.listenNetworkChange(accountaccountCallbackback);
      this.listenAccountChange(accountaccountCallbackback);
    }
  }

  async init(): Promise<boolean> {
    try {
      // @ts-ignore
      if (!ethereum || !ethereum.isMetaMask) {
        if (!isMobile()) {
          toast.warn('plase install MetaMask.');
        } else {
           toast.warn('Please copy and paste the link into the Browser section in Metamask APP.');
        }
        return false;
      }

      // @ts-ignore
      if (!window.web3) {
        if (!isMobile()) {
           toast.warn('MetaMask not installed in your browser.');
        } else {
           toast.warn('Please copy and paste the link into the Browser section in Metamask APP.');
        }
        return false;
      }

      // @ts-ignore
      this.web3 = new Web3(window.ethereum);
      // @ts-ignore
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      return true;
    } catch (error) {
      if (!isMobile()) {
         toast.warn('MetaMask not installed in your browser.');
      } else {
         toast.warn('Please copy and paste the link into the Browser section in Metamask APP.');
      }
      return false;
    }
  }

  async getChainId(): Promise<number> {
    const id: number = await this.web3.eth.getChainId();
    return id;
  }

  async connect() {
    try {
      // @ts-ignore
      const rst = await this.web3.eth.getAccounts();
      this.accountAddress = rst[0];

      // this.balance = parseFloat(await this.web3.eth.getBalance(this.accountAddress));
    } catch (error) {
      console.log(error);
    }
  }

  listenAccountChange(accountaccountCallbackback: accountChangeCallback) {
    if (this.isInited) {
      // @ts-ignore
      window.ethereum.on('accountsChanged', async (accounts) => {
        this.accountAddress = this.web3.utils.toChecksumAddress(accounts[0]);
        // this.balance = parseFloat(await this.web3.eth.getBalance(this.accountAddress));
        accountaccountCallbackback && accountaccountCallbackback()
      });
    }
  }

  listenNetworkChange(callback: networkChangeCallback) {
    if (this.isInited) {
      // @ts-ignore
      window.ethereum.on('chainChanged', async (_) => {
        const rst = await this.web3.eth.getAccounts();
        this.accountAddress = this.web3.utils.toChecksumAddress(rst[0]);

        // this.balance = parseFloat(await this.web3.eth.getBalance(this.accountAddress));
        callback && callback();
      });
    }
  }

  async getTotalSupply() {
    // @ts-ignore
    this.web3 = new Web3(window.ethereum);

    const factoryContract = new this.web3.eth.Contract(
      // @ts-ignore
      this.contractAbi,
      this.contractAddress,
    );
    const result = await factoryContract.methods
      .totalSupply()
      .call();

    return result;
  }

 

  async publicMint(raffleId: number, priceOrd: number, price: number, contractAddress:string,address:any) {
    console.log('%c🀀 priceOrd', 'color: #cc0036; font-size: 20px;', priceOrd, raffleId, price, contractAddress);
    // const chainId = await this.getChainId();
    // if (chainId !== 1) {
    //   return Error('Wrong Mainnet, change to Ethereum Mainnet.');
    // }

    try {
      const factoryContract = new this.web3.eth.Contract(
        // @ts-ignore
        this.contractAbi,
        contractAddress,
      );
      const data = await factoryContract.methods.buyEntry(raffleId, priceOrd, '0x0000000000000000000000000000000000000000',0).encodeABI();
      
        
      const _value = this.ether(price );
      const value = sanitizeHex(convertStringToHex(_value));
      
      const resultCallback = await this.web3.eth.sendTransaction({
        from: address,
        to: contractAddress,
        data: data,
        value: value
      })

      console.log('%c🀃 ', 'color: #ff6600; font-size: 20px;', resultCallback);
      return {
        type: true,
        data: resultCallback
      };
    } catch (error: any) {
      return {
        type: false,
        data: error
      };
    }
  }
  async rerund(token: number) {
    console.log('%c🀂 token', 'color: #7f7700; font-size: 20px;', token);
    try {
      const factoryContract = new this.web3.eth.Contract(
        // @ts-ignore
        this.contractAbi,
        this.contractAddress,
      );
      await factoryContract.methods
        .refund(token)
        .send({ from: this.accountAddress, value: this.ether(0) });
      return true;
    } catch (error) {
      return error;
    }
  }

  ether(eth: Number): number {
    return parseInt(this.web3.utils.toWei(eth.toString()), 10);
  }

  dether(eth: number): number {
    return parseFloat((eth / 1000000000000000000).toFixed(2));
  }

  async getToken() {
    const abi = new ethers.utils.AbiCoder();
    let pack = abi.encode(["string", "address", "address"], ["PG", "0x4b765ae7e9e7cf4150b6d35cc3e858c418f32489", this.accountAddress])
    const hash = ethers.utils.keccak256(pack);
    console.log(hash);
    let wallet_sign = new ethers.Wallet('0x260ea1f25531a6c62ff1f29353b91283e090a8d022dbc7d034c82113ef4f760a')
    const token = wallet_sign.signMessage(ethers.utils.arrayify(hash));
    console.log('%ctoken: ', 'color: MidnightBlue; background: Aquamarine; font-size: 18px;', token);
    return token;
  }

  async killWalletConnect() {
    let connector: WalletConnect | undefined = undefined;
    if (this.WalletConnector) {
      connector = this.WalletConnector;
    } else {
      connector = new WalletConnect({ bridge });
    }

    if (connector) {
      connector.killSession();
    }
  }

  async WalletBagConnect() {
    const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
    this.WalletConnector = connector;
    this.accountAddress = connector.accounts[0];
    // check if already connected
    if (!connector.connected) {
      // create new session
      await connector.createSession()
    }
    this.connectType = 2;
  }



  async walletPublicMint(count: number = 1, onSuccess: Function, onError?: Function) {
    if (!this.WalletConnector) {
      linkWalletConnect()
    }

    if (this.WalletConnector.chainId !== 1) {
      onError && onError('Wrong Mainnet, change to Ethereum Mainnet.');
      return;
    }

    // @ts-ignore
    this.web3 = new Web3(window.ethereum);

    const from = this.WalletConnector.accounts[0];

    const to = this.contractAddress

    const _value = this.ether(this.price * count);
    const value = sanitizeHex(convertStringToHex(_value));

    // @ts-ignore

    const factoryContract = new this.web3.eth.Contract(
      // @ts-ignore
      this.contractAbi,
      this.contractAddress,
    );
    const data = factoryContract.methods.publicMint(count).encodeABI();

    const tx = {
      from,
      to,
      value,
      data,
    }

    try {
      await this.WalletConnector.sendTransaction(tx);
      onSuccess && onSuccess()
    } catch (error: any) {
      onError && onError(error)
    }
  }

  async walletRefund(token: string, onSuccess: Function, onError?: Function) {
    if (!this.WalletConnector) {
      linkWalletConnect();
    }

    // @ts-ignore
    this.web3 = new Web3(window.ethereum);
    const from = this.WalletConnector.accounts[0];
    const to = this.contractAddress;
    const _value = this.ether(0);
    const value = sanitizeHex(convertStringToHex(_value));
    const factoryContract = new this.web3.eth.Contract(
      // @ts-ignore
      this.contractAbi,
      this.contractAddress,
    );
    const data = factoryContract.methods.refund(token).encodeABI();
    const tx = {
      from,
      to,
      value,
      data,
    }

    try {
      await this.WalletConnector.sendTransaction(tx);
      onSuccess && onSuccess();
    } catch (error) {
      onError && onError(error);
    }
  }

  async sendTransaction(count: number = 1, onSuccess?: Function, onError?: Function) {
    if (!this.WalletConnector) {
      linkWalletConnect()
    }

    const from = this.WalletConnector.accounts[0];

    const to = this.contractAddress

    const _nonce = await apiGetAccountNonce(this.WalletConnector.accounts[0], this.WalletConnector.chainId);
    const nonce = sanitizeHex(convertStringToHex(_nonce));

    const gasPrices = await apiGetGasPrices();
    const _gasPrice = gasPrices.slow.price;
    const gasPrice = sanitizeHex(convertStringToHex(convertAmountToRawNumber(_gasPrice, 9)));

    const _gasLimit = 21000;
    const gasLimit = sanitizeHex(convertStringToHex(_gasLimit));

    // const _value = 0.01;
    const _value = this.price * 1000000000000000000 * count;
    const value = sanitizeHex(convertStringToHex(_value));

    const data = '0x';

    const tx = {
      from,
      to,
      nonce,
      gasPrice,
      gasLimit,
      value,
      data,
    }
    try {
      await this.WalletConnector.sendTransaction(tx);
      onSuccess && onSuccess()
    } catch (error: any) {
      onError && onError(error)
    }
  }
}

export const linkWallet = async (accountaccountCallbackback: accountChangeCallback): Promise<boolean> => {
  await NxWeb3.instance.takeConstructor(() => { }, accountaccountCallbackback);


  if (!NxWeb3.instance.isInited) {
    return false;
  }

  return true;
}

export const isMianChain = async (): Promise<boolean> => {
  const chainId = await NxWeb3.instance.getChainId();
  if (chainId !== 4) {
    return false;
  }
  return true;
}

export const linkWalletConnect = async () => {
  await NxWeb3.instance.WalletBagConnect()
}
