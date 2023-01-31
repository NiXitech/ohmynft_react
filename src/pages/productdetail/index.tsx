/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import _ from "lodash";
import { useEffect, useState } from "react";
import './index.scss'
import { Progress, Divider, Button, InputNumber, Image, Row, Col } from 'antd';
import TwoColActivity from "../../components/twocolactivity";
import NFTCard from "../livenow/nftcard";
// import ConnectWallet from "../../components/connectWallet";
import useStateHook from '../store';
import { ActivityItem, CallBackData, RaffleItemData } from "../../types/types";
import { erc20ABI, useAccount, useContractRead, useContractWrite, useNetwork, usePrepareContractWrite, useSwitchNetwork, useWaitForTransaction } from "wagmi";
import { getPrice, getRaffleActivity, getRaffleInfo, getRaffleList, getUserInfo } from "../../api/services/http/api";
import { Link, useParams } from "react-router-dom"
import { BigNumber, ethers } from "ethers";
import useDebounce from "../../libs/usehooks";
import { toast } from "react-toastify";
import { LStorage } from "../../api/services/cooike/storage";
import { TimeInterval } from '../../libs/userAgent'

// const client = new Client('AAAAAAAAAAAAAAAAAAAAAMBDdwEAAAAA2BsYVQVgTt6DGuhpdjJBwkHDAMo%3Dch3BD48OENuJ5jEKU8QtTYVhGLKOzP3Mr9PZTLUO8Pn22DdH0K');

