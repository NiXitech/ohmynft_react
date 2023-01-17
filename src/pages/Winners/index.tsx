import { useEffect, useState } from "react";
import { getAllWinner, getPrice } from "../../api/services/http/api";
// import Footer from "../../components/footer";
import { getDollar, TimeInterval } from "../../libs/userAgent";
import { AllActivityItem, CallBackData } from "../../types/types";

/* eslint-disable react/jsx-no-target-blank */
const Winners = (): JSX.Element => {

  const [price, setPrice] = useState({
    usd: 0
  })
  const [winnerList, setWinnerList] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    getPriceFun()
    getWinnerFun()
  }, [])
  const getPriceFun = async () => {
    try {
      const data: CallBackData = await getPrice() as any
      setPrice(data.data.price)

    } catch (error) {

    }
  }

  const getWinnerFun = async () => {
    try {
      const result: CallBackData = await getAllWinner({
        skip: 0,
        take: 100000000
      }) as any
      if (result.code === 200 && result.data !== null) {
        setWinnerList(result.data)
      }
    } catch (error) {
      console.log('%c🀃 error', 'color: #33cc99; font-size: 20px;', error);

    }
    setLoading(false)
  }

  return (
    <>
      <main className="flex flex-wrap grow px-2 lg:px-8 transition-all duration-300 page-enter:opacity-0 page-enter:-translate-y-4 layout-enter:opacity-0 layout-enter:-translate-y-4 pt-16 ">
        <div className="w-full mx-auto 5xl:container lg:screnHeight lg:screnHeight-10 mt-4">
          <section className="animate-fade-in lg:overflow-y-auto overflow-y-auto overflow-x-hidden lg:overflow-x-hidde relative min-h-[50vh] hideScrollbar"
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
                : <div className="overflow-x-auto lg:overflow-x-visible pb-0">
                  <section className="text-left text-sm md:text-base whitespace-nowrap w-full mb-4 animate-fade-in">
                    <div className="text-sm md:text-base font-bold lg:sticky z-10 backdrop-blur-md shadow-[0_1px_0_0] shadow-blue-100/50 flex px-6 font-black lg:top-0"
                      style={{
                        background: 'linear-gradient(rgba(0,73,138,0), rgba(13,60,111,24))'
                      }}
                    >
                      <div className="py-3 pl-2 w-6/12 md:w-3/12">
                        <h3>NFT Prize</h3>
                      </div>
                      <div className="py-3 w-6/12 md:w-4/12">
                        <h3>Winner</h3>
                      </div>
                      <div className="hidden md:inline-block py-3 w-3/12">
                        <h3>NFT Value On Date</h3>
                      </div>
                      <div className="hidden md:inline-block py-3 pr-2 w-2/12">
                        <h3 className="text-right">End date</h3>
                      </div>
                    </div>
                    <div className="relative z-0">

                      {
                        winnerList.length > 0
                          ? <>
                            {
                              winnerList.map((item: AllActivityItem, index) => {
                                return <article className="border-b border-slate-500 py-3 hover:bg-slate-700 flex items-center flex-wrap" key={index}>
                                  <div className="py-3 pl-2 w-6/12 md:w-3/12">
                                    <a href={`/competition/${item.raffle_id}`} className="flex items-center mr-3 group">
                                      <figure className="mr-3 rounded-lg relative overflow-hidden w-14 h-14 flex-none border-linear transition-all">
                                        <img className="block relative z-10 w-14 rounded-lg" src={item.prize.image_url} width="50" height="50" alt="" loading="lazy" decoding="async" />
                                      </figure>
                                      <div className="grow overflow-hidden">
                                        <div className="flex h-5">
                                          <h2 className="font-bold whitespace-nowrap text-ellipsis overflow-hidden group-hover:text-gray-300 transition-colors font-heavy">{item.prize.name}</h2>
                                          <span className="icon-ico-badge text-blue-500 text-base relative -top-[2px] md:top-0 ml-1"></span>
                                        </div>
                                        <h3 className="text-slate-100 font-bold font-medium">#{item.prize.token_id}</h3>
                                      </div></a>
                                  </div>
                                  <div className="py-3 w-6/12 md:w-4/12 relative">
                                    <a href={`/mw/${item.display_name}`} className="flex items-center overflow-hidden mr-3 group"><span className="relative inline-block mr-2 md:mr-3">
                                      <img className="inline-block rounded-full w-12 h-12 border-2 border-transparent group-hover:border-gray-300 transition-all" src={require('../../asstes/img/personal.png').default} alt="" width="28" height="28" loading="lazy" /></span><h3 className="text-ellipsis overflow-hidden group-hover:text-gray-300 transition-colors font-heavy">{item.display_name}</h3></a>
                                  </div>
                                  <div className="flex md:flex w-full pl-2 md:w-5/12 md:pl-0">
                                    <div className="flex md:py-3 w-1/2">
                                      <span className="text-slate-100 mr-1 md:hidden">Value: </span>
                                      <div className="flex items-center">
                                        <span className="icon-ico-eth inline-block mr-1 text-blue-500"></span>
                                        <span className="font-bold mr-1 md:mr-3 font-heavy">{item.nft_vale}</span>
                                        <span className="text-slate-100 font-medium">${getDollar(item.nft_vale, price)}</span>
                                      </div>
                                    </div>
                                    <div className="flex w-1/2 text-right pr-3 justify-end md:py-3 items-center">
                                      <a href={`${process.env.REACT_APP_BROSWER_BNB}/tx/${item.win_tx}`} target="_blank" className="text-sm md:text-base text-blue-500 hover:text-blue-400 font-heavy">
                                        {TimeInterval(item.create_time)} ago
                                        <span className="icon2-ico-share inline-block top-[2px] relative text-[16px]"></span>
                                      </a>
                                    </div>
                                  </div>
                                </article>
                              })
                            }
                          </>
                          : <div className="text-center w-full py-4">
                            <h2 className="text-center w-full px-3 lg:text-xl py-3 text-white animate-fade-in font-heavy">
                              <span>Nothing to display</span>
                            </h2>
                          </div>
                      }


                    </div>
                  </section>
                </div>
            }


          </section>
        </div>
      </main>
      {/* <Footer></Footer> */}
    </>
  );
}

export default Winners;