/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import _ from "lodash";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getPrice, getRaffleList } from "../../../api/services/http/api";
import { getClosedDate, getDollar, isToday } from "../../../libs/userAgent";
import { CallBackData, RaffleItemData } from "../../../types/types";

/* eslint-disable jsx-a11y/img-redundant-alt */
const LiveNow = (): JSX.Element => {
  const SnapBox = useRef<HTMLDivElement>(null)
  const [holdsCurrentIndex, setHoldsCurrentIndex] = useState<any>(0);
  const [HoldsChildrenLens, setHoldsChildrenLens] = useState<any>(0)
  const [HoldsItemsLens, setHoldsItemsLens] = useState<any>()
  const [loading, setLoading] = useState(true)
  const [price, setPrice] = useState({
    usd: 0
  })

  const handleResize = () => {
    const SnapBoxWidth = Number(SnapBox.current?.clientWidth);
    const itemWidth = Number(SnapBox.current?.firstElementChild?.clientWidth);
    setHoldsChildrenLens(Number(SnapBox.current?.children.length))
    setHoldsItemsLens(Math.floor(SnapBoxWidth / itemWidth));
  }

  const [liveNowData, setLiveData] = useState({
    featured: [],
    closingTody: [],
    all: []
  })


  const seletSortLiveNowData = (data: { items: object[], count: number }) => {

    if (data.items === null) return

    let closingTody: any = [];
    let all: any = []
    data.items.forEach((ele: any) => {
      const is_today = isToday(ele.close_time)
      if (is_today) {
        closingTody.push(ele)
      } else {
        if (ele.category !== 'Featured') {
          all.push(ele)
        }
      }
    })


    let featturedData: any = _.filter(data.items, ['category', 'Featured']);



    setLiveData({
      ...liveNowData,
      featured: featturedData,
      closingTody: closingTody,
      all: all
    })
  }

  const getRaffleListFun = async () => {
    try {
      const result: CallBackData = await getRaffleList({
        status: 'live',
        skip: 0,
        take: 100000000,
        username: ""
      }) as any
      seletSortLiveNowData(result.data)
      setLoading(false)
    } catch (error: any) {
      toast.error(error.message, {
        hideProgressBar: false,
      })
    }
  }

  useEffect(() => {
    // 监听
    window.addEventListener("resize", handleResize);
    // 销毁
    return () => window.removeEventListener("resize", handleResize);
  })

  useEffect(() => {
    handleResize()
    getRaffleListFun()
    getPriceFun()
  }, [])
  const getPriceFun = async () => {
    try {
      const data: CallBackData = await getPrice() as any
      setPrice(data.data.price)

    } catch (error) {
      console.log('%c🀀 error', 'color: #e50000; font-size: 20px;', error);

    }
  }


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
                  liveNowData.all.length === 0 && liveNowData.featured.length === 0 && liveNowData.closingTody.length === 0
                    ? <div className="text-center w-full py-4 w-full">
                      <h2 className="text-center w-full px-3 lg:text-xl py-3 text-white animate-fade-in font-heavy">
                        <span>Nothing to display</span>
                      </h2>
                    </div>
                    : <div>
                      {
                        liveNowData.featured.length > 0
                          ?
                          <div className="mb-8 lg:mb-10">
                            <h2 className="uppercase block font-bold tracking-wider text-xl lg:text-xl mb-4">Featured</h2>


                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-4 2xl:grid-cols-6 3xl:grid-cols-6 4xl:grid-cols-8 5xl:grid-cols-9 mb-5">
                              {
                                liveNowData.featured.map((item: RaffleItemData, index: number) => {
                                  return (<article key={index} className="gtm-card-competition flex flex-col rounded-xl xl:rounded-2xl transition-all duration-200 lg:hover:scale-[1.03] relative bg-white">
                                    <figure className="w-full aspect-square rounded-xl overflow-hidden relative z-0 group -top-[0.5px]">
                                      <Link to={`/competition/${item.raffle_id}`} className="">
                                        <div className="relative w-full h-full">
                                          <img className="transition-all z-10 relative object-cover h-full w-full block relative z-10 opacity-100" src={item.prize.image_url} alt={`Image of ${item.prize.name}`} width="350" height="350" loading="lazy" decoding="async" draggable="false" />
                                          <div className="absolute z-0 animate-pulse w-full h-full rounded-xl top-0 left-0 p-3 after:flex after:h-full after:rounded-lg after:bg-gray-200 invisible"></div>
                                        </div>
                                        <div className="hidden lg:block absolute bg-moreInfo py-1 w-full z-20 bottom-0 text-center translate-y-10 group-hover:translate-y-0 transition-all delay-200">
                                          <span className="font-bold uppercase tracking-wider text-xs 
                            text-gold lg:text-sm">More info</span>
                                        </div>
                                        <span className="inline-block absolute bottom-1 left-1 z-10 rounded-full px-2 text-black bg-gold font-medium  text-sm translate-y-0 lg:group-hover:-translate-y-50 text-sm transition-all delay-200"> #{item.prize.token_id}</span>
                                      </Link>
                                    </figure>
                                    <div className="px-2 py-2 xl:px-3 overflow-hidden">
                                      <div className="flex flex-col">
                                        <div className="grow overflow-hidden">
                                          <div className="flex items-center h-4">
                                            <h2 className="text-sm xl:text-base font-heavy whitespace-nowrap text-ellipsis overflow-hidden leading-tight mb-0 text-black/80">{item.prize.name}</h2>
                                            <span className="icon2-ico-badge text-skyblue text-base xl:text-lg"></span>
                                          </div>
                                          <div className="mt-2 text-black">
                                            <div className="flex items-center justify-center">
                                              <div className="flex items-center justify-center">
                                                <span className="whitespace-nowrap pr-1 text-ellipsis overflow-hidden text-xs xl:text-sm text-black/80"> Value: </span>
                                                <span className="font-black text-xl xl:text-2xl"> ${getDollar(item.prize.value, price)}</span>
                                              </div>
                                              <span className="w-full max-w-[38px] xl:max-w-[44px] h-2 shrink-1"></span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>


                                      <div className="rounded-full w-full overflow-hidden relative flex items-center justify-center mt-3 mb-2 py-3 cursor-pointer">
                                        <a href={`/competition/${item.raffle_id}`}>
                                          <div className="relative z-10 uppercase tracking-wider font-bold text-xs md:text-sm text-center px-1 min-h-[16px] md:min-h-[20px] text-white font-play">
                                            <span className="truncate">Enter now</span>
                                          </div>
                                          <div className="absolute z-0 left-0 top-0 w-full h-full before:absolute bg-blue-500"></div>
                                        </a>
                                      </div>
                                      {/* <div className="pt-1 pb-1">
                              <div className="text-xs sm:text-sm xl:text-base text-blue-500 text-center font-bold uppercase tracking-wider">
                                <span className="text-black font-heavy">Price </span>
                                <span className="whitespace-nowrap font-black">

                                  <img src={require('../../../asstes/img/ico-eth-opacity-blue.svg').default} alt="WinBig logo" width="11" height="18" className="inline-block relative -top-[2px] mr-[2px] h-4" />
                                  0.003
                                </span>
                              </div>


                            </div> */}


                                      <div className="text-center text-xs font-heavy uppercase pt-1 pb-1 text-black/60">
                                        Join {item.participants.length} MetaWinners
                                      </div>

                                      <div className="flex items-center">
                                        <h3 className="text-xs relative mr-2 w-full text-center text-black/60"><span>Closes</span><span>: {getClosedDate(item.close_time)}</span></h3>
                                      </div>
                                    </div>
                                  </article>)
                                })
                              }

                            </div>
                          </div>
                          : ''
                      }
                      {
                        liveNowData.closingTody.length > 0
                          ?
                          <div className="mb-8 lg:mb-10">
                            <h2 className="uppercase block font-bold tracking-wider text-lg lg:text-2xl mb-2">Closing today</h2>


                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-4 2xl:grid-cols-6 3xl:grid-cols-6 4xl:grid-cols-8 5xl:grid-cols-9 mb-5">

                              {
                                liveNowData.closingTody.map((item: RaffleItemData, index: number) => {
                                  return (<article key={index} className="gtm-card-competition flex flex-col rounded-xl xl:rounded-2xl transition-all duration-200 lg:hover:scale-[1.03] relative bg-white">
                                    <figure className="w-full aspect-square rounded-xl overflow-hidden relative z-0 group -top-[0.5px]">
                                      <Link to={`/competition/${item.raffle_id}`} className="">
                                        <div className="relative w-full h-full">
                                          <img className="transition-all z-10 relative object-cover h-full w-full block relative z-10 opacity-100" src={item.prize.image_url} alt={`Image of ${item.prize.name}`} width="350" height="350" loading="lazy" decoding="async" draggable="false" />
                                          <div className="absolute z-0 animate-pulse w-full h-full rounded-xl top-0 left-0 p-3 after:flex after:h-full after:rounded-lg after:bg-gray-200 invisible"></div>
                                        </div>
                                        <div className="hidden lg:block absolute bg-moreInfo py-1 w-full z-20 bottom-0 text-center translate-y-10 group-hover:translate-y-0 transition-all delay-200">
                                          <span className="font-bold uppercase tracking-wider text-xs lg:text-sm">More info</span>
                                        </div>
                                        <span className="inline-block absolute bottom-1 left-1 z-10 rounded-full px-2 text-black bg-gold font-medium  text-sm"> #{item.prize.token_id}</span>
                                      </Link>
                                    </figure>
                                    <div className="px-2 py-2 xl:px-3 overflow-hidden">
                                      <div className="flex flex-col">
                                        <div className="grow overflow-hidden">
                                          <div className="flex items-center h-4">
                                            <h2 className="text-sm xl:text-base font-heavy whitespace-nowrap text-ellipsis overflow-hidden leading-tight mb-0 text-black/80">{item.prize.name}</h2>
                                            <span className="icon2-ico-badge text-skyblue text-base xl:text-lg"></span>
                                          </div>
                                          <div className="mt-2 text-black">
                                            <div className="flex items-center justify-center">
                                              <div className="flex items-center justify-center">
                                                <span className="whitespace-nowrap pr-1 text-ellipsis overflow-hidden text-xs xl:text-sm text-black/80"> Value: </span>
                                                <span className="font-black text-xl xl:text-2xl"> ${getDollar(item.prize.value, price)}</span>
                                              </div>
                                              <span className="w-full max-w-[38px] xl:max-w-[44px] h-2 shrink-1"></span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>


                                      <div className="rounded-full w-full overflow-hidden relative flex items-center justify-center mt-3 mb-2 py-3 cursor-pointer">
                                        <a href={`/competition/${item.raffle_id}`}>
                                          <div className="relative z-10 uppercase tracking-wider font-bold text-xs md:text-sm text-center px-1 min-h-[16px] md:min-h-[20px] text-white font-play">
                                            <span className="truncate">Enter now</span>
                                          </div>
                                          <div className="absolute z-0 left-0 top-0 w-full h-full before:absolute bg-blue-500"></div>
                                        </a>
                                      </div>
                                      <div className="pt-1 pb-1">
                                        <div className="text-xs sm:text-sm xl:text-base text-blue-500 text-center font-bold uppercase tracking-wider">
                                          <span className="text-black font-heavy">Price </span>
                                          <span className="whitespace-nowrap font-black">

                                            <img src={require('../../../asstes/img/ico-eth-opacity-blue.svg').default} alt="WinBig logo" width="11" height="18" className="inline-block relative -top-[2px] mr-[2px] h-4" />
                                            {item.price_structure[0].price}
                                          </span>
                                        </div>


                                      </div>


                                      <div className="text-center text-xs font-heavy uppercase pt-1 pb-1 text-black/60">
                                        Join 255 MetaWinners
                                      </div>

                                      <div className="flex items-center">
                                        <h3 className="text-xs relative mr-2 w-full text-center text-black/60"><span>Closes</span><span>: 19 Nov 2022</span></h3>
                                      </div>
                                    </div>
                                  </article>)
                                })
                              }

                            </div>
                          </div>
                          : ''
                      }


                      <div className="mb-8 lg:mb-10">
                        {
                          liveNowData.all.length > 0
                            ? <h2 className="uppercase block font-bold tracking-wider text-lg lg:text-2xl mb-2">All</h2>
                            : ''
                        }

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-4 2xl:grid-cols-6 3xl:grid-cols-6 4xl:grid-cols-8 5xl:grid-cols-9 mb-5">

                          {
                            liveNowData.all.map((item: RaffleItemData, index: number) => {
                              return (
                                <article key={index} className="gtm-card-competition flex flex-col rounded-xl xl:rounded-2xl transition-all duration-200 lg:hover:scale-[1.03] relative bg-white">
                                  <figure className="w-full aspect-square rounded-xl overflow-hidden relative z-0 group -top-[0.5px]">
                                    <Link to={`/competition/${item.raffle_id}`} className="">
                                      <div className="relative w-full h-full">
                                        <img className="transition-all z-10 relative object-cover h-full w-full block relative z-10 opacity-100" src={item.prize.image_url} alt={`Image of ${item.prize.name}`} width="350" height="350" loading="lazy" decoding="async" draggable="false" />
                                        <div className="absolute z-0 animate-pulse w-full h-full rounded-xl top-0 left-0 p-3 after:flex after:h-full after:rounded-lg after:bg-gray-200 invisible"></div>
                                      </div>
                                      <div className="hidden lg:block absolute bg-moreInfo py-1 w-full z-20 bottom-0 text-center translate-y-10 group-hover:translate-y-0 transition-all delay-200">
                                        <span className="font-bold uppercase tracking-wider text-xs 
                                text-gold lg:text-sm">More info</span>
                                      </div>
                                      <span className="inline-block absolute bottom-1 left-1 z-10 rounded-full px-2 text-black bg-gold font-medium  text-sm translate-y-0 lg:group-hover:-translate-y-50 text-sm transition-all delay-200"> #{item.prize.token_id}</span>
                                    </Link>
                                  </figure>
                                  <div className="px-2 py-2 xl:px-3 overflow-hidden">
                                    <div className="flex flex-col">
                                      <div className="grow overflow-hidden">
                                        <div className="flex items-center h-4">
                                          <h2 className="text-sm xl:text-base font-heavy whitespace-nowrap text-ellipsis overflow-hidden leading-tight mb-0 text-black/80">{item.prize.name}</h2>
                                          <span className="icon2-ico-badge text-skyblue text-base xl:text-lg"></span>
                                        </div>
                                        <div className="mt-2 text-black">
                                          <div className="flex items-center justify-center">
                                            <div className="flex items-center justify-center">
                                              <span className="whitespace-nowrap pr-1 text-ellipsis overflow-hidden text-xs xl:text-sm text-black/80"> Value: </span>
                                              <span className="font-black text-xl xl:text-2xl"> ${getDollar(item.prize.value, price)}</span>
                                            </div>
                                            <span className="w-full max-w-[38px] xl:max-w-[44px] h-2 shrink-1"></span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>


                                    <div className="rounded-full w-full overflow-hidden relative flex items-center justify-center mt-3 mb-2 py-3 cursor-pointer">
                                      <a href={`/competition/${item.raffle_id}`}>
                                        <div className="relative z-10 uppercase tracking-wider font-bold text-xs md:text-sm text-center px-1 min-h-[16px] md:min-h-[20px] text-white font-play">
                                          <span className="truncate">Enter now</span>
                                        </div>
                                        <div className="absolute z-0 left-0 top-0 w-full h-full before:absolute bg-blue-500"></div>
                                      </a>
                                    </div>
                                    {
                                      item.price_structure.length === 0 || (item.price_structure.length === 1 && item.price_structure[0].price === '0')
                                        ? <div className="pt-1 pb-1">
                                          <div className="text-xs sm:text-sm xl:text-base text-blue-500 text-center font-bold uppercase tracking-wider">
                                            <span>Free entry</span>
                                          </div>


                                        </div>
                                        : ''
                                    }


                                    <div className="text-center text-xs font-heavy uppercase pt-1 pb-1 text-black/60">
                                      Join {item.participants.length} Winners
                                    </div>

                                    <div className="flex items-center">
                                      <h3 className="text-xs relative mr-2 w-full text-center text-black/60"><span>Closes</span><span>: {getClosedDate(item.close_time)}</span></h3>
                                    </div>
                                  </div>
                                </article>
                              )
                            })
                          }

                        </div>
                      </div>
                    </div>
                }
              </>
          }

        </div>
      </section>
    </>
  );
}

export default LiveNow;