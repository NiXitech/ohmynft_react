import { useState } from "react";
import { getRegisterUserInfo } from "../../api/services/http/api";
import { CallBackData } from "../../types/types";
import './index.scss'

const UserInfo = (): JSX.Element => {
  const [verify, setVerify] = useState(false)
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState<any>('')
  const [password, setPassword] = useState<any>('')
  const [nameTip, setNameTip] = useState('')
  const [passwprdTip, setPasswordTip] = useState('')

  const [userInfoList, setUserInfoList] = useState([])







  const getRegisterUserInfoFun = async () => {
    setLoading(true)
    try {
      const result: CallBackData = await getRegisterUserInfo({
        username: name,
        password: password
      }) as any
      console.log('%c🀅 result', 'color: #e50000; font-size: 20px;', result);
      setUserInfoList(result.data)
      setVerify(true)
    } catch (error) {
      console.log('%c🀁 error', 'color: #733d00; font-size: 20px;', error);
      setNameTip('please check username!')
      setPasswordTip('please check password!')

    }
    setLoading(false)
  }
  return (
    <>
      {
        verify
          ? <main className="flex flex-wrap grow px-2 pb-10 lg:px-8 transition-all duration-300 page-enter:opacity-0 page-enter:-translate-y-4 layout-enter:opacity-0 layout-enter:-translate-y-4 pt-16">
            <div className="w-full mx-auto 5xl:container lg:screnHeight lg:screnHeight-10 mt-4">
              <section className="animate-fade-in lg:overflow-y-auto overflow-y-auto overflow-x-hidden lg:overflow-x-hidde relative min-h-[50vh] hideScrollbar"
                style={{
                  height: '100%',
                  width: '100%',
                }}
              >
                <div className="overflow-x-auto lg:overflow-x-visible pb-0">
                  <table className="text-left text-sm md:text-base whitespace-nowrap w-full table mb-4 animate-fade-in mytable">
                    <thead>
                      <th>Ord</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Address</th>
                      <th>Registered</th>
                      <th>CreatTime</th>
                      <th>UpDatedTime</th>
                    </thead>
                    <tbody>
                      {

                        userInfoList.length > 0
                          ? <>
                            {
                              userInfoList.map((item: any, index) => {
                                return <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>{item.display_name}</td>
                                  <td>{item.email}</td>
                                  <td>{item.ethereum_address}</td>
                                  <td>{item.registered}</td>
                                  <td>{item.created_at}</td>
                                  <td>{item.updated_at}</td>
                                </tr>
                              })
                            }
                          </>
                          : <div className="text-center w-full py-4">
                            <h2 className="text-center w-full px-3 lg:text-xl py-3 text-white animate-fade-in font-heavy">
                              <span>Nothing to display</span>
                            </h2>
                          </div>
                      }
                    </tbody>
                    <tfoot></tfoot>


                  </table>
                </div>



              </section>
            </div>
          </main>
          : <>
            <div className="w-full">
              <div className="min-h-screen flex flex-col">

                <main className="flex items-center justify-center py-10 grow">

                  <div className="px-15 py-8 pt-20 w-full max-w-lg rounded-2xl mx-3"
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
                      <a href="/" className=""><img src={require('../../asstes/img/logo.png').default} alt="ohmynft logo" width="166" height="24" className="inline-block" /></a>
                    </header>
                    <div className={['mt-3 relative pb-3'].join(' ')}>
                      <input
                        className="block relative w-full bg-blue-500-15 border-gary rounded-lg py-3 px-4 border-1 outline-none focus:border-slate-200 focus:ring-0 autofill:bg-blue-500-15 transition-all appearance-none hover:appearance-none disabled:text-slate-100 font-heavy"
                        name="username"
                        id="username"
                        type="text"
                        step=""
                        placeholder="username"
                        value={name}
                        onChange={(event) => {
                          setNameTip('')
                          setName(event.target.value)
                        }}
                      />

                      <span className={["icon2-ico-success text-gold text-2xl top-2 right-2 absolute z-10 transition-all pointer-events-none duration-300 -translate-y-2 opacity-0 input-success:opacity-100 input-success:translate-y-0"].join(' ')}></span>
                      <span className="icon2-ico-error text-red text-sm top-4 right-3 absolute z-10 transition-all pointer-events-none duration-300 translate-y-2 opacity-0 input-error:opacity-100 input-error:translate-y-0"></span>
                      <p className="w-full inline-block text-red text-sm mt-1">{nameTip}</p>
                    </div>
                    <div className={['mt-3 relative pb-3'].join(' ')}>
                      <input
                        className="block relative w-full bg-blue-500-15 border-gary rounded-lg py-3 px-4 border-1 outline-none focus:border-slate-200 focus:ring-0 autofill:bg-blue-500-15 transition-all appearance-none hover:appearance-none disabled:text-slate-100 font-heavy"
                        name="email"
                        id="email"
                        type="password"
                        step=""
                        placeholder="password"
                        value={password}
                        onChange={(event) => {
                          setPasswordTip('')
                          setPassword(event.target.value)
                        }}
                      />
                      <span className="icon2-ico-success text-gold text-2xl top-2 right-2 absolute z-10 transition-all pointer-events-none duration-300 -translate-y-2 opacity-0 input-success:opacity-100 input-success:translate-y-0"></span>
                      <span className="icon2-ico-error text-red text-sm top-4 right-3 absolute z-10 transition-all pointer-events-none duration-300 translate-y-2 opacity-0 input-error:opacity-100 input-error:translate-y-0"></span>
                      <p className="w-full inline-block text-red text-sm mt-1">{passwprdTip}</p>
                    </div>
                    <button
                      className="text-md py-4 px-8 bg-register-btn-31 border-6 border-cyan-500 text-white rounded-full tracking-widest uppercase transition-all relative disabled:opacity-40 block w-full mt-4"

                      onClick={async () => {
                        if (name === '') {
                          setNameTip('Username can not be empty!')
                          return
                        }
                        if (password === '') {
                          setPasswordTip('password can not be blank!')
                          return
                        }

                        await getRegisterUserInfoFun()
                        // setVerify(true)
                      }}
                    >
                      <span className={["transition-all font-play", !loading ? 'opacity-1' : 'opacity-0'].join(' ')}> Verify </span>
                      <div className={["transition-all absolute flex justify-center align-middle left-0 top-0 w-full h-full pointer-events-none overflow-hidden", loading ? 'opacity-1' : 'opacity-0'].join(' ')} role="status">
                        <img className="inline-block spinner-border animate-spin-slowing" src={require('../../asstes/img/spinner-white.svg').default} alt="" width="30" height="30" />
                      </div>
                    </button>
                  </div>

                </main>
              </div>
            </div>
          </>
      }
    </>
  );
}

export default UserInfo;