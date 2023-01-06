import { useEffect, useState } from "react";
import { getAllActivity } from "../../api/services/http/api";
import { TimeInterval } from "../../libs/userAgent";
import { AllActivityItem, CallBackData } from "../../types/types";

const TwoColActivity = (): JSX.Element => {
  const [activityList, setActivityList] = useState<any>([])
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
    let data = [
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
      }
    ];
    setActivityList(data);
    setLoading(false)
  }
  useEffect(() => {
    getAllActivityFun()
  })
  return (
    <>

      <section className="w-full mx-auto lg:screnHeight">
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
                    background: 'linear-gradient(rgba(0,73,138,0), rgba(13,60,111,24))'
                  }}
                >
                  <div className="py-3 w-6/12 md:w-4/12">
                    <h3>Username</h3>
                  </div>
                  <div className="hidden md:inline-block py-3 w-3/12">
                    <h3>Entries Purchased</h3>
                  </div>
                </div>
                <div className="relative z-0 px-6">
                  {
                    activityList.length > 0
                      ?
                      activityList.map((item: AllActivityItem, index:number) => {
                        return <article key={index} className="border-b border-slate-500 py-3 lg:py-1 hover:bg-slate-700 flex items-center flex-wrap">
                          <div className="py-3 w-6/12 md:w-4/12 relative">
                            <a href={`/mw/${item.display_name}`} className="flex items-center overflow-hidden mr-3 group">
                              <span className="relative mr-2 md:mr-3">
                                <img className="inline-block rounded-full w-12 h-12 border-2 border-transparent group-hover:border-gray-300 transition-all" src={require('../../asstes/img/default_personal.png').default} alt="" width="48" height="48" loading="lazy" />
                              </span>
                              <h3 className="text-ellipsis overflow-hidden group-hover:text-gray-300 transition-colors font-heavy">{item.display_name}</h3>
                            </a>
                          </div>
                          <div className="flex md:flex w-full pl-2 md:w-5/12 md:pl-0">
                            <div className="flex md:py-3 w-1/2">
                              <span className="text-slate-100 block md:hidden mr-1">Entries</span>
                              <span className="font-bold font-heavy">{item.entry_info.count}</span>
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

export default TwoColActivity;