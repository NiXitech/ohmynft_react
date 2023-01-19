/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useAccount, useDisconnect, useSignMessage } from "wagmi";
import { LStorage } from "../../api/services/cooike/storage";
import { getRegistrationSign, getResendCode, verificationCode } from "../../api/services/http/api";
import Footer from "../../components/footer";
import { CallBackData } from "../../types/types";
import useStateHook from "../store";
import _ from 'lodash'

const pinLength = 6;
const KEYCODE = Object.freeze({
  LEFT_ARROW: 37,
  RIGHT_ARROW: 39,
  END: 35,
  HOME: 36,
  SPACE: 32,
  BACK_SPACE: 8
});

const Verification = (): JSX.Element => {
  const [state, actions] = useStateHook();
  const [tipMsg, setTipMsg] = useState('')
  const [userInfo, setUserInfo] = useState({ name: '', email: '' })
  const codeData = useRef<any>([0, 0, 0, 0, 0, 0, 0])
  const { address } = useAccount()
  const [loading, setLoading] = useState(false)

  const [value, setValue] = useState("");
  // 用来存放6个input的引用
  const inputsRef = useRef<any>([]);
  // 当前聚焦的input的下标
  const curFocusIndexRef = useRef(0);

  // 校验value是否有效，仅仅存在数字才有效
  const isInputValueValid = useCallback((value) => {
    return /^\d+$/.test(value);
  }, []);


  const { disconnect } = useDisconnect({
    onSuccess: () => {
      LStorage.delete('LastAuthUser')
      window.open('/', '_self')
    },
    onError: () => {
      LStorage.delete('LastAuthUser')
      window.open('/', '_self')
    }
  })

  const { signMessage, isSuccess, isLoading } = useSignMessage({
    onSuccess(data, variables) {
      setRegistrationSign(data, variables.message)
    },
    onError() {
      disconnect()
      actions.openConnect()
    }
  })

  const setRegistrationSign = async (data: any, msg: any) => {
    try {
      const result: CallBackData = await getRegistrationSign({
        verification_code: value,
        address: address,
        signature: data,
        message: msg
      }) as any
      if (result.code === 200) {
        LStorage.set('accessToken', result.data.accessToken)
        window.open('/', '_self')
      } else {
        window.location.reload();
      }
    } catch (error: any) {
      setTipMsg(error.message || '')
      setLoading(false)
    }
  }
  useEffect(() => {
    LStorage.get('LastAuthUser')
  })

  // 聚焦指定下标的input
  const focusInput = useCallback((i) => {
    const inputs = inputsRef.current;
    if (i >= inputs.length) return;
    const input = inputs[i];
    if (!input) return;
    input.focus();
    curFocusIndexRef.current = i;
  }, []);

  // 聚焦后一个input
  const focusNextInput = useCallback(() => {
    const curFoncusIndex = curFocusIndexRef.current;
    const nextIndex =
      curFoncusIndex + 1 >= pinLength ? pinLength - 1 : curFoncusIndex + 1;
    focusInput(nextIndex);
  }, [focusInput]);

  // 聚焦前一个input
  const focusPrevInput = useCallback(() => {
    const curFoncusIndex = curFocusIndexRef.current;
    let prevIndex;
    if (curFoncusIndex === pinLength - 1 && value.length === pinLength) {
      prevIndex = pinLength - 1;
    } else {
      prevIndex = curFoncusIndex - 1 <= 0 ? 0 : curFoncusIndex - 1;
    }
    focusInput(prevIndex);
  }, [focusInput, value]);

  // 处理删除按钮
  const handleOnDelete = useCallback(() => {
    const curIndex = curFocusIndexRef.current;
    if (curIndex === 0) {
      if (!value) return;
      setValue("");
    } else if (curIndex === pinLength - 1 && value.length === pinLength) {
      setValue(value.slice(0, curIndex));
    } else {
      setValue(value.slice(0, value.length - 1));
    }
    focusPrevInput();
  }, [focusPrevInput, value]);

  const handleOnKeyDown = useCallback(
    (e) => {
      switch (e.keyCode) {
        case KEYCODE.LEFT_ARROW:
        case KEYCODE.RIGHT_ARROW:
        case KEYCODE.HOME:
        case KEYCODE.END:
        case KEYCODE.SPACE:
          e.preventDefault();
          break;
        // 当点击删除按钮
        case KEYCODE.BACK_SPACE:
          handleOnDelete();
          break;
        default:
          break;
      }
    },
    [handleOnDelete]
  );

  // 点击input时，重新聚焦当前的input，弹出键盘
  const handleClick = useCallback(() => {
    focusInput(curFocusIndexRef.current);
  }, [focusInput]);

  const handleChange = useCallback(
    (e) => {
      const val = e.target.value || "";
      if (!isInputValueValid(val)) return;
      if (val.length === 1) {
        focusNextInput();
        setValue(`${value}${val}`);
      }
    },
    [focusNextInput, isInputValueValid, value]
  );

  const handlePaste = useCallback(
    (e) => {
      // 一定要清除默认行为
      e.preventDefault();
      const val = e.clipboardData.getData("text/plain").slice(0, pinLength);
      if (!isInputValueValid(val)) return;
      const len = val.length;
      const index = len === pinLength ? pinLength - 1 : len;
      // 如果之前存在输入，这里直接覆盖，也可以实现不覆盖的，也很简单
      setValue(val);
      focusInput(index);
    },
    [focusInput, isInputValueValid]
  );


  useEffect(() => {

    console.log('%c🀂 ', 'color: #aa00ff; font-size: 20px;', value.length);
    if (value.length === 6) {
      setLoading(true)
      // submitVerificationCode()
    }
  }, [value.length])


  const submitVerificationCode = async () => {
    setTipMsg('')
    const UserInfo = LStorage.get('LastAuthUser')
    try {
      const result: CallBackData = await verificationCode({
        address: address,
        verification_code: value
      }) as any

      if (result.code === 200) {
        await signMessage({ message: `Hi ${UserInfo.name}! We just need you to sign this message to confirm that you have access to this wallet.` })
      } else {
        setTipMsg(result.message || '')
      }
    } catch (error) {
      console.log('%c🀂 error', 'color: #e50000; font-size: 20px;', error);

    }
    setLoading(false)

  }



  const getResendCodeFun = async () => {
    const UserInfo = LStorage.get('LastAuthUser')
    setLoading(true)
    setTipMsg('')
    try {
      const result: CallBackData = await getResendCode({
        email: UserInfo.email
      }) as any
      if (result.code === 200) {
        setValue('')
      } else {
        toast.error(result.message)
      }
    } catch (error: any) {
      setTipMsg(error.message)
    }
    setLoading(false)
  }

  return (
    <>
      <div className="w-full relative bg-black">
        <div className="min-h-screen flex flex-col">
          <main className="flex items-center justify-center py-10 grow">
            <div className="px-2 sm:px-7 py-8 w-full max-w-md rounded-2xl mx-3 text-center"
              style={{
                background: '#021222'
              }}
            >
              <h1 className="text-2xl uppercase tracking-widest font-Bold">Verification code</h1>
              {/* <p className="text-white/60 mt-4 leading-tight font-medium">Please check your email for the verification code</p> */}
              <div className="w-full mt-3 inline-block">
                <div className="flex justify-between w-full relative mt-3 font-black text-white">
                  {Array.from({ length: pinLength }).map((_, index) => {
                    const focus = index === curFocusIndexRef.current;
                    return (
                      <input
                        key={index}
                        ref={(ref) => (inputsRef.current[index] = ref)}
                        className="code inline-block relative bg-white-1 rounded-lg outline-none focus:border-slate-200 focus:ring-0 autofill:bg-blue-500 transition-all text-center disabled:opacity-40 text-xl border-none w-12 h-12 text-sm font-normal font-Regular"
                        // maxLength={1}
                        size={1}
                        // placeholder="0"
                        autoComplete="off"
                        type="tel"
                        disabled={loading}
                        // type="number"
                        // pattern="\d*"
                        // autoComplete="false"
                        value={value[index] || ""}
                        onClick={handleClick}
                        onChange={handleChange}
                        onPaste={handlePaste}
                        onKeyDown={handleOnKeyDown}
                      />
                    );
                  })}
                  <div className={[" transition-all absolute flex justify-center align-middle left-0 top-0 w-full h-full", loading ? 'opacity-100 visible' : 'opacity-0 invisible'].join(' ')} role="status">
                    <img className="inline-block spinner-border animate-spin-slowing" src={require('../../asstes/img/spinner-white.svg').default} alt="" width="30" height="30" />
                  </div>
                </div>
              </div>
              <p className="w-full inline-block text-red text-sm mt-4">{tipMsg}</p>
              <button type="submit" className="w-full button-background rounded-full text-white mt-2 font-Regular text-sm tracking-widest p-2 inline-block transition-opacity hover:opacity-90 font-medium h-13" onClick={() => {
                submitVerificationCode()
              }}>CONFIRM</button>
              <button type="submit" className="bg-transparent mt-2 text-blue font-Regular text-sm tracking-widest p-2 inline-block transition-opacity hover:opacity-90 font-medium" onClick={() => {
                getResendCodeFun()
              }}>Send another code</button>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Verification;