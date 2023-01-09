import { useEffect, useState } from "react";
import { getAllActivity } from "../../../api/services/http/api";
import { TimeInterval } from "../../../libs/userAgent";
import { AllActivityItem, CallBackData } from "../../../types/types";

const Activity = (): JSX.Element => {
  const [activityList, setActivityList] = useState([])
  const [loading, setLoading] = useState(true)
  const getAllActivityFun = async () => {
    // try {
    //   const result: CallBackData = await getAllActivity({
    //     category: 'BuyEntry',
    //     skip: 0,
    //     take: 100000000,
    //   }) as any

    //   if (result.data !== null) {
    //     setActivityList(result.data)
    //   }

    // } catch (error) {
    //   console.log('%c🀂 error', 'color: #006dcc; font-size: 20px;', error);

    // }
    const data:any = [
      {
        category: "BuyEntry",
        entry_info: {
          count: 6,
          tx_hash: "0x20996273bbc0334eac636286abf1fc22b4f47a495fb9051cca6882642b1cb11d"
        },
        win_tx: "",
        display_name: "1231232",
        create_time: "2023-01-04 12:58:01",
        raffle_id: 9,
        prize: {
          name: "Berry Bear ",
          token_address: "0x944C5F7C4D6a978c8bF344DfF9dB35C86F684b5c",
          token_id: 39,
          image_url: "https://i.seadn.io/gae/3sXT3S-V2hwPxJ3ThmEkUhGctExD2iOXtle8GfiIzZKP4S8deNLzw9B0fVfMb5hKMrj_0xoptAy_H4piItHJV3XegriRJvSzir7r?auto=format&w=1000",
          value: "0.05"
        },
        nft_vale: ""
      },
      {
        category: "BuyEntry",
        entry_info: {
          count: 1,
          tx_hash: "0xa85731cd506bc7c8fbd9b7243b403da46f2384a3e953b07aaaef8f575630aa2f"
        },
        win_tx: "",
        display_name: "1231232",
        create_time: "2023-01-04 10:15:37",
        raffle_id: 9,
        prize: {
          name: "Berry Bear ",
          token_address: "0x944C5F7C4D6a978c8bF344DfF9dB35C86F684b5c",
          token_id: 39,
          image_url: "https://i.seadn.io/gae/3sXT3S-V2hwPxJ3ThmEkUhGctExD2iOXtle8GfiIzZKP4S8deNLzw9B0fVfMb5hKMrj_0xoptAy_H4piItHJV3XegriRJvSzir7r?auto=format&w=1000",
          value: "0.05"
        },
        nft_vale: ""
      }]
    setActivityList(data);
    setLoading(false)
  }
  useEffect(() => {
    getAllActivityFun()
  }, [])
  return (
    <>
      <div className="container">
        <section className="w-full mx-auto lg:screnHeight pt-16">

          <div className="lg:overflow-y-auto overflow-y-auto overflow-x-hidden lg:overflow-x-hidden relative pb-0 hideScrollbar"
            style={{
              height: '100%',
              width: '100%',
            }}
          >

            {
              loading
                ? <div className="absolute z-10 flex justify-center align-middle w-full pt-8">
                  <img className="inline-block spinner-border animate-spin-slowing" src={require('../../../asstes/img/spinner-white.svg').default} alt="" width="30" height="30" />
                </div>
                : <section className="text-left text-sm md:text-base whitespace-nowrap w-full mb-4 animate-fade-in">
                  <div className="text-sm md:text-base font-bold lg:sticky z-10 backdrop-blur-md shadow-[0_1px_0_0] shadow-blue-100/50 flex px-6 font-black lg:top-0"
                    style={{
                      // background: 'linear-gradient(rgba(0,73,138,0), rgba(13,60,111,24))'
                    }}
                  >
                    <div className="py-3 pl-2 w-6/12 md:w-3/12">
                      <h3 className="pl-6">Competition</h3>
                    </div>
                    <div className="py-3 w-6/12 md:w-4/12">
                      <h3>Username</h3>
                    </div>
                    <div className="hidden md:inline-block py-3 w-3/12">
                      <h3>Entries Purchased</h3>
                    </div>
                    <div className="hidden md:inline-block py-3 pr-2 w-2/12">
                      <h3 className="text-right pr-6">Time</h3>
                    </div>
                  </div>
                  <div className="relative z-0 px-6">
                    {
                      activityList.length > 0
                        ?
                        activityList.map((item: AllActivityItem, index) => {
                          return <article key={index} className="border-b border-slate-500 py-3 lg:py-1 flex items-center flex-wrap">
                            <div className="py-3 pl-2 w-6/12 md:w-3/12">
                              <a href={`/competition/${item.raffle_id}`} className="flex items-center mr-3 group pl-6">
                                <figure className="mr-3 rounded-lg relative overflow-hidden w-14 h-14 flex-none border-linear transition-all">
                                  <img className="block relative z-10 w-14 rounded-lg" src={item.prize.image_url} width="52" height="52" alt="" loading="lazy" decoding="async" />
                                </figure>
                                <div className="grow overflow-hidden">
                                  <div className="flex h-5 mb-0">
                                    <h2 className="font-bold whitespace-nowrap text-ellipsis overflow-hidden group-hover:text-gray-300 transition-colors font-heavy">{item.prize.name}</h2>
                                    <span className="icon2-ico-badge text-blue-500 text-base relative -top-[2px] md:top-0 ml-1"></span>
                                  </div>
                                  <h3 className="text-white/60 font-bold font-medium">#{item.prize.token_id}</h3>
                                </div>
                              </a>
                            </div>
                            <div className="py-3 w-6/12 md:w-4/12 relative">
                              <a href={`/mw/${item.display_name}`} className="flex items-center overflow-hidden mr-3 group">
                                <span className="relative mr-2 md:mr-3">
                                  <img className="inline-block rounded-full w-12 h-12 border-2 border-transparent group-hover:border-gray-300 transition-all" src={require('../../../asstes/img/default_personal.png').default} alt="" width="48" height="48" loading="lazy" />
                                </span>
                                <h3 className="text-ellipsis overflow-hidden group-hover:text-gray-300 transition-colors font-heavy">{item.display_name}</h3>
                              </a>
                            </div>
                            <div className="flex md:flex w-full pl-2 md:w-5/12 md:pl-0">
                              <div className="flex md:py-3 w-1/2">
                                <span className="text-slate-100 block md:hidden mr-1">Entries</span>
                                <span className="font-bold font-heavy">{item.entry_info.count}</span>
                              </div>
                              <div className="flex w-1/2 text-right pr-3 justify-end md:py-3 items-center">
                                <a href={`https://goerli.etherscan.io/tx/${item.entry_info.tx_hash}`} target="_blank" className="text-sm md:text-base text-cyan-500 hover:text-cyan-500 pr-6" rel="noreferrer">
                                  {TimeInterval(item.create_time)} ago
                                  <span className="icon2-ico-share inline-block top-1 -right-[3px] relative text-[16px]"></span></a>
                              </div>
                            </div>
                          </article>
                        })
                        : <div className="text-center w-full py-4">
                          <h2 className="text-center w-full px-3 lg:text-xl py-3 text-white animate-fade-in font-heavy">
                            <span>Nothing to display</span>
                          </h2>
                        </div>
                    }

                  </div>
                </section>
            }

            {/* <img className="opacity-0 inline-block spinner-border animate-spin-slowing absolute w-8 h-8 left-1/2 -ml-4" src={require('../../../asstes/img/spinner-white.svg').default} alt="" width="30" height="30" /> */}
          </div>
        </section>
      </div>
    </>
  );
}

export default Activity;