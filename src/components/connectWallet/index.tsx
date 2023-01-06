/* eslint-disable @typescript-eslint/no-unused-vars */
import useStateHook from "../../pages/store";
import { useConnect, useNetwork, useSwitchNetwork } from 'wagmi'
import { NetworkSwitcher } from "./NetworkSwitcher";
import { Connect } from "./Connect";
const ConnectWallet = (): JSX.Element => {
  const [state, actions] = useStateHook();
  const { connect, isLoading, connectors, error, pendingConnector } =
    useConnect({

    })


  return (
    <>
      <div className="fixed z-40 inset-0 w-full h-screen flex bg-black/95 max-h-screen overflow-y-auto p-3 cursor-pointer" data-v-87288abb="">
        <div className="relative w-full shadow-2xl rounded-2xl m-auto animate-slide-down-fade-in04s cursor-auto max-w-md py-8 bg-slate-800 max-w-md" data-v-87288abb="">
          <button aria-label="close" className="absolute z-10 flex justify-center items-center top-4 right-3 w-8 h-8 bg-slate-600 rounded-full transition-all hover:bg-slate-500 animate-slide-down-fade-in07s" onClick={() => { actions.openConnect() }}>
            <span className="icon-ico-x text-xs"></span>
          </button>
          <div className="bg-slate-800 px-4 md:px-7 pt-4 w-full">
            <article className="animate-fade-in">
              <div className="text-center block">
                <h1 className="text-3xl uppercase tracking-widest text-center animate-slide-down-fade-in01s">Connect</h1>
                <div className="text-slate-100 mt-4 mb-5 leading-tight animate-slide-down-fade-in04s text-center">
                  <p>Choose a wallet connection method.</p>
                </div>
                <Connect></Connect>
              </div>
            </article>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConnectWallet;