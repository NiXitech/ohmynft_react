/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import copy from "copy-to-clipboard";
import { Button, Modal } from 'antd';
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import { getPrice, getRaffleList, getUserInfo } from "../../api/services/http/api";
import { ActivityIsClosed, getClosedDate, getDetailClosedDate, getDollar, getQueryVariable, TimeInterval, updateUrl } from "../../libs/userAgent";
import { CallBackData, RaffleItemData, UserInfoData } from "../../types/types";
import './index.scss'
import { type } from "@testing-library/user-event/dist/type";

/* eslint-disable jsx-a11y/img-redundant-alt */

const MWPage = (): JSX.Element => {
  const [showSocial, setShowSocial] = useState(false)
  const [selectTypeVal, setSelectTypeVal] = useState<any>('')
  const [CompletedData, setCompletedData] = useState<RaffleItemData[]>([])
  const paramsName = useParams()
  const [loading, setLoading] = useState(true)
  const [userInfo, setUserInfo] = useState<UserInfoData>()
  const [hasUser, setHasUser] = useState(false)
  const [price, setPrice] = useState({
    usd: 0
  })
  const [redeemStatus] = useState(false)
  useEffect(() => {
    window.addEventListener('click', function () {
      setShowSocial(false)
    }, false);
    const query = getQueryVariable('tab')
    if (query) {
      if (query === 'owned' || query === 'wins') {
        setSelectTypeVal(query)
      } else {
        window.open(`/mw/${paramsName.name}`, '_self')
      }
    } else {
      if (query === '') {
        selectTypeVal('')
        window.open(`/mw/${paramsName.name}`, '_self')
      }
    }

    getUserInfoFun()
    getRaffleListFun()
    getPriceFun()
  }, [paramsName.name, selectTypeVal])


  const coppyUrl = () => {
    let url = window.location.href
    copy(url);
    toast.success('Copied!')
  };

  const selectType = (type: any) => {
    setLoading(true)
    setSelectTypeVal(type)
    updateUrl('tab', type)
    setTimeout(() => {
      setLoading(false)
    }, 1500)
  }

  const getPriceFun = async () => {
    try {
      const data: CallBackData = await getPrice() as any
      setPrice(data.data.BUSD)
    } catch (error) {

    }
  }

  const getUserInfoFun = async () => {
    try {
      const result: CallBackData = await getUserInfo(paramsName.name || '') as any
      if (result.code === 200) {
        setUserInfo(result.data)
      } else {
        setHasUser(true)
      }

    } catch (error: any) {
      toast.error(error.message, {
        hideProgressBar: false,
      })
    }
  }


  const getRaffleListFun = async () => {
    try {
      const result: CallBackData = await getRaffleList({
        status: 'live',
        offset: 0,
        limit: 100000000,
        username: paramsName.name || "",
        win: selectTypeVal === 'wins'
      }) as any

      if (result.code === 200 && result.data.items !== null) {
        setCompletedData(result.data.items)
      } else {
        setCompletedData([])
      }
    } catch (error: any) {
      toast.error(error.message, {
        hideProgressBar: false,
      })
    }
    setLoading(false)
  }

  const [cardList, setCardList] = useState([{ id: 1, checked: false, redeemStatus: false }, { id: 2, checked: false, redeemStatus: false }, { id: 3, checked: false, redeemStatus: false }, { id: 4, checked: false, redeemStatus: false }, { id: 5, checked: false, redeemStatus: false }, { id: 6, checked: false, redeemStatus: false }]);


  const checkedItem = (key: any) => {
    // const arr: any = [];
    // // eslint-disable-next-line array-callback-return
    // CompletedData.map((item, index) => {
    //   if (item.id === key) {
    //     item['checked'] = true
    //   } else {
    //     item['checked'] = false
    //   }
    //   arr.push(item)
    // })
    // setCardList(arr)
    setselectedid(key);
  }

  const [selectedid, setselectedid] = useState(null)

  interface propstype {
    cardData: RaffleItemData
  }
  const WinsCard = (props: propstype) => {
    return (
      <>
        <article onClick={() => checkedItem(props.cardData.raffle_id)} className={["cursor-pointer flex flex-col bg-grey-6 rounded-3xl xl:rounded-3xl transition-all duration-200 lg:hover:scale-[1.03] relative group", selectedid === props.cardData.raffle_id ? 'border-3' : 'border-none'].join(' ')} style={{ borderColor: '#3A8AFF' }}>
          <figure className="w-full aspect-square rounded-xl overflow-hidden relative z-0 -top-[0.5px]">
            <div className="relative pt-5 px-5">
              <img className="transition-all rounded-3xl z-10 relative object-cover h-full w-full block relative z-10 opacity-100" src={
                props.cardData.prize.image_url
              } alt="Image of Cold Blooded Creepz" width="350" height="350" loading="lazy" decoding="async" draggable="false" />
              <div style={{ width: 'fit-content' }} className="relative bg-white rounded-full -top-10 z-10 left-0 p-2 px-2 mx-2 text-black ">#{props.cardData.id}</div>
            </div>
          </figure>
          <div className="px-5 xl:px-5">
            <div className="flex flex-col">
              <div className="grow overflow-hidden">
                <div className="flex items-center justify-between">
                  <h3 className="text-base xl:text-xl text-white font-Bold relative">{props.cardData.prize.name}</h3>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 items-center justify-center pt-4 w-full px-6">
              <span className="text-white whitespace-nowrap uppercase font-Bold text-base">Won by</span>
              {/* <a aria-current="page" href="/mw/montereyjack3d" className="router-link-active router-link-exact-active flex items-center ml-1"> */}
              <span className="relative text-center flex justify-center">
                {
                  props.cardData.winner.avatar
                    ?
                    <img className="inline-block rounded-full bg-slate-600" src={props.cardData.winner.avatar} alt="" width="28" height="28" loading="lazy" />
                    :
                    <div className='flex items-center rounded-full bg-slate-600 justify-center user-name-first-word uppercase text-base' style={{
                      width: '28px',
                      height: '28px'
                    }}>
                      {paramsName.name?.substr(0, 1)}
                    </div>
                }
              </span>
              <span className="text-blue text-base font-Bold whitespace-nowrap text-ellipsis overflow-hidden">{props.cardData.winner.display_name}</span>
              {/* </a> */}
            </div>
            <div className="flex items-center justify-center pt-2">
              <span className="text-yellow-[FDE23B] font-Bold text-ellipsis overflow-hidden text-base xl:text-xl">{props.cardData.prize.value} BUSD</span>
            </div>
            <div className="text-white text-center text-base font-Bold uppercase py-4">
              {props.cardData.participants.length || 0} participants
            </div>
          </div>
          {/* {
            redeemStatus ?
              <div className="z-20 w-full h-full absolute bg-grey-6 opacity-90 rounded-3xl xl:rounded-3xl">
                {
                  redeemStatus ?
                    <div className="bg-white text-black rouded-full m-3 m-auto text-center mt-28 w-32 h-32 rounded-full" style={{ lineHeight: '8rem' }} >
                      Redeemed
                    </div>
                    :
                    <div className="bg-white text-black rouded-full m-3 m-auto text-center mt-28 w-32 h-32 rounded-full" style={{ lineHeight: '8rem' }} >
                      Reject
                    </div>
                }
              </div>
              :
              <></>
          } */}
        </article>
      </>
    )
  }

  const [modalOpen, setModalOpen] = useState(false);
  const attention = () => {
    setModalOpen(true)
  }

  return (
    <>
      {
        modalOpen &&
        <div className="fixed w-full h-full bg-black" style={{ zIndex: '10000' }} onClick={() => setModalOpen(false)}>
          <div className="container m-auto">
            asdfasd
          </div>
        </div>
      }
      <main className="flex flex-wrap grow pb-10 transition-all duration-300 page-enter:opacity-0 page-enter:-translate-y-4 layout-enter:opacity-0 layout-enter:-translate-y-4 pt-16 container xxl:px-6rem66 xxxl:px-6rem66">
        <div className="w-full mx-auto pt-12 px-6">
          {
            hasUser
              ? <section className="pt-32 pb-20 flex items-center justify-center flex-col py-10 grow">
                <h1 className="text-3xl">User not found</h1>
                <a href="/" className="text-md py-4 px-8 bg-blue-400 text-white rounded-full tracking-widest uppercase hover:bg-blue-500 transition-all focus:bg-blue-500 relative disabled:opacity-40 disabled:hover:bg-blue-500 mt-6 inline-block font-play">Go to homepage</a>
              </section>
              : <section className="animate-fade-in mx-auto relative min-h-[50vh]">
                <div className="flex flex-col mt-3 md:flex-row md:py-4">
                  <div className="flex items-center mv-header">
                    <figure className=" avator overflow-hidden flex-none  transition-all relative">
                      {
                        userInfo?.avatar_url
                          ? <img className="block relative z-10 w-full group-hover:opacity-50 transition-opacity bg-slate-600" src={userInfo.avatar_url} width="100%" alt="" loading="lazy" />
                          : <div className='w-full h-full flex items-center rounded-full bg-slate-600 justify-center user-name-first-word uppercase text-xxl'>
                            {paramsName.name?.substr(0, 1)}
                          </div>
                      }
                    </figure>
                    <div className="grow overflow-hidden text">
                      <div className="block">
                        <h2 className="text-white block truncate font-black">{paramsName.name}
                        </h2>
                        <a href={`${process.env.REACT_APP_BROSWER_BNB}/address/${userInfo?.address}`} className=" transition-colors block truncate" target="_blank" rel="noreferrer" >
                          {userInfo?.address}
                          <span className="icon-share inline-block relative ml-1"></span>
                        </a>
                        <h3 className="">{userInfo?.created_at && getClosedDate(userInfo?.created_at)}</h3>
                      </div>
                    </div>
                  </div>
                  {/* <div className="relative ml-28 md:ml-0 md:flex md:pb-4 items-end justify-end grow">
                <div className="relative select-none inline-block">
                  <div className="relative before:h-10 before:w-10 before:bg-slate-600 before:absolute before:rounded-full before:top-1/2 before:-translate-y-1/2 before:left-1/2 before:-translate-x-1/2 before:opacity-0 hover:before:opacity-100 before:transition-all" onClick={(e) => { e.stopPropagation(); setShowSocial(!showSocial) }}>
                    <span className="text-xl icon-ico-share cursor-pointer relative p-2"></span>
                  </div>
                  <ul className={['flex flex-col absolute z-20 bg-slate-700 shadow-2xl rounded-xl top-10 overflow-hidden ', showSocial ? 'right-0' : 'left-0 hidden'].join(' ')} >
                    <li className="block whitespace-nowrap"><a href="https://www.facebook.com/sharer/sharer.php?u=https://metawin.com/mw/mickey7" title="Share on Facebook" className="flex items-center px-3 py-3 hover:bg-slate-600 hover:text-cyan-500 transition-all duration-100" target="_blank" rel="noreferrer"><span className="text-xl icon-ico-facebook mr-2"></span><span>Share on Facebook</span></a></li>
                    <li className="block"><a href="http://twitter.com/share?text=Check out Mickey7 MetaWin profile&amp;url=https://metawin.com/mw/mickey7&amp;hashtags=metawin,nft" title="Share on Twitter" className="flex items-center px-3 py-3 hover:bg-slate-600 hover:text-cyan-500 transition-all duration-100" target="_blank" rel="noreferrer"><span className="text-xl icon-ico-twitter mr-2"></span><span>Share on Twitter</span></a></li>
                    <li className="block">
                      <div title="Copy link" className="flex items-center px-3 py-3 hover:bg-slate-600 hover:text-cyan-500 transition-all duration-100" onClick={() => coppyUrl()}>
                        <span className="text-xl icon-ico-copy mr-2"></span>
                        <div>
                          <span>Copy link</span>
                        </div>
                      </div></li>
                  </ul>
                </div>
              </div> */}
                </div>
                <nav className=" mv-tab ">
                  <div className="content flex justify-center md:justify-start">

                    <button className={['uppercase text-sm tracking-wider grow max-w-[140px] md:grow-0 md:max-w-none overflow-hidden relative transition-all text-white', selectTypeVal === '' ? 'text-cyan-500' : ''].join(' ')} onClick={() => { selectType('') }}>
                      <span>Competitions entered</span>
                    </button>

                    <button className={['uppercase text-sm tracking-wider grow max-w-[140px] md:grow-0 md:max-w-none overflow-hidden relative transition-all text-white', selectTypeVal === 'wins' ? 'text-cyan-500' : ''].join(' ')} onClick={() => { selectType('wins') }}>
                      <span>Wins</span>
                    </button>
                  </div>
                  {/* <button className={['uppercase text-sm tracking-wider py-5 grow max-w-[140px] md:grow-0 md:max-w-none md:px-6 md:text-base overflow-hidden relative transition-all hover:text-cyan-500 text-white', selectTypeVal === 'owned' ? 'text-cyan-500' : ''].join(' ')} onClick={() => { selectType('owned') }}>
                <span>NFTs owned</span>
              </button>
              <button className={['uppercase text-sm tracking-wider py-5 grow max-w-[140px] md:grow-0 md:max-w-none md:px-6 md:text-base overflow-hidden relative transition-all hover:text-cyan-500 text-white', selectTypeVal === 'wins' ? 'text-cyan-500' : ''].join(' ')} onClick={() => { selectType('wins') }}>
                <span>Wins</span>
              </button> */}
                </nav>
                <div className="absolute z-10 flex justify-center align-middle w-full pt-8" style={{
                  display: !loading ? 'none' : ''
                }}>
                  <img className="inline-block spinner-border animate-spin-slowing" src={require('../../asstes/img/spinner-white.svg').default} alt="" width="30" height="30" />
                </div>
                {
                  loading
                    ? <div className="absolute z-10 flex justify-center align-middle w-full pt-8">
                      <img className="inline-block spinner-border animate-spin-slowing" src={require('../../asstes/img/spinner-white.svg').default} alt="" width="30" height="30" />
                    </div>
                    : <>
                      {
                        selectTypeVal === ''
                          ? <>
                            {
                              CompletedData.length > 0
                                ?
                                <div className={['mt-4 lg:mt-6', loading ? selectTypeVal === '' ? "cordList-enter-to cordList-enter-active" : 'cordList-leave-to cordList-leave-active' : ''].join(' ')}>
                                  {
                                    loading
                                      ? ''
                                      : <>
                                        <div>
                                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 lg:gap-4 lg:grid-cols-5 mb-5">
                                            <>
                                              {
                                                CompletedData.map((item, index) => {
                                                  return <article key={index} className="gtm-card-competition flex flex-col rounded-xl xl:rounded-2xl transition-all duration-200 lg:hover:scale-[1.03] relative bg-white">
                                                    <figure className="w-full aspect-square rounded-xl overflow-hidden relative z-0 group -top-[0.5px]">
                                                      <a href={`/productdetail/${item.raffle_id}`} className="">
                                                        <div className="relative w-full h-full">
                                                          <img className="transition-all z-10 relative object-cover h-full w-full block relative z-10 opacity-100" src={item.prize.image_url} alt={`Image of ${item.prize.name}`} width="350" height="350" loading="lazy" decoding="async" draggable="false" />
                                                          <div className="absolute z-0 animate-pulse w-full h-full rounded-xl top-0 left-0 p-3 after:flex after:h-full after:rounded-lg after:bg-gray-200 invisible"></div>
                                                        </div>

                                                        <span className="inline-block absolute bottom-1 left-1 z-10 rounded-full px-2 text-black bg-gold font-medium  text-sm"> #{item.prize.token_id}</span>
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
                                                      {
                                                        item.winner.display_name !== ''
                                                          ? <div className="rounded-full w-full overflow-hidden relative flex items-center justify-center my-3 py-3">
                                                            <div className="uppercase tracking-wider z-10 font-bold text-xs md:text-sm text-center px-1 text-white font-play">
                                                              <span>Ended {TimeInterval(item.close_time)} ago</span>
                                                            </div>
                                                            <div className="absolute left-0 top-0 w-full h-full before:absolute bg-slate-300"></div>
                                                          </div>
                                                          : <div className="rounded-full w-full overflow-hidden relative flex items-center justify-center mt-3 mb-2 py-3 cursor-pointer">
                                                            <a href={`/productdetail/${item.raffle_id}`}>
                                                              <div className="relative z-10 uppercase tracking-wider font-bold text-xs md:text-sm text-center px-1 min-h-[16px] md:min-h-[20px] text-white font-play">
                                                                <span className="truncate">Enter now</span>
                                                              </div>
                                                              <div className="absolute z-0 left-0 top-0 w-full h-full before:absolute bg-blue-500"></div>
                                                            </a>
                                                          </div>
                                                      }

                                                      {
                                                        item.winner.display_name !== ''
                                                          ? <div className="flex flex-nowrap items-center justify-center text-xs sm:text-sm font-bold pb-1 lg:pt-2 w-full font-heavy">
                                                            <span className="text-black whitespace-nowrap uppercase">Won by</span>
                                                            <a href="/mw/gc.business" className="flex items-center ml-1 overflow-hidden">
                                                              <span className="relative mr-1">
                                                                <img className="inline-block rounded-full w-7 h-7" src={require('../../asstes/img/personal.png').default} alt="" width="28" height="28" loading="lazy" />
                                                              </span>
                                                              <span className="text-blue-500 whitespace-nowrap text-ellipsis overflow-hidden">{item.winner.display_name}</span>
                                                            </a>
                                                          </div>
                                                          : <div className="text-center text-xs font-bold uppercase pt-1 pb-1 text-slate-200">
                                                            Join {item.participants.length} MetaWinners
                                                          </div>
                                                      }


                                                      <div className="flex items-center">
                                                        <h3 className="text-xs relative mr-2 w-full text-center text-black/60">
                                                          <span>Closed</span>
                                                          <span> {item?.close_time && getDetailClosedDate(item?.close_time)}</span>
                                                        </h3>
                                                      </div>
                                                    </div>
                                                  </article>
                                                })
                                              }
                                            </>

                                          </div>
                                        </div>
                                        {/* <button type="button" className="text-sm tracking-widest mt-4 mb-3 p-2 block mx-auto transition-opacity hover:opacity-90 disabled:opacity-40"> Load more </button> */}
                                      </>
                                  }
                                </div>
                                : <>
                                  {
                                    loading
                                      ? ''
                                      : <div className="text-center w-full py-4">
                                        <h2 className="text-center w-full px-3 lg:text-xl py-3 text-white animate-fade-in font-heavy">
                                          <span>Nothing to display</span>
                                        </h2>
                                      </div>
                                  }
                                </>

                            }
                          </>
                          : selectTypeVal === 'owned'
                            ? <div className={['mt-4 lg:mt-6', loading ? selectTypeVal === 'owned' ? "cordList-enter-to cordList-enter-active" : 'cordList-leave-to cordList-leave-active' : ''].join(' ')}>
                              {
                                loading
                                  ? ''
                                  : <>
                                    <div>
                                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 lg:gap-4 lg:grid-cols-5 mb-5">
                                        <article className="flex flex-col bg-white rounded-xl xl:rounded-2xl overflow-hidden transition-all duration-200 lg:hover:scale-[1.03] relative group">
                                          <figure className="w-full aspect-square rounded-xl overflow-hidden relative z-0">
                                            <div className="relative w-full h-full">
                                              <img className="transition-all z-10 relative object-cover h-full w-full block relative z-10 opacity-100" src="https://i.seadn.io/gae/gq_xL8Z6dHtTJLWlz5x5GwotKqn8RKtyeKotxRv3V4mPWoP4KLQwRktIHQNg9mYFiiFcolSKSmnMzHoHprMhBGfrOaHQKaq3RoudUAE?fit=max&amp;w=350&amp;auto=format" alt="Image of Monomyth #9654" width="350" height="350" loading="lazy" decoding="async" draggable="false" />
                                              <div className="absolute z-0 animate-pulse w-full h-full rounded-xl top-0 left-0 p-3 after:flex after:h-full after:rounded-lg after:bg-gray-200 invisible"></div>
                                            </div>
                                          </figure>
                                          <div className="px-2 py-2 xl:px-3">
                                            <div className="flex flex-col">
                                              <div className="grow overflow-hidden">
                                                <div className="flex">
                                                  <h2 className="text-sm xl:text-base text-slate-100 font-bold whitespace-nowrap text-ellipsis overflow-hidden">Monomyth</h2>
                                                  <span className="icon-ico-badge text-blue-500 text-base xl:text-lg relative -top-[2px]"></span>
                                                </div>
                                                <h3 className="text-sm xl:text-base text-slate-800 font-bold relative -mt-1 xl:-mt-2">#9654</h3>
                                              </div>
                                              <div className="text-slate-100 flex justify-start items-center text-sm pb-1">
                                                <span className="whitespace-nowrap mr-1">Last sale:</span>
                                                <div className="flex justify-end">
                                                  <div className="flex items-center justify-end mr-2">
                                                    <img src="https://metawin.com/_nuxt/ico-eth-opacity-black.1761ffc0.svg" alt="ohmynft logo" width="11" height="18" className="inline-block mr-[2px]" />
                                                    <span className="text-slate-800 font-bold text-ellipsis overflow-hidden">0.03</span>
                                                  </div>
                                                  <span className="text-slate-100 text-ellipsis overflow-hidden">$47.5</span>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </article>
                                      </div>
                                    </div>
                                    <button type="button" className="text-sm tracking-widest mt-4 mb-3 p-2 block mx-auto transition-opacity hover:opacity-90 disabled:opacity-40 bg-tranparent"> Load more </button>
                                  </>
                              }
                            </div>
                            : selectTypeVal === 'wins'
                              ? <div className={['mt-4 lg:mt-6', loading ? selectTypeVal === 'wins' ? "cordList-enter-to cordList-enter-active" : 'cordList-leave-to cordList-leave-active' : ''].join(' ')}>
                                {
                                  loading
                                    ? ''
                                    : <>

                                      {
                                        CompletedData && CompletedData.length > 0 ?
                                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 lg:gap-4 lg:grid-cols-5 mb-5">
                                            {
                                              CompletedData.map((ele: RaffleItemData, index) => {
                                                return (
                                                  <a href={`/productdetail/${ele.id}`} className="">
                                                    <WinsCard key={index} cardData={ele}></WinsCard>
                                                  </a>
                                                )
                                              })
                                            }
                                          </div>
                                          :
                                          <div className="text-center w-full py-4">
                                            <h2 className="text-center w-full px-3 lg:text-xl py-3 text-white animate-fade-in font-heavy">
                                              <span>Nothing to display</span>
                                            </h2>
                                          </div>
                                      }

                                    </>
                                }
                              </div>
                              : <div className={['mt-4 lg:mt-6', loading ? selectTypeVal === '' ? "cordList-enter-to cordList-enter-active" : 'cordList-leave-to cordList-leave-active' : ''].join(' ')}>
                                {
                                  loading
                                    ? ''
                                    : <>
                                      <div>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 lg:gap-4 lg:grid-cols-5 mb-5">
                                          <article className="gtm-card-competition flex flex-col rounded-xl xl:rounded-2xl transition-all duration-200 lg:hover:scale-[1.03] relative cursor-pointer bg-white">
                                            <figure className="w-full aspect-square rounded-xl overflow-hidden relative z-0 group -top-[0.5px]">
                                              <a href="/productdetail/1119" className="">
                                                <div className="relative w-full h-full">
                                                  <img className="transition-all z-10 relative object-cover h-full w-full block relative z-10 opacity-100" src="https://i.seadn.io/gae/1QX69oBVNdNG6CoLaA9OKRTfjJB0uCES7JI8CUNYH9y7JD4HGeu7RmoBWC17jyfOlPhU8dXkgFc8lv0O7XFf-by5QkARiIvaP2_l4ck?fit=max&amp;w=350&amp;auto=format" alt="Image of DeadFellaz" width="350" height="350" loading="lazy" decoding="async" draggable="false" />
                                                  <div className="absolute z-0 animate-pulse w-full h-full rounded-xl top-0 left-0 p-3 after:flex after:h-full after:rounded-lg after:bg-gray-200 invisible"></div>
                                                </div>
                                                <span className="inline-block font-bold absolute bottom-1 left-1 z-10 rounded-full px-2 text-slate-100 bg-white text-sm"> #3685</span></a>
                                            </figure>
                                            <div className="px-2 py-2 xl:px-3 overflow-hidden">
                                              <div className="flex flex-col">
                                                <div className="grow overflow-hidden">
                                                  <div className="flex items-center h-4">
                                                    <h2 className="text-sm xl:text-base font-bold whitespace-nowrap text-ellipsis overflow-hidden leading-tight mb-0 text-slate-100">DeadFellaz</h2>
                                                    <span className="icon-ico-badge text-blue-500 text-base xl:text-lg"></span>
                                                  </div>
                                                  <div className="mt-2 text-slate-800">
                                                    <div className="flex items-center justify-center">
                                                      <div className="flex items-center justify-center">
                                                        <span className="whitespace-nowrap pr-1 text-ellipsis overflow-hidden text-xs xl:text-sm"> Value: </span>
                                                        <span className="font-bold text-xl xl:text-2xl"> $1,212</span>
                                                      </div>
                                                      <span className="w-full max-w-[38px] xl:max-w-[44px] h-2 shrink-1"></span>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="rounded-full w-full overflow-hidden relative flex items-center justify-center my-3 py-3">
                                                <div className="uppercase tracking-wider z-10 font-bold text-xs md:text-sm text-center px-1 text-white">
                                                  <span>Ended 3 hours ago</span>
                                                </div>
                                                <div className="absolute left-0 top-0 w-full h-full before:absolute bg-slate-300"></div>
                                              </div>
                                              <div className="flex flex-nowrap items-center justify-center text-xs sm:text-sm font-bold pb-1 lg:pt-2 w-full">
                                                <span className="text-slate-200 whitespace-nowrap uppercase">Won by</span>
                                                <a href="/mw/nftgreedy" className="flex items-center ml-1 overflow-hidden"><span className="relative mr-1">
                                                  <img className="inline-block rounded-full w-7 h-7" src="https://content.prod.platform.metawin.com/avatars/template/default.png" alt="" width="28" height="28" loading="lazy" /></span><span className="text-blue-500 whitespace-nowrap text-ellipsis overflow-hidden">Nftgreedy</span></a>
                                              </div>
                                              <div className="text-center text-xs font-bold uppercase pt-1 pb-1 text-slate-200">
                                              </div>
                                              <div className="flex items-center">
                                                <h3 className="text-xs relative mr-2 w-full text-center text-slate-200"><span>Closed</span><span> today</span></h3>
                                              </div>
                                            </div>
                                          </article>
                                        </div>
                                      </div>
                                      <button type="button" className="text-sm tracking-widest mt-4 mb-3 p-2 block mx-auto transition-opacity hover:opacity-90 disabled:opacity-40"> Load more </button>
                                    </>
                                }
                              </div>

                      }
                    </>
                }

              </section>
          }

        </div>
      </main>
    </>
  );
}

export default MWPage;