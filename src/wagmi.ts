import { Chain, configureChains, createClient } from "wagmi";

// import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

import { publicProvider } from "wagmi/providers/public";
import { bsc } from "wagmi/chains";

const BSCTest: Chain = {
  id: 97,
  name: "Binance Smart Chain Testnet",
  network: "bsc-testnet",
  nativeCurrency: {
    decimals: 18,
    name: "BNB",
    symbol: "tBNB",
  },
  rpcUrls: {
    default: { http: ["https://rpc.ankr.com/bsc_testnet_chapel"] },
  },
  blockExplorers: {
    etherscan: { name: "BscScan", url: "https://testnet.bscscan.com" },
    default: { name: "BscScan", url: "https://testnet.bscscan.com" },
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 17422483,
    },
  },
  testnet: true,
};

const { chains, provider, webSocketProvider } = configureChains(
  [bsc, BSCTest],
  [publicProvider()]
);

console.log(
  "%c🀄︎ chainschainschainschainschains",
  "color: #7f7700; font-size: 20px;",
  chains
);
export const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({
      chains,
    }),
    // new CoinbaseWalletConnector({
    //   chains,
    //   options: {
    //     appName: "Injected",
    //   },
    // }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: "Default Wallet",
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
});
