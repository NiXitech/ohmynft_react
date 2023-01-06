/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-no-target-blank */
import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { useAccount, useContractWrite, useNetwork, usePrepareContractWrite, useSwitchNetwork, useWaitForTransaction } from "wagmi"
import { getPrice, getRaffleActivity, getRaffleInfo } from "../../api/services/http/api"
import { NxWeb3 } from "../../libs/NxWeb3"
import useDebounce from "../../libs/usehooks"
import { ActivityIsClosed, getDetailClosedDate, getDollar, getQueryVariable, TimeInterval, updateUrl } from "../../libs/userAgent"
import { ActivityItem, CallBackData, ParticipantItem, PriceStructureItem, RaffleItemData } from "../../types/types"
import useStateHook from "../store"
import { ABIData } from '../../libs/abi';
import { BigNumber, ethers } from "ethers"
import { sanitizeHex } from "../../helpers/utilities"
import { convertStringToHex } from "../../helpers/bignumber"
import { writeContract } from "@wagmi/core"
import { toast } from "react-toastify"

interface MintParamsType {
  entryId: number,
  priceOrd: number,
  price: any,
  contractddress: string,
  count: any,
  collection?: any,
  tokenIdUsed?: number
}

/* eslint-disable jsx-a11y/img-redundant-alt */
const Competition = (): JSX.Element => {
  const [state, actions] = useStateHook();
  let { id } = useParams();
  const [selectType, setSelectType] = useState('')
  const { isConnected, address } = useAccount()
  const [infoData, setInfoData] = useState<RaffleItemData>()
  const [activityData, setActivityData] = useState<ActivityItem[]>([])
  const [loading, setLiading] = useState(true)
  const [price, setPrice] = useState({
    usd: 0
  })







  useEffect(() => {

    const query = getQueryVariable('tab')
    if (query) {
      if (query === 'participants') {
        setSelectType(query)
      } else {
        window.open(`/participants`, '_self')
      }
    } else {
      if (query === '') {
        window.open(`/participants`, '_self')
      }
    }
    actions.setGlobalLoading()
    getRaffleInfoFun()
    getPriceFun()
    getRaffleActivityFun()
  }, [])


  const getPriceFun = async () => {
    try {
      const result: CallBackData = await getPrice() as any
      setPrice(result.data.price)

    } catch (error) {

    }
  }
  const selectTypeFun = (type: any) => {
    setSelectType(type)
    updateUrl('tab', type)

  }

  const getRaffleInfoFun = async () => {
    try {
      const result: CallBackData = await getRaffleInfo(Number(id)) as any
      if (result.code === 200) {
        setInfoData(result.data)
      }
    } catch (error) {
      console.log('%c🀁 error', 'color: #ff0000; font-size: 20px;', error);
    }
    setLiading(false)

  }

  const getRaffleActivityFun = async () => {
    try {
      const result: CallBackData = await getRaffleActivity({
        raffleId: Number(id),
        skip: 0,
        take: 100000000
      }) as any
      if (result.code === 200 && result.data !== null) {
        setActivityData(result.data)
      }
    } catch (error) {
    }
  }

  const getOldCount = (onePrice: string, currentPrice: string) => {
    const count = Number(currentPrice) / Number(onePrice);
    return Math.round(count)
  }

  const [mintParams, setMintParams] = useState<MintParamsType>({
    entryId: 0,
    priceOrd: 0,
    price: 0,
    contractddress: '',
    count: 0,
    collection: '0x0000000000000000000000000000000000000000',
    tokenIdUsed: 0
  })

  const debouncedTokenId = useDebounce(mintParams, 0)


  const {
    config,
    error: prepareError,
    isError: isPrepareError,
    isSuccess: perSuccess
  } = usePrepareContractWrite({
    address: debouncedTokenId.contractddress,
    abi: [
      {
        name: 'buyEntry',
        type: 'function',
        stateMutability: 'payable',
        inputs: [
          { internalType: "uint256", name: "_raffleId", type: "uint256" },
          { internalType: "uint256", name: "_id", type: "uint256" },
          { internalType: "address", name: "_collection", type: "address" },
          { internalType: "uint256", name: "_tokenIdUsed", type: "uint256" },
        ],
        outputs: [],
      },
    ],
    functionName: 'buyEntry',
    args: [BigNumber.from(debouncedTokenId.entryId), BigNumber.from(debouncedTokenId.priceOrd), debouncedTokenId.collection, BigNumber.from(0)],
    overrides: {
      from: address,
      value: ethers.utils.parseEther(JSON.stringify(debouncedTokenId.price)),
    },
    chainId: 5,
    // cacheTime: 2_000,
    // enabled: Boolean(debouncedTokenId.contractddress),
    // staleTime: 2_000,
    onSuccess(data: any) {
      console.log('Success', data)
    },
    onError(error: any) {
      console.log('Error1212122211', error.message)
    },
  })
  const { data, error, isError, write, isLoading } = useContractWrite({
    ...config,
    onSuccess(data: any) {
      console.log('Success useContractWrite', data)
      toast.success('The transaction is successful, waiting for block confirmation！')
    },
    onError(error: any) {
      console.log('Error1212122211 useContractWrite', error.message)
      toast.error(error.message)
      setMintParams({
        ...mintParams,
        contractddress: ''
      })
    },
  })



  const CONTRACT_ADDRESS = '0x4928eF1e171aAe72A6784a0AA8308D2a90E49DE2'



  // const { isSuccess: txSuccess, error: txError } = useWaitForTransaction({
  //   confirmations: 1,
  //   hash: data?.hash,
  // });

  const { chain } = useNetwork()
  const { chains, pendingChainId, switchNetwork } =
    useSwitchNetwork()
  const mint = async (entryId: number, priceOrd: number, price: number, contractddress: string, count: number) => {
    if (!isConnected) {
      actions.openConnect()
      return
    }
    console.log('%c🀆 ', 'color: #917399; font-size: 20px;', chain);
    if (chain?.id !== 5) {
      switchNetwork?.(5)
    }
    setMintParams(
      {
        ...mintParams,
        entryId,
        priceOrd,
        price,
        contractddress,
        count
      }
    )


    // setTimeout(() => {
    //@ts-ignore
    write()
    // }, 500)



    // // const useInfo = LStorage.get('LastAuthUser')
    // // if (isLoading) return;
    // NxWeb3.instance.init()

    // // if (NxWeb3.instance.connectType === 1) {

    // // const result = await NxWeb3.instance.preMint(1);
    // const result = await NxWeb3.instance.publicMint(entryId, priceOrd, price, contractddress, address);
    // if (result.type) {
    //   // try {
    //   //   await submitBuyEntry({
    //   //     display_name: useInfo.name,
    //   //     raffle_id: entryId,
    //   //     entry_count: count,
    //   //     tx_hash: result.data.transactionHash
    //   //   })
    //   // } catch (error) {
    //   //   console.log('%c🀄︎ error', 'color: #607339; font-size: 20px;', error);

    //   // }
    // } else {

    //   console.log('%c🀃 ', 'color: #ffa280; font-size: 20px;', result.data.message);
    // }

  }
  return (
    <>
      <main className="flex flex-wrap grow px-2 pb-10 lg:px-8 transition-all duration-300 page-enter:opacity-0 page-enter:-translate-y-4 layout-enter:opacity-0 layout-enter:-translate-y-4 pt-16">
        <div className="w-full mx-auto 5xl:container pt-8">
          {
            loading
              ? <div className="w-20 h-20 fixed top-1/2 left-1/2 z-50 -translate-y-1/2 -translate-x-1/2 bg-slate-900 p-3 rounded-full shadow-md fade-in-delayed">
                <img className="inline-block spinner-border animate-spin-slowing" src={require('../../asstes/img/spinner-blue.svg').default} alt="" width="124" height="124" />
              </div>
              : <>
                {
                  infoData
                    ? <section className="animate-fade-in max-w-6xl mx-auto relative min-h-[50vh]">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 mt-1 md:mt-2">
                        <div className="block lg:self-start md:col-span-5">
                          <div className="border-2 border-cyan-500/28 px-2 py-2 rounded-xl bg-lightblue/15">
                            <article className="flex flex-col bg-slate-800 rounded-xl xl:rounded-2xl relative group">
                              <figure className="w-full aspect-square rounded-xl overflow-hidden relative z-0 max-w-[500px] mx-auto">
                                <div className="relative w-full h-full border-6 border-cyan-500 rounded-xl">
                                  <img className="transition-all z-10 relative object-cover h-full w-full block relative z-10 opacity-100 rounded-4" src={infoData?.prize.image_url} alt={`Image of ${infoData?.prize.name}`} width="650" height="650" />
                                  <div className="absolute z-0 animate-pulse w-full h-full rounded-xl top-0 left-0 p-3 after:flex after:h-full after:rounded-lg after:bg-gray-200 invisible">
                                  </div>
                                </div>
                              </figure>
                            </article>
                            <div className="py-3 mb-1 px-3">
                              <h3 className="uppercase text-sm tracking-wider md:text-base pb-3 mb-1 font-play">Description</h3>
                              <p className="text-slate-100 text-sm font-medium">{infoData?.description} </p>
                            </div>
                          </div>
                          <div className="rounded-xl lg:rounded-2xl mt-2 md:mt-3 border-2 border-cyan-500/28 bg-lightblue/15">
                            <div>
                              <nav className="flex justify-center md:justify-start  md:px-0 font-play">
                                <button className={["tab-item uppercase text-sm tracking-wider py-5 grow md:grow-0 md:max-w-none md:px-6 md:text-base relative overflow-hidden transition-all after:bg-blue-500 after:absolute after:w-full after:h-1 after:left-0 after:bottom-0 after:rounded-t-full after:transition-all hover:opacity-100  rounded-rt-xl lg:rounded-rt-2xl after:translate-y-3 ", selectType === '' ? 'border-r-2 -top-1 border-b-none opacity-100 !bg-img-transparent' : 'opacity-70'].join(' ')}
                                  onClick={() => { selectTypeFun('') }}><span>Activity</span>
                                </button>
                                <button className={["tab-item uppercase text-sm tracking-wider py-5 grow md:grow-0 md:max-w-none md:px-6 md:text-base overflow-hidden relative transition-all after:bg-blue-500 after:absolute after:w-full after:h-1 after:left-0 after:bottom-0 after:rounded-t-full after:transition-all hover:opacity-100  after:translate-y-3 rounded-rt-xl lg:rounded-rt-2xl rounded-lt-xl lg:rounded-lt-2xl", selectType === 'participants' ? 'border-r-2 border-l-2 -top-1 border-b-none opacity-100 !bg-img-transparent' : 'opacity-70'].join(' ')}
                                  onClick={() => { selectTypeFun('participants') }}
                                ><span>Participants</span><span> ({infoData?.participants.length})</span></button>
                                <div className="tab-item spec" style={{
                                  flex: 1
                                }}></div>
                              </nav>
                              <div className="relative">
                                {
                                  selectType === ''
                                    ?
                                    <section className="px-4 max-h-[400px] overflow-y-auto">
                                      {
                                        activityData.length > 0
                                          ?
                                          activityData.map((item, index) => {
                                            return <div key={index} className="border-b border-slate-500 last-of-type:border-none py-2 hover:bg-slate-700 animate-fade-in flex items-center justify-between">
                                              <a href={`/mw/${item.display_name}`} className="flex items-center overflow-hidden mr-3 group min-h-[48px]">
                                                <span className="relative inline-block mr-3">
                                                  <img className="inline-block rounded-full rounded-full w-12 h-12 border-2 border-transparent group-hover:border-gray-300 transition-all" src={require('../../asstes/img/default_personal.png').default} alt="" width="28" height="28" loading="lazy" /></span>
                                                <h3 className="text-ellipsis overflow-hidden group-hover:text-gray-300 transition-colors truncate">{item.display_name}
                                                  <span className="uppercase tracking-wider block text-xs text-blue-500 group-hover:text-blue-400">{item.entry_info.count} {item.entry_info.count > 1 ? "entries" : "entry"}</span>
                                                </h3>
                                              </a>
                                              <div>
                                                <a href={`https://goerli.etherscan.io/tx/${item.entry_info.tx_hash}`} target="_blank" className="text-blue-500 hover:text-blue-400" rel="noreferrer">
                                                  <div className="block text-right text-sm whitespace-nowrap">
                                                    {TimeInterval(item.create_time)} ago
                                                    <span className="icon2-ico-share inline-block ml-[1px] top-[2px] relative text-sm"></span>
                                                  </div></a>
                                              </div>
                                            </div>
                                          })
                                          : <div className="text-center w-full py-4">
                                            <h2 className="text-center w-full px-3 lg:text-xl py-3 text-white animate-fade-in font-heavy">
                                              <span>Nothing to display</span>
                                            </h2>
                                          </div>
                                      }
                                      {/* <button type="button" className="text-sm tracking-widest py-5 block w-full transition-opacity hover:opacity-90 disabled:opacity-40 border-t border-slate-500"> Load more </button> */}
                                    </section>
                                    : <section className="px-4 max-h-[400px] overflow-y-auto">
                                      {
                                        infoData?.participants && infoData?.participants.length > 0
                                          ?
                                          infoData?.participants.map((item: ParticipantItem, index) => {
                                            return <div key={index} className="border-b border-slate-500 last-of-type:border-none py-2 hover:bg-slate-700 animate-fade-in flex items-center justify-between">
                                              <a href={`/mw/${item.display_name}`} className="flex items-center overflow-hidden mr-3 group min-h-[48px]">
                                                <span className="relative inline-block mr-3">
                                                  <img className="inline-block rounded-full w-12 h-12 border-2 border-transparent group-hover:border-gray-300 transition-all" src={require('../../asstes/img/default_personal.png').default} alt="" width="48" height="48" loading="lazy" />
                                                </span>
                                                <h3 className="text-ellipsis overflow-hidden group-hover:text-gray-300 transition-colors leading-tight truncate">{item.display_name}</h3>
                                              </a>
                                              <div>
                                                <span className="text-sm text-blue-500 tracking-wider uppercase whitespace-nowrap">{item.buy_entry_count} {item.buy_entry_count > 1 ? "entries" : "entry"}</span>
                                              </div>
                                            </div>
                                          })

                                          : <div className="text-center w-full py-4">
                                            <h2 className="text-center w-full px-3 lg:text-xl py-3 text-white animate-fade-in font-heavy">
                                              <span>Nothing to display</span>
                                            </h2>
                                          </div>
                                      }

                                      {/* <button type="button" className="text-sm tracking-widest py-5 block w-full transition-opacity hover:opacity-90 disabled:opacity-40 border-t border-slate-500"> Load more </button> */}
                                    </section>
                                }

                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="w-full md:col-span-7">
                          <div className="border-l-2 border-slate-500"
                            style={{
                              background: 'linear-gradient(to right, rgba(63,139,255,.24), rgba(89,235,255,0))',
                            }}
                          >
                            <div className="flex flex-col px-2 py-4 md:px-6 ">
                              <div className="grid overflow-hidden grid-cols-12 gap-2">
                                <div className="flex-col col-span-9">
                                  <div className="flex item-center">
                                    <h2 className="text-xl md:text-3xl text-white font-bold whitespace-nowrap text-ellipsis overflow-hidden font-black">{infoData?.prize.name}</h2>
                                    <span className="icon2-ico-badge text-blue-500 text-base lg:text-xl relative ml-1 top-1"></span>
                                  </div>
                                  <h3 className="text-base md:text-xl lg:text-2xl text-gold relative mr-1 font-heavy pt-2">#{infoData?.prize.token_id}</h3>
                                </div>
                                <div className="flex-col col-span-3">

                                  <div className="flex  justify-start text-white w-full">
                                    <span className="text-xs xl:text-sm whitespace-nowrap pr-1 text-ellipsis overflow-hidden text-white/60">Value:</span>
                                  </div>
                                  <div className="flex justify-start w-full">
                                    <span className="font-bold text-base md:text-2xl lg:text-3xl font-heavy">${infoData?.prize.value && getDollar(infoData?.prize.value, price)}</span>
                                  </div>

                                </div>
                              </div>
                            </div>
                            {
                              infoData.winner.display_name !== ''
                                ? ''
                                : <div
                                  className="px-2 py-1 md:px-6 "
                                  style={{
                                    background: 'linear-gradient(to right, rgba(63,139,255,.24), rgba(89,235,255,0))',
                                  }}
                                >
                                  <div className="animate-fade-in truncate text-white text-xs md:text-base uppercase tracking-wider flex items-center">
                                    <span className="icon2-ico-hourglass text-lg text-white mr-2"></span>
                                    <span className="">Closes: {infoData?.close_time && getDetailClosedDate(infoData?.close_time)}</span>
                                  </div>

                                  <div className="text-white text-xs md:text-base uppercase tracking-wider flex items-center">

                                  </div>
                                </div>
                            }

                          </div>

                          {
                            // infoData?.winner.display_name !== '' && infoData?.winner.tx_hash !== ''
                            infoData.winner.display_name !== ''
                              ? <div className="px-2 py-4 md:px-4 border-2 border-cyan-500/28 bg-lightblue/15 rounded-xl lg:rounded-2xl mt-2 md:mt-3 font-heavy">
                                <div>
                                  <article className="animate-fade-in">
                                    <div className="text-center block">
                                      <h1 className="text-2xl lg:text-3xl uppercase tracking-widest text-center animate-slide-down-fade-in01s font-play">Competition ended</h1>
                                      <a href={`https://goerli.etherscan.io/tx/${infoData.winner.tx_hash}`} target="_blank" className="inline-block text-blue-500 hover:text-blue-400 mt-3">
                                        <div className="text-sm whitespace-nowrap">
                                          {TimeInterval(infoData.close_time)} ago
                                          <span className="icon2-ico-share inline-block ml-[1px] top-[2px] relative text-sm"></span>
                                        </div></a>
                                      <div className="flex flex-nowrap items-center justify-center my-3 w-full">
                                        <span className="text-white whitespace-nowrap uppercase text-xs sm:text-sm font-bold">Won by</span>
                                        <a href={`/mw/${infoData.winner.display_name}`} className="flex items-center ml-1 text-xs sm:text-sm font-bold group">
                                          <img className="inline-block mr-1 rounded-full w-7 h-7 lg:w-10 lg:h-10 border-2 border-transparent group-hover:border-gray-300 transition-all" src={require('../../asstes/img/default_personal.png').default} alt="" width="28" height="28" loading="lazy" decoding="async" />
                                          <span className="text-blue-500 text-xs sm:text-sm font-bold whitespace-nowrap text-ellipsis overflow-hidden group-hover:text-blue-400 transition-colors">{infoData.winner.display_name}
                                          </span>
                                        </a>
                                      </div>
                                      <a href="/" className="text-md py-4 px-8 bg-blue-400 text-white rounded-full tracking-widest uppercase hover:bg-blue-500 transition-all focus:bg-blue-500 relative disabled:opacity-40 disabled:hover:bg-blue-500 inline-block mx-auto mt-3 font-play"> Browse competitions </a>
                                    </div>
                                  </article>
                                </div>
                              </div>
                              : <div className="px-2 py-4 md:px-4 rounded-xl lg:rounded-2xl mt-2 md:mt-3  border-2 border-cyan-500/28 bg-lightblue/15">
                                <div>
                                  <article className="animate-fade-in">
                                    <div className="text-center mb-4 block">
                                      <h1 className="text-2xl lg:text-3xl uppercase tracking-widest text-left font-play">Enter competition</h1>
                                    </div>
                                    {/* <div className="text-sm lg:text-base text-center">
      <p>You used <span className="text-blue-500">0</span> entries</p>
    </div> */}
                                    <div className="mt-6">
                                      <div className="grid gap-2 lg:gap-4 relative z-0 grid-cols-2">
                                        {
                                          infoData?.price_structure.map((ele: PriceStructureItem, index: number) => {
                                            return <>
                                              {
                                                index === infoData?.price_structure.length - 1
                                                  ? <div key={index} className="gtm-card-package relative overflow-hidden transition-all cursor-pointer group hover:-translate-y-[2px] p-0 rounded-xl last:odd:col-span-2 font-heavy" >
                                                    <img src={require('../../asstes/img/ribbon-max-value.png').default} alt="" width="156" height="105" className="absolute top-0 left-0 z-20 w-[190px] h-[80px] lg:w-[220px] lg:h-[93px]" />
                                                    <article className="text-center rounded-xl overflow-hidden transition-all flex flex-col px-2 pb-5 pt-10 relative z-20 h-full cursor-pointer group-hover:bg-lightblue">

                                                      <div className="relative mx-auto whitespace-nowrap font-play">
                                                        <h3 className="inline-block mb-0 text-3xl relative mr-2 -top-4 text-slate-200 -rotate-[15deg] after:absolute after:h-[3px] after:left-0 after:w-full after:bg-red-700 after:z-10 after:top-1/2 after:-mt-[2px]">{getOldCount(infoData?.price_structure[0].price, ele.price)}</h3>
                                                        <h2 className="text-6xl mb-1 inline-block text-transparent bg-clip-text bg-gradient-to-b from-gold-100 to-gold-500">{ele.entry_count}</h2>
                                                      </div>
                                                      <span className="uppercase tracking-widest text-xl">entries</span>
                                                      <button className="text-sm py-3 px-6 bg-blue-500 text-white rounded-full tracking-widest uppercase group-hover:bg-blue-300 transition-all flex justify-center items-center my-4 relative bg-blue-500"
                                                        onClick={() => {
                                                          mint(infoData.raffle_id, index + 1, Number(ele.price), infoData.contract_address, ele.entry_count)
                                                        }}
                                                      >

                                                        <span className="icon-ico-eth inline-block text-2xl mr-1"></span>
                                                        <span className="font-bold text-base">{ele.price}</span>
                                                      </button>

                                                      <div>
                                                        <span className="block uppercase tracking-wider text-sm font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-b from-gold-100 to-gold-500 transition-all"> Includes {ele.entry_count - getOldCount(infoData?.price_structure[0].price, ele.price)} free entries</span>
                                                      </div>
                                                      <div>
                                                        <span className="block text-xs mt-1 font-medium">Gas Saving = {ele.entry_count}x</span>
                                                      </div>
                                                    </article>

                                                    <img src={require('../../asstes/img/microchip.png').default} alt="" className="absolute top-0 left-0  w-full h-full z-10" />
                                                  </div>
                                                  : <div key={index} className="gtm-card-package relative overflow-hidden transition-all cursor-pointer group hover:-translate-y-[2px] p-0 rounded-xl last:odd:col-span-2 font-heavy">
                                                    {
                                                      ele.recommended
                                                        ? <img src={require('../../asstes/img/ribbon-recommended-value.png').default} alt="" width="156" height="105" className="absolute top-0 left-0 z-30 w-[190px] h-[80px]" />
                                                        : ''
                                                    }

                                                    <article className="text-center rounded-xl overflow-hidden transition-all flex flex-col px-2 pb-5 pt-10 relative z-20 h-full cursor-pointer group-hover:bg-lightblue bg-lightblue-500">

                                                      <div className="relative mx-auto whitespace-nowrap">
                                                        {
                                                          index !== 0
                                                            ? <h3 className="inline-block mb-0 text-3xl relative mr-2 -top-4 text-slate-200 -rotate-[15deg] after:absolute after:h-[3px] after:left-0 after:w-full after:bg-red-700 after:z-10 after:top-1/2 after:-mt-[2px]">{getOldCount(infoData?.price_structure[0].price, ele.price)}</h3>
                                                            : ''
                                                        }
                                                        <h2 className="text-6xl mb-1 inline-block font-play">{ele.entry_count}</h2>
                                                      </div>
                                                      <span className="uppercase tracking-widest text-xl">entry</span>
                                                      <button className="text-sm py-3 px-6 bg-blue-500 text-white rounded-full tracking-widest uppercase group-hover:bg-blue-300 transition-all flex justify-center items-center my-4 relative bg-blue-500"
                                                        onClick={() => {
                                                          mint(infoData.raffle_id, index + 1, Number(ele.price), infoData.contract_address, ele.entry_count)
                                                        }}
                                                      >

                                                        <span className="icon-ico-eth inline-block text-2xl mr-1"></span>
                                                        <span className="font-bold text-base">{ele.price}</span>
                                                      </button>
                                                      {
                                                        index !== 0
                                                          ? <>
                                                            <div>
                                                              <span className="block uppercase tracking-wider text-sm font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-b from-gold-100 to-gold-500 transition-all"> Includes {ele.entry_count - getOldCount(infoData?.price_structure[0].price, ele.price)} free entries</span>
                                                            </div>
                                                            <div>
                                                              <span className="block text-xs mt-1 font-medium">Gas Saving = {ele.entry_count}x</span>
                                                            </div>
                                                          </>
                                                          : ''
                                                      }
                                                    </article>
                                                  </div>
                                              }
                                            </>
                                          })
                                        }
                                      </div>
                                      <p className="text-center mt-4 text-slate-100 text-sm text-white/80 font-medium">All entries require gas.</p>
                                      <p className="text-center mt-4 text-slate-100 text-sm text-white/80 font-medium">Smart Contract v1.2 Update:<br className="lg:hidden" /> <span className="text-white font-heavy">Multi Buy Gas Amount = Single Entry Gas Amount</span></p>
                                    </div>
                                  </article>
                                </div>
                              </div>
                          }
                          <div className="px-3 py-4 md:px-4 border-2 border-cyan-500/28 bg-lightblue/15 rounded-xl lg:rounded-2xl my-4">
                            <div className="text-white text-xs md:text-sm uppercase tracking-wider text-center text-ellipsis overflow-hidden font-heavy">
                              <a href={`https://goerli.etherscan.io/address/${infoData?.contract_address}`} className="hover:text-gray-300 transition-colors flex content-center items-center justify-center" target="_blank" rel="noreferrer"><span className="text-blue mr-1">Contract:</span>&nbsp; <span className="inline-block max-w-sm text-ellipsis overflow-hidden mr-1.5">{infoData?.contract_address}</span><span className="icon2-ico-share inline-block relative"></span></a>
                            </div>
                          </div>
                          <div className="px-2 pt-4 py-1 md:px-4 border-2 border-cyan-500/28 bg-lightblue/15 rounded-xl lg:rounded-2xl mt-2 md:mt-3">
                            <div className="text-center">
                              <span className="text-xs block uppercase tracking-widest font-heavy">Share this competition</span>
                              <ul className="flex justify-center">
                                <li className="inline-block">
                                  <a href={`http://twitter.com/share?text=Check out this competition on ohmynft.space ${infoData.prize.name.trim()}&url=https://ohmynft.space/competition/${infoData.raffle_id}&hashtags=ohmynft,nft`} title="Share on Twitter" className="inline-block p-4" target="_blank" rel="noopener noreferrer">
                                    <span className="icon-ico-twitter text-[22px]"></span>
                                  </a>
                                </li>

                              </ul>
                            </div>
                          </div>


                        </div>
                      </div>
                    </section>
                    : <div className="w-full mx-auto 5xl:container xl:pr-[300px]">
                      <section className="pt-32 pb-20 flex items-center justify-center flex-col py-10 grow">
                        <h1 className="text-3xl">Competition not found</h1>
                        <a href="/" className="text-md py-4 px-8 bg-blue-400 text-white rounded-full tracking-widest uppercase hover:bg-blue-500 transition-all focus:bg-blue-500 relative disabled:opacity-40 disabled:hover:bg-blue-500 mt-6 inline-block">Go to homepage</a>
                      </section>
                    </div>
                }
              </>
          }

        </div>
      </main>
    </>
  );
}

export default Competition;