/* eslint-disable jsx-a11y/img-redundant-alt */
const ProductDetail = (): JSX.Element => {
  const [status, actions] = useStateHook();
  let { raffle_id } = useParams();
  const [subLoading, setSubLoading] = useState(false)
  const [state, setstate] = useState({
    cardtitle: 'Apple Watch Series 8 - Starlight Aluminum Case with Sport Loop',
    cardlist: [
      { cardName: 'up coming01', cardValue: '1', BUSD: '0.01', unit: 'BUSD', progress: 60 },
      { cardName: 'up coming02', cardValue: '2', BUSD: '0.01', unit: 'BUSD', progress: 60 }
    ]
  });
  const [Quantity, setQuantity] = useState(1)
  const [price, setPrice] = useState({
    usd: 0
  })
  const [infoData, setInfoData] = useState<RaffleItemData>()
  const [loading, setLiading] = useState(true)
  const [activityData, setActivityData] = useState<ActivityItem[]>([])
  const [selectType, setSelectType] = useState('')
  const [currentEntryLens, setCurrentEntryLens] = useState<number>(0)

  useEffect(() => {
    actions.setGlobalLoading()
    getRaffleInfoFun()
    getPriceFun()
    getRaffleActivityFun()
    getRaffleListFun()
  }, [])

  const getRaffleActivityFun = async () => {
    // setSubLoading(true)
    try {

      const result: CallBackData = await getRaffleActivity({
        raffleId: Number(raffle_id),
        offset: 0,
        limit: 100000000
      }) as any
      if (result.code === 200 && result.data !== null) {
        setActivityData(result.data)
      }
    } catch (error) {

    }
    setSubLoading(false)
  }

  const debouncedTokenId = useDebounce(infoData, 0)

  const { isConnected, address } = useAccount()



  // 合约查询
  const { data: totalSupplyData, refetch: refetchSupply } = useContractRead(
    {
      // @ts-ignore
      address: `${debouncedTokenId?.contract_address}`,
      abi: [
        {
          name: 'raffles',
          type: 'function',
          stateMutability: 'view',
          inputs: [
            { internalType: 'uint256', name: '', type: 'uint256' }
          ],
          outputs:
            [
              {
                internalType: "enum Manager.STATUS",
                name: "status",
                type: "uint8"
              },
              {
                internalType: "uint256",
                name: "totalEntries",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "maxEntries",
                type: "uint256"
              },
              {
                internalType: "address",
                name: "collateralAddress",
                type: "address"
              },
              {
                internalType: "uint256",
                name: "collateralId",
                type: "uint256"
              },
              {
                internalType: "address",
                name: "winner",
                type: "address"
              },
              {
                internalType: "uint256",
                name: "randomNumber",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "amountRaisedInBNB",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "amountRaisedInBUSD",
                type: "uint256"
              },
              {
                internalType: "address",
                name: "seller",
                type: "address"
              },
              {
                internalType: "uint256",
                name: "entriesLength",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "cancellingDate",
                type: "uint256"
              }
            ]


        }
      ],
      functionName: 'raffles',
      args: [BigNumber.from(debouncedTokenId?.raffle_id || 0)],
      chainId: 56,
      enabled: Boolean(debouncedTokenId?.contract_address),
      onSuccess(data: any) {
        // @ts-ignore
        setCurrentEntryLens(parseInt(Number(data.entriesLength._hex), 10))
      },
      onError(error: any) {
        console.log('Error1212122211', error)
      },
    })

  const getRaffleInfoFun = async () => {
    // setLiading(true)
    try {
      const result: CallBackData = await getRaffleInfo(Number(raffle_id)) as any
      if (result.code === 200) {
        setInfoData(result.data)
      }
    } catch (error) {
      console.log('%c🀁 error', 'color: #ff0000; font-size: 20px;', error);
    }
    setLiading(false)

  }

  useEffect(() => {

    if (isConnected && debouncedTokenId) {
      refetchSupply()
    }
  }, [debouncedTokenId, infoData])

  useEffect(() => {
    // setTimeout(() => {

    //   console.log('%c🀂 ', 'color: #e5de73; font-size: 20px;', new Date());
    //   refetchSupply?.()
    //   getRaffleActivityFun()
    //   getRaffleInfoFun()
    // }, 5000)

  })

  // 连接钱包
  const connectWallet = (item: any) => {
    actions.openConnect();
  }

  const [ApproveStatus, setApproveStatus] = useState<boolean>(false)
  const [EntryStatus, setEntryStatus] = useState<boolean>(false)

  const [mintLoading, setMintLoading] = useState<boolean>(false)

  const debouncedPrice = useDebounce({
    price: infoData?.price_structure.price_in_bnb || 0,
    raffleId: infoData?.raffle_id || 0,
    count: Quantity || 0,
    collection: '0x0000000000000000000000000000000000000000',
  }, 0)

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
    isSuccess: perSuccess
  } = usePrepareContractWrite({
    // @ts-ignore
    address: `${debouncedTokenId?.contract_address}`,
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
    args: [BigNumber.from(debouncedPrice.raffleId), BigNumber.from(debouncedPrice.count), '0x0000000000000000000000000000000000000000', BigNumber.from(0)],
    overrides: {
      from: address,
      value: ethers.utils.parseEther(JSON.stringify(0)),
      gasLimit: BigNumber.from('3100000')
    },
    chainId: 56,
    // cacheTime: 2_000,
    enabled: Boolean(debouncedPrice.count),
    // staleTime: 2_000,
    onSuccess(data: any) {
      console.log('Success', data)
    },
    onError(error: any) {
      console.log('Error1212122211', error.message)
    },
  })
  const { data: mintNft, error, isError, write: enterWrite, isLoading } = useContractWrite({
    ...config,
    onSuccess(data: any) {
      console.log('Success useContractWrite', data)
      setEntryStatus(false)
      setMintLoading(false)
      toast.success('The transaction is successful, waiting for block confirmation！')
    },
    onError(error: any) {
      console.log('Error1212122211 useContractWrite', error.message)
      setEntryStatus(false)
      toast.error(error.message)
      setMintLoading(false)
    },
  })


  const {
    config: configApprove
  } = usePrepareContractWrite({
    address: '0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee',
    abi: erc20ABI,
    functionName: 'approve',
    // @ts-ignore
    args: [infoData?.contract_address, BigNumber.from('10000000000000000000000')],
    overrides: {
      from: address,
    },
    chainId: 56,
    enabled: ApproveStatus,
    onSuccess(data: any) {
      console.log('Success', data)
      setApproveStatus(false)
    },
    onError(error: any) {
      console.log('Error1212122211', error.message)
      setApproveStatus(false)
    },
  })


  const { data: approveAdta, write: nbtTokenApprove, reset: resetNbtTokenApprove } = useContractWrite({
    ...configApprove,
    onSuccess(data: any) {
      console.log('Success ApproveFun', data)
      if (!EntryStatus) {
        setEntryStatus(true)
        enterWrite?.()
      }
      // enterWrite?.()
    },
    onError(error: any) {
      setMintLoading(false)
      toast.error(error.message)
    },
  })

  // const ApproveTransaction = useWaitForTransaction({
  //   confirmations: 1,
  //   hash: mintNft?.hash,
  //   onSuccess(data) {
  //     // setEnableHook(false);

  //   },
  //   onError(error) {
  //   }
  // });

  const { chain } = useNetwork()
  const { chains, pendingChainId, switchNetwork } =
    useSwitchNetwork()

  const mint = async () => {
    const accessToken = LStorage.get('accessToken')
    console.log('%c🀆 accessToken', 'color: #73998c; font-size: 20px;', accessToken);

    if (!accessToken) {
      actions.openConnect()
      return
    }
    // @ts-ignore
    if (infoData.total_entries - currentEntryLens < Quantity || getCurrentUserEntries(infoData?.participants) + Quantity > infoData.max_entries_per_user) {
      toast.error('Maximum limit exceeded.')
      return
    }
    setMintLoading(true)

    if (chain?.id !== 97) {
      await switchNetwork?.(97)
    }
    if (!ApproveStatus) {
      setApproveStatus(true)

    }
    await runApprove()
  }

  const runApprove = async () => {

    await nbtTokenApprove?.();
  }



  const getCurrentUserEntries = (list: any) => {
    if (list) {
      const userInfo = LStorage.get('LastAuthUser')
      if (userInfo) {
        let selectData = _.find(list, ['display_name', userInfo.name])

        return selectData ? selectData.buy_entry_count : 0

      }
    }


    return 0

  }



  // 数字输入框
  const onChange = (value: any) => {
    console.log('input number:', value);
  }

  const getPriceFun = async () => {
    try {
      const data: CallBackData = await getPrice() as any
      setPrice(data.data.BUSD)
    } catch (error) {
      console.log('nftcard-getPriceFun:', error)
    }
  }

  const shareontweet = () => {

  }

  const [liveNowData, setLiveData] = useState({
    featured: [],
    upcoming: [],
    endsoon: [],
    all: []
  })

  const seletSortLiveNowData = (data: RaffleItemData[]) => {
    if (data === null) return
    let liveNowDataTmp: any = {
      featured: [],
      upcoming: [],
      endsoon: [],
      all: []
    };
    data.forEach((ele: any) => {
      if (ele.category === "featured") {
        liveNowDataTmp.featured.push(ele)
      }
      if (ele.category === 'upcoming') {
        liveNowDataTmp.upcoming.push(ele)
      }
      if (ele.category !== 'upcoming') {
        liveNowDataTmp.all.push(ele)
      }
    });
    console.log('liveNowDataTmp', liveNowDataTmp);
    let endsoon = percant(liveNowDataTmp.featured, 70, 101);
    let featured = percant(liveNowDataTmp.featured, -1, 100);
    let all = percant(liveNowDataTmp.all, -1, 101);
    liveNowDataTmp.endsoon = [...endsoon]
    liveNowDataTmp.featured = [...featured]
    liveNowDataTmp.all = [...all]
    setLiveData(liveNowDataTmp)
  }


  const getRaffleListFun = async () => {
    try {
      // 获取全站activity
      const { code, data: { items } } = await getRaffleList({
        status: 'live',
        offset: 0,
        limit: 100000,
      }) as any
      if (code === 200) {
        seletSortLiveNowData(items);
      } else {

      }
    } catch (err) {
      console.log('getRaffleListFun:', err)
    }
  }


  /*
  * data 数组
  * thresholdstart thresholdend 阈值区间
  */
  const percant = (data: any, thresholdstart: number, thresholdend: number) => {
    const arr: { participants: any[]; }[] = [];
    data.map((ele: {
      total_entries: number; participants: any[];
      // eslint-disable-next-line array-callback-return
    }) => {
      let count = 0
      ele?.participants.map(
        // eslint-disable-next-line array-callback-return
        (element) => {
          count += element.buy_entry_count
        }
      )
      const process = Number(Number(count / ele.total_entries * 100).toFixed(0))
      if (process > thresholdstart && process < thresholdend) {
        arr.push(ele);
      }
    })
    return arr;
  }



  return (
    <section className="w-full pt-16 pb-4 lg:px-8">
      {
        loading
          ? <div className="w-20 h-20 fixed top-1/2 left-1/2 z-50 -translate-y-1/2 -translate-x-1/2 bg-slate-900 p-3 rounded-full shadow-md fade-in-delayed">
            <img className="inline-block spinner-border animate-spin-slowing" src={require('../../asstes/img/spinner-blue.svg').default} alt="" width="124" height="124" />
          </div>
          : <div className="container pt-14">
            <div className="detail-content">
              <div className="grid grid-cols-1 flex-center-detail sm:grid-cols-4-6">
                <div>
                  <div className="card-img-detail">
                    <Image
                      width={'100%'}
                      height={'100%'}
                      src={infoData?.prize.image_url}
                      preview={false}
                      style={{
                        borderRadius: '1.5rem'
                      }}
                      fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="
                    />
                  </div>

                  <div className="activity-participants px-4 pt-10 md:block hidden ">
                    <TwoColActivity subLoading={subLoading} tableData={activityData} participants={infoData?.participants}></TwoColActivity>
                  </div>
                </div>

                <div>
                  <div className="card-info">
                    <div className="info-top">
                      <div className="card-title" title="cardtitle">
                        {infoData?.prize.name}
                      </div>
                      <Divider className="bg-white/40 my-4" />

                      {
                        infoData?.winner.display_name === ''
                          ? currentEntryLens === infoData.total_entries
                            ? <div className="flex justify-between w-full font-thin font-bold text-white">
                              <div className="">
                                <i className="icon icon-referals mr-1"></i>
                                {infoData?.participants.length}
                              </div>
                              <div className="">
                                <span className="mr-1">$</span>{Number(infoData?.prize.value) * Number(price.usd)}
                              </div>
                              <div className="">
                                <span className="mr-1">#</span>{infoData?.prize.token_id}
                              </div>
                            </div>
                            : <div className="card-cols-2">
                              <div className="color-title">
                                ${Number(infoData?.prize.value) * Number(price.usd)}
                              </div>
                              <div className="white-title">
                                #{infoData?.prize.token_id}
                              </div>
                            </div>
                          : <div className="flex justify-between w-full font-thin font-bold text-white">
                            <div className="">
                              <i className="icon icon-referals mr-1"></i>
                              {infoData?.participants.length}
                            </div>
                            <div className="">
                              <span className="mr-1">$</span>{Number(infoData?.prize.value) * Number(price.usd)}
                            </div>
                            <div className="">
                              <span className="mr-1">#</span>{infoData?.prize.token_id}
                            </div>
                          </div>

                      }



                      {
                        infoData?.winner.display_name === ''
                          ? currentEntryLens === infoData.total_entries
                            ? <>
                              <div className="chooseWinner py-8">
                                <div className="w-full items-center flex justify-center">
                                  <img src={require('../../asstes/img/hourglass.png').default} alt="" />
                                </div>
                                <h1 className="color-title">
                                  FULL
                                </h1>
                              </div>
                            </>
                            : <>
                              <div className="card-cols-2 pt-4">
                                <div className="attention-number pt-6 pb-2">
                                  Total Entries:
                                  <span>&nbsp;{infoData?.total_entries}</span>
                                </div>
                              </div>

                              <div className="card-cols-2 pt-2">
                                <Progress percent={infoData?.total_entries ? (currentEntryLens / infoData?.total_entries) * 100 : 0} showInfo={false} trailColor="#fff" success={{ strokeColor: '#FDE23B' }} />
                              </div>

                              <div className="card-cols-2 pt-2">
                                <div className="attention-number pt-4 pb-2">
                                  Current Entries:
                                  <span>&nbsp;{currentEntryLens}</span>
                                </div>
                                <div className="attention-number pt-4 pb-2">
                                  Remaining Entries:
                                  <span>&nbsp;{infoData?.total_entries ? infoData?.total_entries - currentEntryLens : 0}</span>
                                </div>
                              </div>

                              <div className="card-cols-2 pt-8">
                                <div className="attention-number pb-2">
                                  Buying more entries increases your odds of winning!
                                </div>
                              </div>

                              <div className="card-cols-2">
                                <div className="attention-number pt-6 pb-2">
                                  BUSD:
                                  <span>&nbsp;{infoData?.price_structure.price_in_busd}</span>
                                </div>
                              </div>
                              <div className="card-cols-2">
                                <div className="attention-number pt-6 pb-2">
                                  Entries:&nbsp;&nbsp;
                                  {/* <InputNumber size="small" min={1} max={10} defaultValue={3} onChange={onChange} /> */}
                                  <div className="count">
                                    <div className="inputGroup">
                                      <button disabled={getCurrentUserEntries(infoData?.participants) >= infoData.max_entries_per_user} onClick={() => { if (Quantity > 1) { setQuantity(Quantity - 1) } }}>-</button>
                                      <div className="cont-input">
                                        <input
                                          id="tentacles"
                                          name="tentacles"
                                          type="number"
                                          disabled={infoData ? (getCurrentUserEntries(infoData?.participants) >= infoData?.max_entries_per_user ? true : false) : false}
                                          value={Quantity}
                                          step={1} min="1"
                                          max="300"
                                          onBlur={(e) => {
                                            if (e.target.value === '') setQuantity(1)
                                          }}
                                          onChange={(e) => {
                                            let val = e.target.value.replace(/[^\d]/g, '');
                                            if (infoData) {
                                              if (infoData.total_entries - currentEntryLens < Number(val) || getCurrentUserEntries(infoData?.participants) + Number(val) > infoData.max_entries_per_user) {
                                                toast.error('Maximum limit exceeded.')
                                              }
                                              var patrn = /^([1-9]\d*)(\.\d*[1-9])?$/;
                                              if (!patrn.exec(val)) {
                                                JSON.stringify(val).substr(1);
                                                setQuantity(Number(JSON.stringify(val).substr(1)));
                                              } else if (Number(val) > infoData.max_entries_per_user) {
                                                setQuantity(infoData.max_entries_per_user - getCurrentUserEntries(infoData?.participants));
                                              } else {
                                                setQuantity(Number(val));
                                              }
                                            }

                                          }} />
                                      </div>
                                      <button
                                        disabled={getCurrentUserEntries(infoData?.participants) >= infoData.max_entries_per_user}
                                        onClick={
                                          () => {
                                            if (infoData) {
                                              if (getCurrentUserEntries(infoData?.participants) + Quantity < infoData.max_entries_per_user && Quantity < infoData.total_entries - currentEntryLens) {
                                                setQuantity(Quantity + 1)
                                              } else {
                                                toast.error('Maximum limit exceeded.')
                                              }
                                            }

                                          }}
                                      >+</button>
                                    </div>
                                  </div>
                                  &nbsp;&nbsp;
                                  {
                                    infoData
                                      ? <>
                                        You used {getCurrentUserEntries(infoData?.participants)} of {infoData?.max_entries_per_user} entries
                                      </>
                                      : ''
                                  }
                                </div>
                              </div>
                            </>
                          : <>
                            <div className="winner_info text-center font-Bold">
                              <h1>ENDED</h1>
                              <span>{TimeInterval(infoData ? infoData?.close_time : JSON.stringify(new Date()))}</span>
                              <div className="wineer">
                                <span className="text-right">Won By</span>
                                <Link to={`/mw/${infoData?.winner.display_name}`}>
                                  {
                                    infoData?.winner.avatar
                                      ? <img src={infoData?.winner.avatar} alt="" className="rounded-full bg-slate-600" />
                                      : <div className=' flex items-center justify-center user-name-first-word uppercase default_img rounded-full bg-slate-600'>
                                        {infoData?.winner.display_name.substr(0, 1)}
                                      </div>
                                  }
                                </Link>
                                {/* <div className=' flex items-center justify-center user-name-first-word uppercase default_img rounded-full'>
                                  {infoData?.winner.display_name.substr(0, 1)}
                                </div> */}

                                <span className="text-left">{infoData?.winner.display_name}</span>
                              </div>
                            </div>
                          </>
                      }



                      {
                        infoData?.winner.display_name === ''
                          ? currentEntryLens === infoData.total_entries
                            ? <>
                              <div className="w-full chossing-await">
                                <div className=' font-Bold w-full '>
                                  CHOOSING WINNER...
                                </div>

                              </div>
                              <div className="md:block lg:block pt-6 font-thin text-xs text-center">
                                Winner is being drawn！
                              </div>
                            </>
                            :
                            <>
                              <div className="card-cols-2 pt-8">
                                <div className="detail-buy-button">
                                  <Button type="primary" size="large" className="relative"
                                    onClick={() => {
                                      mint()
                                    }}
                                    disabled={mintLoading || getCurrentUserEntries(infoData?.participants) >= infoData.max_entries_per_user}
                                  >


                                    <div className={['absolute z-10 flex justify-center align-middle w-full transition-all', mintLoading ? 'opacity-1' : 'opacity-0'].join(' ')}>
                                      <img className="inline-block spinner-border animate-spin-slowing" src={require('../../asstes/img/spinner-white.svg').default} alt="" width="30" height="30" />
                                    </div>

                                    <span className={[' transition-all', mintLoading ? 'opacity-0' : 'opacity-1'].join(' ')}>BUY ENTRY</span>

                                  </Button>

                                </div>
                              </div>
                              <div className="md:block lg:block pt-6 font-thin text-xs">
                                Quick Tip! Gas fees are required for each purchase. You can save a lot of money on gas fees by purchasing multiple entries at once.
                              </div>
                            </>

                          : <>
                            <div className="w-full">
                              <Link to={'/'} className='hyperlink font-Bold w-full block'>
                                VIEW MORE COMPETITIONS
                              </Link>

                            </div>
                            <div className="md:block lg:block pt-6 font-thin text-xs text-center">
                              Check out other competitions with BIG rewards waiting for you!
                            </div>
                          </>
                      }



                    </div>
                  </div>


                  {/* <a href="https://twitter.com/intent/tweet?in_reply_to=463440424141459456" className="router-link-active router-link-exact-active inline-block mx-1">Reply</a>
                      <a className="router-link-active router-link-exact-active inline-block mx-1" href="https://twitter.com/intent/retweet?tweet_id=463440424141459456">Retweet</a>
                      <a className="router-link-active router-link-exact-active inline-block mx-1" href="https://twitter.com/intent/like?tweet_id=463440424141459456">Like</a> */}
                  <div className="flex-center-detail">
                    <div className="share-twitter pl-6">
                      <div className="detail-share-twitter-button pb-10 pt-12">
                        <Button ghost size="large" onClick={shareontweet}>SHARE THIS COMPETITION &nbsp;
                          <span className=" icon-twitter icon"></span>
                        </Button>
                      </div>
                      <div className="px-3 py-4 md:px-4 detail-copy-button my-4">
                        <div className="text-white text-xs md:text-sm uppercase tracking-wider text-center text-ellipsis overflow-hidden font-heavy">
                          <a href={`${process.env.REACT_APP_BROSWER_BNB}/address/${infoData?.contract_address}`} className="hover:text-gray-300 transition-colors flex content-center items-center justify-center" target="_blank" rel="noreferrer">
                            <span className=" mr-1">Contract:</span>&nbsp;
                            <span className="inline-block max-w-sm text-ellipsis overflow-hidden mr-1.5">{infoData?.contract_address}</span>
                            <span className="icon icon-share inline-block relative"></span>
                          </a>
                        </div>
                      </div>

                      <div>
                        <div className="activity-participants px-4 pt-10 md:hidden block">
                          <TwoColActivity
                            subLoading={subLoading} tableData={activityData} participants={infoData?.participants}
                          ></TwoColActivity>
                        </div>
                        {
                          liveNowData.endsoon.length > 0 ?
                            <Row >
                              <div className='livenow-title'>
                                Ending Soon
                              </div>
                            </Row> : <></>
                        }
                        <Row wrap gutter={[32, { xs: 12, sm: 12, md: 18, lg: 24 }]}>
                          {
                            liveNowData.endsoon.map((feature: RaffleItemData, index: any) => {
                              return <>
                                <Col span={12} key={index}>
                                  <NFTCard cardData={feature}></NFTCard>
                                </Col>
                              </>
                            })
                          }
                        </Row>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>

      }
    </section>
  );
}

export default ProductDetail;