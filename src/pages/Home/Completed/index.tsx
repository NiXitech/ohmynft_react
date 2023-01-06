/* eslint-disable jsx-a11y/img-redundant-alt */

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getPrice, getRaffleList } from "../../../api/services/http/api";
import { getClosedDate, getDollar, TimeInterval } from "../../../libs/userAgent";
import { CallBackData, RaffleItemData } from "../../../types/types";


const Completed = (): JSX.Element => {
  const [price, setPrice] = useState({
    usd: 0
  })
  const [loading, setLoading] = useState(true)

  const [CompletedData, setCompletedData] = useState<RaffleItemData[]>([])
  const getPriceFun = async () => {
    try {
      const data: CallBackData = await getPrice() as any
      setPrice(data.data.price)

    } catch (error) {

    }
  }

  const getRaffleListFun = async () => {
    try {
      const result: CallBackData = await getRaffleList({
        status: 'completed',
        skip: 0,
        take: 100000000,
        username: ""
      }) as any
      if (result.code === 200 && result.data.items !== null) {
        setCompletedData(result.data.items)
      }
    } catch (error: any) {
      toast.error(error.message, {
        hideProgressBar: false,
      })
    }
    setLoading(false)
  }
  useEffect(() => {
    getPriceFun()
    getRaffleListFun()
  }, [])

  return (
    <>
      <section className="w-full pb-4">
        <div className="">
          {
            loading
              ? <div className="absolute z-10 flex justify-center align-middle w-full pt-8">
                <img className="inline-block spinner-border animate-spin-slowing" src={require('../../../asstes/img/spinner-white.svg').default} alt="" width="30" height="30" />
              </div>
              : <>
                {
                  CompletedData.length > 0

                    ? <>
                      < div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-4 2xl:grid-cols-6 3xl:grid-cols-6 4xl:grid-cols-8 5xl:grid-cols-9 mb-5">

                        {
                          CompletedData.map((item, index: number) => {
                            return <article key={index} className="gtm-card-competition flex flex-col rounded-xl xl:rounded-2xl transition-all duration-200 lg:hover:scale-[1.03] relative bg-white">
                              <figure className="w-full aspect-square rounded-xl overflow-hidden relative z-0 group -top-[0.5px]">
                                <a href={`/competition/${item.raffle_id}`}>
                                  <div className="relative w-full h-full">
                                    <img className="transition-all z-10 relative object-cover h-full w-full block relative z-10 opacity-100" src={item.prize.image_url} alt={`Image of ${item.prize.name}`} width="350" height="350" loading="lazy" decoding="async" draggable="false" />
                                    <div className="absolute z-0 animate-pulse w-full h-full rounded-xl top-0 left-0 p-3 after:flex after:h-full after:rounded-lg after:bg-gray-200 invisible"></div>
                                  </div>
                                  <div className="hidden lg:block absolute bg-moreInfo py-1 w-full z-20 bottom-0 text-center translate-y-10 group-hover:translate-y-0 transition-all delay-200">
                                    <span className="font-bold uppercase tracking-wider text-xs 
                            text-gold lg:text-sm">More info</span>
                                  </div>
                                  <span className="inline-block absolute bottom-1 left-1 z-10 rounded-full px-2 text-black bg-gold font-medium  text-sm translate-y-0 lg:group-hover:-translate-y-50 text-sm transition-all delay-200"> #{item.prize.token_id}</span>
                                </a>
                              </figure>
                              <div className="px-2 py-2 xl:px-3 overflow-hidden">
                                <div className="flex flex-col">
                                  <div className="grow overflow-hidden">
                                    <div className="flex items-center h-4">
                                      <h2 className="text-sm xl:text-base font-heavy whitespace-nowrap text-ellipsis overflow-hidden leading-tight mb-0 text-black/80">{item.prize.name}</h2>
                                      <span className="icon2-ico-badge text-skyblue text-base xl:text-lg"></span>
                                    </div>
                                    <div className="mt-2 text-slate-800">
                                      <div className="flex items-center justify-center">
                                        <div className="flex items-center justify-center">
                                          <span className="whitespace-nowrap pr-1 text-ellipsis overflow-hidden text-xs xl:text-sm text-black/80"> Value: </span>
                                          <span className="font-black text-xl xl:text-2xl"> ${item?.prize.value && getDollar(item?.prize.value, price)}</span>
                                        </div>
                                        <span className="w-full max-w-[38px] xl:max-w-[44px] h-2 shrink-1"></span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="rounded-full w-full overflow-hidden relative flex items-center justify-center my-3 py-3">
                                  <div className="uppercase tracking-wider z-10 font-bold text-xs md:text-sm text-center px-1 text-white font-play">
                                    <span>Ended {TimeInterval(item.close_time)} ago</span>
                                  </div>
                                  <div className="absolute left-0 top-0 w-full h-full before:absolute bg-slate-300"></div>
                                </div>
                                <div className="flex flex-nowrap items-center justify-center text-xs sm:text-sm font-bold pb-1 lg:pt-2 w-full font-heavy">
                                  <span className="text-black whitespace-nowrap uppercase">Won by</span>
                                  <a href={`/mw/${item.winner.display_name}`} className="flex items-center ml-1 overflow-hidden">
                                    <span className="relative mr-1">
                                      <img className="inline-block rounded-full w-7 h-7" src={require('../../../asstes/img/default_personal.png').default} alt="" width="28" height="28" loading="lazy" />
                                    </span>
                                    <span className="text-blue-500 whitespace-nowrap text-ellipsis overflow-hidden">{item.winner.display_name}</span>
                                  </a>
                                </div>
                                <div className="text-center text-xs font-bold uppercase pt-1 pb-1 text-slate-200">
                                </div>
                                <div className="flex items-center">
                                  <h3 className="text-xs relative mr-2 w-full text-center text-black/60">
                                    <span>Closed</span>
                                    <span>  {getClosedDate(item.close_time)}</span>
                                  </h3>
                                </div>
                              </div>
                            </article>
                          })
                        }
                      </div>
                    </>

                    : <div className="text-center w-full py-4 w-full">
                      <h2 className="text-center w-full px-3 lg:text-xl py-3 text-white animate-fade-in font-heavy">
                        <span>Nothing to display</span>
                      </h2>
                    </div>
                }
              </>
          }


        </div>
      </section>
    </>
  );
}

export default Completed;