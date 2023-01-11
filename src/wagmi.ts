import { configureChains, createClient } from "wagmi";

// import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

import { publicProvider } from "wagmi/providers/public";
import { bsc, bscTestnet } from "wagmi/chains";

const { chains, provider, webSocketProvider } = configureChains(
  [bsc, bscTestnet],
  [publicProvider()]
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
