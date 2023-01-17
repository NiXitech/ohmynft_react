import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { ReferralList } from "../../api/services/http/api";
import { TimeInterval } from "../../libs/userAgent";
import { AllActivityItem, CallBackData, ReferralListItem } from "../../types/types";

const MyReferral = (): JSX.Element => {
  const [ReferralListArr, setReferralList] = useState<ReferralListItem[]>()
  const [loading, setLoading] = useState(true)
  const { isConnected, address } = useAccount()

  const getReferralList = async () => {
    setLoading(true)
    try {
      const result: CallBackData = await ReferralList(JSON.stringify(address)) as any

      if (result.data !== null) {
        setReferralList(result.data)
      }

    } catch (error) {
      console.log('%c🀂 error', 'color: #006dcc; font-size: 20px;', error);
    }
    setLoading(false)
  }

  useEffect(() => {
    getReferralList()
  }, [])

  return (
    <>
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
                <img className="inline-block spinner-border animate-spin-slowing" src={require('../../asstes/img/spinner-white.svg').default} alt="" width="30" height="30" />
              </div>
              : <section className="text-left text-sm md:text-base whitespace-nowrap w-full mb-4 animate-fade-in">
                <div className="text-sm md:text-base font-bold lg:sticky z-10 backdrop-blur-md shadow-[0_1px_0_0] shadow-blue-100/50 flex px-6 font-black lg:top-0"
                  style={{
                    // background: 'linear-gradient(rgba(0,73,138,0), rgba(13,60,111,24))'
                  }}
                >
                  {/* <div className="py-3 pl-2 w-6/12 md:w-3/12">
                    <h3 className="pl-6">Competition</h3>
                  </div> */}
                  <div className="py-3 w-6/12 md:w-4/12">
                    <h3>Username</h3>
                  </div>
                  <div className="hidden md:inline-block py-3 w-3/12">
                    <h3>Competition</h3>
                  </div>
                  <div className="hidden md:inline-block py-3 w-3/12">
                    <h3>Reward</h3>
                  </div>
                  <div className="hidden md:inline-block py-3 pr-2 w-2/12">
                    <h3 className="text-right pr-6">Time</h3>
                  </div>
                </div>
                <div className="relative z-0 px-6">
                  {

                    ReferralListArr && ReferralListArr.length > 0
                      ?
                      ReferralListArr.map((item: ReferralListItem, index: number) => {
                        return <article key={index} className="border-b border-slate-500 py-3 lg:py-1 flex items-center flex-wrap">

                          <div className="py-3 w-6/12 md:w-4/12 relative">
                            <a href={`/mw/${item.username}`} className="flex items-center overflow-hidden mr-3 group">
                              <span className="relative mr-2 md:mr-3">
                                <img className="inline-block rounded-full w-12 h-12 border-2 border-transparent group-hover:border-gray-300 transition-all" src={require('../../asstes/img/personal.png').default} alt="" width="48" height="48" loading="lazy" />
                              </span>
                              <h3 className="text-ellipsis overflow-hidden group-hover:text-gray-300 transition-colors font-heavy">{item.username}</h3>
                            </a>
                          </div>

                          <div className="py-3 pl-2 w-6/12 md:w-3/12">
                            <div className="grow overflow-hidden">
                              <div className="flex h-5 mb-0">
                                <h2 className="font-bold whitespace-nowrap text-ellipsis overflow-hidden group-hover:text-gray-300 transition-colors font-heavy">{item.reward}</h2>
                              </div>
                            </div>
                          </div>

                          <div className="flex md:flex w-full pl-2 md:w-5/12 md:pl-0">
                            <div className="flex md:py-3 w-1/2">
                              {/* <span className="text-slate-100 block md:hidden mr-1">Entries</span> */}
                              <span className="font-bold font-heavy">{item.reward}</span>
                              <span className="icon icon-lock text-base relative ml-1">
                              </span>
                            </div>
                            <div className="flex w-1/2 text-right pr-3 justify-end md:py-3 items-center">
                              <a href={`${process.env.REACT_APP_BROSWER_BNB}/tx/${item.tx_hash}`} target="_blank" className="text-sm md:text-base text-cyan-500 hover:text-cyan-500 pr-6" rel="noreferrer">
                                {TimeInterval(item.created_at)} ago
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
        </div>
      </section>
    </>
  );
}

export default MyReferral;