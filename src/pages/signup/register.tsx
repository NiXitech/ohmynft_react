/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAccount, useDisconnect, useSignMessage } from "wagmi";
import { LStorage } from "../../api/services/cooike/storage";
import { CheckEmail, CheckName, getRegistrationSign, Register } from "../../api/services/http/api";
import { CallBackData } from "../../types/types";
import useStateHook from "../store";

const RegisterComp = (): JSX.Element => {
  const [state, actions] = useStateHook();
  const [checkName, setCheckName] = useState<any>(null)
  const [nameTip, setNameTip] = useState('')
  const [checkEmail, setCheckEmail] = useState<any>(null)
  const [emailTip, setEmailTip] = useState('')
  const [userInfo, setUserInfo] = useState({ name: '', email: '' })
  const { address } = useAccount()

  const checkNameFun = async (name: string) => {
    try {
      const result: CallBackData = await CheckName({ name }) as any
      if (result.data.valid) {
        setCheckName(true)
      } else {
        setCheckName(false)
        setNameTip(result.message || '')
      }
    } catch (error: any) {
      toast.error(error.message, {
        hideProgressBar: false,
      })
    }
  }

  const checkEmailFun = async (email: string) => {
    try {
      const result: CallBackData = await CheckEmail({ email }) as any
      if (result.data.valid) {
        setCheckEmail(true)
        setEmailTip('')
      } else {
        setCheckEmail(false)
        setEmailTip(result.message || '')
      }
    } catch (error: any) {
      console.log('%c🀀 error', 'color: #00e600; font-size: 20px;', error);

    }
  }

  /* Functions for email verification */
  const validateEmail = (email: string) => {
    // Email verification rules
    var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    return reg.test(email);
  }

  const submitRegisterInfo = async () => {
    console.log(address)
    try {
      const result: CallBackData = await Register({
        address: address,
        name: userInfo.name,
        email: userInfo.email,
        referral: ''
      }) as any
      if (result.code === 200) {
        // await signMessage({ message: `Hi ${userInfo.name}! We just need you to sign this message to confirm that you have access to this wallet.` })
        LStorage.set('LastAuthUser', {
          ...result.data,
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


  useEffect(() => {
  })
  return (
    <>
      <div className="w-full bg-black">
        <div className="min-h-screen flex flex-col">
          <main className="flex items-center justify-center py-10 grow">
            {
              state.isLogin
                ? <span></span>
                : <div className="px-15 py-8 pt-16 w-full max-w-lg rounded-2xl mx-3"
                  style={{
                    background: '#021222'
                  }}
                >
                  <h1 className="text-2xl uppercase tracking-widest mb-6 text-center font-Bold text-4xl">Welcome</h1>
                  <div className={['mt-3 relative pb-3', checkName === null ? "" : checkName ? 'input-success-active' : 'input-error-active'].join(' ')}>
                    <input
                      className="block relative w-full rounded-lg py-3 px-6 bg-white-1 outline-none focus:border-slate-200 focus:ring-0 autofill:bg-blue-500-15 transition-all appearance-none hover:appearance-none disabled:text-slate-100 font-heavy rounded-full border-none"
                      name="username"
                      id="username"
                      type="text"
                      step=""
                      placeholder="Name"
                      onBlur={(event) => {
                        setUserInfo({
                          ...userInfo,
                          name: event.target.value
                        })
                        if (event.target.value.length < 4) {
                          setNameTip('Username is too short')
                          setCheckName(false)
                        } else {
                          checkNameFun(event.target.value)
                        }
                      }}
                      onChange={(event) => {
                        setUserInfo({
                          ...userInfo,
                          name: event.target.value
                        })
                        if (event.target.value === '') {
                          setNameTip('Username is a required field')
                          setCheckName(false)
                        } else if (event.target.value.length < 4) {
                          setNameTip('Username is too short')
                          setCheckName(false)
                        } else {
                          setNameTip('')
                          setCheckName(null)
                        }
                      }}
                    />

                    <span className={["icon icon-right text-gold text-2xl top-2 right-2 absolute z-10 transition-all pointer-events-none duration-300 -translate-y-2 opacity-0 input-success:opacity-100 input-success:translate-y-0"].join(' ')}></span>
                    <span className="icon icon-error text-red-[C43434] font-thin px-4 text-sm top-4 right-3 absolute z-10 transition-all pointer-events-none duration-300 translate-y-2 opacity-0 input-error:opacity-100 input-error:translate-y-0"></span>
                    <p className="w-full inline-block text-red-[C43434] font-thin px-4 text-sm mt-1">{nameTip}</p>
                  </div>
                  <div className={['mt-3 relative pb-3', checkEmail === null ? "" : checkEmail ? 'input-success-active' : 'input-error-active'].join(' ')}>
                    <input
                      className="block relative w-full rounded-lg py-3 px-6 bg-white-1 outline-none focus:border-slate-200 focus:ring-0  transition-all appearance-none hover:appearance-none disabled:text-slate-100 font-heavy rounded-full border-none"
                      name="email"
                      id="email"
                      type="email"
                      step=""
                      placeholder="Email"
                      onChange={(event) => {
                        setUserInfo({
                          ...userInfo,
                          email: event.target.value
                        })
                        if (validateEmail(event.target.value)) {
                          setEmailTip('')
                          setCheckEmail(null)
                        } else {
                          setCheckEmail(false)
                          setEmailTip('Email must be a valid email')
                        }
                      }}
                      onBlur={(event) => {
                        setUserInfo({
                          ...userInfo,
                          email: event.target.value
                        })
                        if (validateEmail(event.target.value)) {
                          checkEmailFun(event.target.value)
                        } else {
                          if (event.target.value === '') {
                            setCheckEmail(false)
                            setEmailTip('Email is a required field!')
                          } else {
                            setCheckEmail(false)
                            setEmailTip('Email must be a valid email!')
                          }
                        }
                      }}
                    />
                    <span className=" icon icon-right text-gold text-2xl top-2 right-2 absolute z-10 transition-all pointer-events-none duration-300 -translate-y-2 opacity-0 input-success:opacity-100 input-success:translate-y-0"></span>
                    <span className="icon icon-error text-red-[C43434] font-thin px-4 text-sm top-4 right-3 absolute z-10 transition-all pointer-events-none duration-300 translate-y-2 opacity-0 input-error:opacity-100 input-error:translate-y-0"></span>
                    <p className="w-full inline-block text-red-[C43434] font-thin px-4 text-sm mt-1">{emailTip}</p>
                  </div>
                  <button
                    className="hover:cursor-pointer text-md py-6 px-8 text-white rounded-full tracking-widest uppercase transition-all relative disabled:opacity-40 block w-full mt-4"
                    disabled={checkName && checkEmail ? false : true}
                    onClick={() => {
                      submitRegisterInfo()
                    }}

                  >
                    <span className="transition-all font-Bold text-base text-white"> Next </span>
                    <div className="opacity-0 transition-all absolute flex justify-center align-middle left-0 top-0 w-full h-full overflow-hidden" role="status">
                      {/* <img className="inline-block spinner-border animate-spin-slowing" src={require('../../asstes/img/spinner-white.svg').default} alt="" width="30" height="30" /> */}
                    </div>
                  </button>
                </div>
            }
          </main>
        </div>
      </div>
    </>
  );
}

export default RegisterComp;