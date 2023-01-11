/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { useAccount, useConnect, useDisconnect, useNetwork, useSignMessage, useSwitchNetwork } from 'wagmi'
import useStateHook from '../../pages/store';
import _ from 'lodash'
import { LStorage } from '../../api/services/cooike/storage';
import { getRegistration, getRegistrationSign, getResendCode, getUserLogin, Register } from '../../api/services/http/api';
import { CallBackData, RegistrationCallBack } from '../../types/types';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';



export function Connect() {
  const [state, actions] = useStateHook();
  const { connector, isConnected, address } = useAccount()
  const [uploading, setUpLoading] = useState(false)
  const location = useLocation()
  const { signMessage, isSuccess } = useSignMessage({
    onSuccess(data, variables) {
      getRegisterSignFun(data, variables)
    },
    onError() {
      disconnect()
      actions.openConnect()
    }
  })
  const { connect, isLoading, connectors, error, pendingConnector } =
    useConnect({
      chainId: 97,
      onSuccess: async (data) => {
        getRegistrationFun(data.account)
      },
      onError: () => {
        setUpLoading(false)
      }
    })

  const getRegisterSignFun = async (data: any, variables: { message: any; }) => {
    try {
      const result: CallBackData = await getUserLogin({
        address: address,
        signature: data,
        message: variables.message
      }) as any
      if (result.code === 200) {
        LStorage.set('accessToken', result.data.accessToken)
      } else {
        disconnect()
        actions.openConnect()
      }
      if (location.pathname === '/signup/register' || location.pathname === '/signup/verification') {
        window.open('/', '_self')
      } else {
        window.open(location.pathname, '_self')
      }

    } catch (error: any) {
      toast.error(error.message, {
        hideProgressBar: false,
      })
    }
  }
  const { disconnect } = useDisconnect({
    onSuccess: () => {
      LStorage.delete('LastAuthUser')
    },
    onError: () => {
      LStorage.delete('LastAuthUser')
    }
  })


  const getResendCodeFun = async (email: string) => {
    try {
      const result: CallBackData = await getResendCode({
        email: email
      }) as any
      // if (result.code === 200) {
      window.open('/signup/verification', '_self')
      // } else {
      //   setUpLoading(false)
      //   toast.error(result.message)
      // }
    } catch (error: any) {
      setUpLoading(false)
      toast.error(error.message, {
        hideProgressBar: false,
      })
    }
  }

  const getRegistrationFun = async (addre: any) => {
    try {
      const result: RegistrationCallBack = await getRegistration(addre) as any
      if (result.code === 200) {
        if (result.data.registered) {
          LStorage.set('LastAuthUser', {
            name: result.data.name,
            email: result.data.email,
            address: addre,
          })
          await signMessage({ message: `Hi ${result.data.name}! We just need you to sign this message to confirm that you have access to this wallet.` })
        } else {
          LStorage.set('LastAuthUser', {
            name: result.data.name,
            email: result.data.email,
            address: addre
          })
          await getResendCodeFun(result.data.email || '')
        }
      } else {

        window.open('/signup/register', '_self')
      }

    } catch (error: any) {
      toast.error(error.message, {
        hideProgressBar: false,
      })
      setUpLoading(false)
    }
  }

  const submitRegisterInfo = async (name: string, email: string) => {
    try {
      const result: CallBackData = await Register({
        address: address,
        name: name,
        email: email,
        referral: ''
      }) as any
      if (result.code === 200) {
        LStorage.set('LastAuthUser', {
          name: result.data.name,
          email: result.data.email,
          address: address
        })
        window.open('/signup/verification', '_self')
      } else {
        toast.error(result.message)
      }
    } catch (error: any) {
      toast.error(error.message, {
        hideProgressBar: false,
      })
    }
  }

  const { chain } = useNetwork()
  const { chains, pendingChainId, switchNetwork } =
    useSwitchNetwork()

  const connectWallect = async (x: any) => {
    if (chain?.id !== 5) {
      switchNetwork?.(5)
    }
    setUpLoading(true)
    connect({
      connector: x,
    })
  }
  return (
    <>
      {error && <h2 className="w-full inline-block text-red text-md mb-6">{error.message}</h2>}
      <div className="text-lg animate-slide-down-fade-in04s">
        {isConnected && (
          <button
            key={connector?.id}
            onClick={async () => {
              setUpLoading(true)
              if (isConnected) {
                getRegistrationFun(address)
              } else {
                connect({
                  connector: connector,
                })
              }

            }} className="text-md py-4 px-8 bg-blue-400 text-white rounded-full tracking-widest uppercase hover:bg-blue-500 transition-all focus:bg-blue-500 relative disabled:opacity-40 disabled:hover:bg-blue-500 w-full rounded-none first:rounded-t-3xl last:rounded-b-3xl normal-case bg-slate-500/50 hover:bg-slate-500/75 disabled:hover:bg-slate-500/50 focus:bg-slate-500/75 active:bg-slate-500/75 py-5 border-b-slate-100/25 border-b last:border-b-0" disabled={uploading}>
            <span className={['transition-all', uploading ? 'opacity-0' : ''].join(' ')}>
              <span>{connector?.name}</span>
              <div className="flex items-center justify-center ml-1 w-9 h-9 absolute top-1/2 -mt-[18px] left-4">
                {/* <img src={require('../../asstes/img/metamask.svg').default} alt="" width="32" height="32" className="inline-block relative top-[1px]" /> */}
                {
                  connector?.name.toLowerCase() === "metamask"
                    ? <img src={require('../../asstes/img/metamask.svg').default} alt="" width="32" height="32" className="inline-block relative top-[1px]" />
                    : connector?.name.toLowerCase() === "coinbasewallet"
                      ? <img src={require('../../asstes/img/coinbase.png').default} alt="" width="32" height="32" className="inline-block relative top-[1px]" />
                      : connector?.name.toLocaleLowerCase() === "walletconnect"
                        ? < img src={require('../../asstes/img/walletconnect.svg').default} alt="" width="32" height="32" className="inline-block relative top-[1px]" />
                        : connector?.name.toLocaleLowerCase() === 'trust wallet'
                          ? < img src={require('../../asstes/img/trustwallet.svg').default} alt="" width="32" height="32" className="inline-block relative top-[1px]" />
                          : < img src={require('../../asstes/img/wallet.png').default} alt="" width="32" height="32" className="inline-block relative top-[1px]" />
                }
              </div>
            </span>
            <div className={["transition-all absolute flex justify-center align-middle left-0 top-0 w-full h-full pointer-events-none overflow-hidden", uploading ? '' : 'opacity-0'].join(' ')} role="status">
              <img className="inline-block spinner-border animate-spin-slowing" src={require('../../asstes/img/spinner-white.svg').default} alt="" width="30" height="30" />
            </div>
          </button>
        )}
        {connectors
          .filter((x) => x.id !== connector?.id)
          .map((x) => (
            <>
              <button
                key={x.id}
                onClick={() => {
                  if (x.ready) {
                    connectWallect(x)
                  } else {
                    window.open('https://metamask.app.link/dapp/ohmynft.space/')
                  }
                }}
                className="text-md py-4 px-8 bg-blue-400 text-white rounded-full tracking-widest uppercase hover:bg-blue-500 transition-all focus:bg-blue-500 relative disabled:opacity-40 disabled:hover:bg-blue-500 w-full rounded-none first:rounded-t-3xl last:rounded-b-3xl normal-case bg-slate-500/50 hover:bg-slate-500/75 disabled:hover:bg-slate-500/50 focus:bg-slate-500/75 active:bg-slate-500/75 py-5 border-b-slate-100/25 border-b last:border-b-0"
                // disabled={uploading ? true : false}
                disabled={!x.ready ? true : uploading ? true : false}
              >
                <span className={['transition-all', uploading && x.id === pendingConnector?.id ? 'opacity-0' : ''].join(' ')}>
                  <span>{x.name}</span>

                  <div className="flex items-center justify-center ml-1 w-9 h-9 absolute top-1/2 -mt-[18px] left-4">
                    {
                      x.name.toLowerCase() === "metamask"
                        ? <img src={require('../../asstes/img/metamask.svg').default} alt="" width="32" height="32" className="inline-block relative top-[1px]" />
                        : x.name.toLowerCase() === "coinbasewallet"
                          ? <img src={require('../../asstes/img/coinbase.png').default} alt="" width="32" height="32" className="inline-block relative top-[1px]" />
                          : x.name.toLocaleLowerCase() === "walletconnect"
                            ? < img src={require('../../asstes/img/walletconnect.svg').default} alt="" width="32" height="32" className="inline-block relative top-[1px]" />
                            : x.name.toLocaleLowerCase() === 'trust wallet'
                              ? < img src={require('../../asstes/img/trustwallet.svg').default} alt="" width="32" height="32" className="inline-block relative top-[1px]" />
                              : < img src={require('../../asstes/img/wallet.png').default} alt="" width="32" height="32" className="inline-block relative top-[1px]" />
                    }
                  </div>
                </span>
                <div className={["transition-all absolute flex justify-center align-middle left-0 top-0 w-full h-full pointer-events-none overflow-hidden", uploading && x.id === pendingConnector?.id ? '' : 'opacity-0'].join(' ')} role="status">
                  <img className="inline-block spinner-border animate-spin-slowing" src={require('../../asstes/img/spinner-white.svg').default} alt="" width="30" height="30" />
                </div>
              </button>
            </>

          ))}
      </div>

    </>
  )
}
