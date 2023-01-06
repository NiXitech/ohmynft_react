/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAccount, useDisconnect, useSignMessage } from "wagmi";
import { LStorage } from "../../api/services/cooike/storage";
import { CheckEmail, CheckName, getRegistrationSign, Register } from "../../api/services/http/api";
import Footer from "../../components/footer";
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
    try {
      const result: CallBackData = await Register({
        address: address,
        name: userInfo.name,
        email: userInfo.email
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
      <div className="w-full">
        <div className="min-h-screen flex flex-col">
          {/* <header className="text-center pt-10">
            <a href="/" className=""><img src={require('../../asstes/img/logo.png').default} alt="WinBig logo" width="166" height="24" className="inline-block" /></a>
          </header> */}

          <main className="flex items-center justify-center py-10 grow">
            {
              state.isLogin
                ? <span></span>
                : <div className="px-15 py-8 pt-20 w-full max-w-lg rounded-2xl mx-3"
                  style={{
                    border: '6px solid rgba(43,147,255,.43)',
                    background: 'rgba(37,62,89,.61)'
                  }}
                >
                  <header className="text-center mb-8"
                    style={{
                      marginTop: '-7rem',
                    }}
                  >
                    <a href="/" className=""><img src={require('../../asstes/img/logo.png').default} alt="WinBig logo" width="166" height="24" className="inline-block" /></a>
                  </header>
                  <h1 className="text-2xl uppercase tracking-widest mb-6 text-center font-play">Welcome</h1>
                  <div className={['mt-3 relative pb-3', checkName === null ? "" : checkName ? 'input-success-active' : 'input-error-active'].join(' ')}>
                    <input
                      className="block relative w-full bg-blue-500-15 border-gary rounded-lg py-3 px-4 border-1 outline-none focus:border-slate-200 focus:ring-0 autofill:bg-blue-500-15 transition-all appearance-none hover:appearance-none disabled:text-slate-100 font-heavy"
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

                    <span className={["icon2-ico-success text-gold text-2xl top-2 right-2 absolute z-10 transition-all pointer-events-none duration-300 -translate-y-2 opacity-0 input-success:opacity-100 input-success:translate-y-0"].join(' ')}></span>
                    <span className="icon2-ico-error text-red text-sm top-4 right-3 absolute z-10 transition-all pointer-events-none duration-300 translate-y-2 opacity-0 input-error:opacity-100 input-error:translate-y-0"></span>
                    <p className="w-full inline-block text-red text-sm mt-1">{nameTip}</p>
                  </div>
                  <div className={['mt-3 relative pb-3', checkEmail === null ? "" : checkEmail ? 'input-success-active' : 'input-error-active'].join(' ')}>
                    <input
                      className="block relative w-full bg-blue-500-15 border-gary rounded-lg py-3 px-4 border-1 outline-none focus:border-slate-200 focus:ring-0 autofill:bg-blue-500-15 transition-all appearance-none hover:appearance-none disabled:text-slate-100 font-heavy"
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
                    <span className="icon2-ico-success text-gold text-2xl top-2 right-2 absolute z-10 transition-all pointer-events-none duration-300 -translate-y-2 opacity-0 input-success:opacity-100 input-success:translate-y-0"></span>
                    <span className="icon2-ico-error text-red text-sm top-4 right-3 absolute z-10 transition-all pointer-events-none duration-300 translate-y-2 opacity-0 input-error:opacity-100 input-error:translate-y-0"></span>
                    <p className="w-full inline-block text-red text-sm mt-1">{emailTip}</p>
                  </div>
                  <button
                    className="text-md py-4 px-8 bg-register-btn-31 border-6 border-cyan-500 text-white rounded-full tracking-widest uppercase transition-all relative disabled:opacity-40 block w-full mt-4"
                    disabled={checkName && checkEmail ? false : true}
                    onClick={() => {
                      submitRegisterInfo()
                    }}

                  >
                    <span className="transition-all font-play"> Complete Registration </span>
                    <div className="opacity-0 transition-all absolute flex justify-center align-middle left-0 top-0 w-full h-full pointer-events-none overflow-hidden" role="status">
                      <img className="inline-block spinner-border animate-spin-slowing" src={require('../../asstes/img/spinner-white.svg').default} alt="" width="30" height="30" />
                    </div>
                  </button>
                  <p className="text-white/60 text-center text-base mt-5 leading-tight font-medium">By creating your account, you confirm that you are at least 18 years old</p>
                </div>
            }

          </main>
          <Footer></Footer>
        </div>
      </div>
    </>
  );
}

export default RegisterComp;