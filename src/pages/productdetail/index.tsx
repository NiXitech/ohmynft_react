/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import _ from "lodash";
import { useEffect, useState } from "react";
import './index.scss'
import { Progress, Divider, Button, InputNumber, Image } from 'antd';
import TwoColActivity from "../../components/twocolactivity";
import NFTCard from "../livenow/nftcard";
// import ConnectWallet from "../../components/connectWallet";
import useStateHook from '../store';
import { ActivityItem, CallBackData, RaffleItemData } from "../../types/types";
import { erc20ABI, useAccount, useContractRead, useContractWrite, useNetwork, usePrepareContractWrite, useSwitchNetwork } from "wagmi";
import { getPrice, getRaffleActivity, getRaffleInfo } from "../../api/services/http/api";
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
    // getPriceFun()
    getRaffleActivityFun()
  }, [])

  const getRaffleActivityFun = async () => {
    setSubLoading(true)
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
      chainId: 97,
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

      console.log('%c🀀 ', 'color: #007300; font-size: 20px;', refetchSupply);
      refetchSupply()
    }
  }, [debouncedTokenId, infoData])

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
    chainId: 97,
    // cacheTime: 2_000,
    enabled: EntryStatus,
    // staleTime: 2_000,
    onSuccess(data: any) {
      console.log('Success', data)
    },
    onError(error: any) {
      console.log('Error1212122211', error.message)
    },
  })
  const { data, error, isError, write: enterWrite, isLoading } = useContractWrite({
    ...config,
    onSuccess(data: any) {
      console.log('Success useContractWrite', data)
      setMintLoading(false)
      toast.success('The transaction is successful, waiting for block confirmation！')
    },
    onError(error: any) {
      console.log('Error1212122211 useContractWrite', error.message)
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
    args: ["0xb8Ce6900827C2718E6b07685492Eb75ea08eFEa3", BigNumber.from('1000000000000000000')],
    overrides: {
      from: address,
    },
    chainId: 97,
    enabled: ApproveStatus,
    onSuccess(data: any) {
      console.log('Success', data)
    },
    onError(error: any) {
      console.log('Error1212122211', error.message)
    },
  })


  const { write: nbtTokenApprove, reset: resetNbtTokenApprove } = useContractWrite({
    ...configApprove,
    onSuccess(data: any) {
      console.log('Success ApproveFun', data)
      // toast.success('The transaction is successful, waiting for block confirmation！')
      setEntryStatus(true)
      enterWrite?.()
    },
    onError(error: any) {
      console.log('Error1212122211 ApproveFun', error.message)
      setMintLoading(false)
      toast.error(error.message)
    },
  })

  const { chain } = useNetwork()
  const { chains, pendingChainId, switchNetwork } =
    useSwitchNetwork()

  const mint = async () => {
    if (!isConnected) {
      actions.openConnect()
      return
    }
    setMintLoading(true)

    if (chain?.id !== 97) {
      await switchNetwork?.(97)
    }
    setApproveStatus(true)
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

  // 连接推特
  const connectTwitter = () => {
    // debugger
    // (async ()=> {
    //   // try {
    //     const tweet = await client.tweets.findTweetById("1460323737035677698");
    //     console.log(tweet.data.text);
    //   // }catch(err: any) {
    //   //   console.log('twitter:', err)
    //   // }
    // })();

    // (async ()=> {
    //   const tweetId = await findTweetById({id: '1460323737035677698'}) as any;
    //   console.log('tweetIdData:', tweetId.data)
    // })()
    // var axios = require('axios');

    var config = {
      method: 'get',
      url: 'https://api.twitter.com/2/users/2873008978/followers',
      headers: {
        'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAAMBDdwEAAAAA2BsYVQVgTt6DGuhpdjJBwkHDAMo%3Dch3BD48OENuJ5jEKU8QtTYVhGLKOzP3Mr9PZTLUO8Pn22DdH0K',
        'Cookie': 'guest_id=v1%3A167307959388924842; guest_id_ads=v1%3A167307959388924842; guest_id_marketing=v1%3A167307959388924842; personalization_id="v1_31/mIcn+cScehvYyAjM0rQ=="'
      }
    };

    // (async () => {
    //   const result = await axios
    //     .get("https://api.twitter.com/2/users/2873008978", {
    //       headers: {
    //         'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAAMBDdwEAAAAA2BsYVQVgTt6DGuhpdjJBwkHDAMo%3Dch3BD48OENuJ5jEKU8QtTYVhGLKOzP3Mr9PZTLUO8Pn22DdH0K',
    //         'Cookie': 'guest_id=v1%3A167307959388924842; guest_id_ads=v1%3A167307959388924842; guest_id_marketing=v1%3A167307959388924842; personalization_id="v1_31/mIcn+cScehvYyAjM0rQ=="'
    //       }
    //     });
    //   console.log('----------->', result);
    // })()
    // axios
    //   .get("https://api.twitter.com/2/users/2873008978/followers", {
    //     headers: {
    //       'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAAMBDdwEAAAAA2BsYVQVgTt6DGuhpdjJBwkHDAMo%3Dch3BD48OENuJ5jEKU8QtTYVhGLKOzP3Mr9PZTLUO8Pn22DdH0K',
    //       'Cookie': 'guest_id=v1%3A167307959388924842; guest_id_ads=v1%3A167307959388924842; guest_id_marketing=v1%3A167307959388924842; personalization_id="v1_31/mIcn+cScehvYyAjM0rQ=="'
    //     }
    //   })
    //   .then(function (response: any) {
    //     console.log(JSON.stringify(response.data));
    //   })
    //   .catch(function (error: any) {
    //     console.log(error);
    //   })




    // (async () => {
    //   const tweetId = await oauthTweet({ oauth_callback: 'localhost:3000' }) as any;
    //   console.log('tweetIdData:', tweetId.data)
    // })()
    // (async () => {
    //   try {
    //     const postTweet = await twitterClient.tweets.createTweet({
    //       // The text of the Tweet
    //       text: "Are you excited for the weekend?",

    //       // Options for a Tweet with a poll
    //       poll: {
    //         options: ["Yes", "Maybe", "No"],
    //         duration_minutes: 120,
    //       },
    //     });
    //     console.dir(postTweet, {
    //       depth: null,
    //     });
    //   } catch (error) {
    //     console.log(error);
    //   }
    // })();

  }





  return (
    <section className="w-full pt-16 pb-4 lg:px-8">
      <div className="container pt-14">
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
                  fallback="data:image/png;base64,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"
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
                            <span className="mr-1">$</span>{infoData?.prize.value}
                          </div>
                          <div className="">
                            <span className="mr-1">#</span>{infoData?.prize.token_id}
                          </div>
                        </div>
                        : <div className="card-cols-2">
                          <div className="color-title">
                            ${infoData?.prize.value}
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
                          <span className="mr-1">$</span>{infoData?.prize.value}
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
                              <span>&nbsp;{infoData?.prize.value}</span>
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
                                        console.log('number:--->', e.target.value);
                                        if (infoData) {
                                          if (infoData.total_entries - currentEntryLens < Number(e.target.value) || getCurrentUserEntries(infoData?.participants) + Number(e.target.value) > infoData.max_entries_per_user) {
                                            toast.error('Maximum limit exceeded.')
                                          }
                                          var patrn = /^([1-9]\d*)(\.\d*[1-9])?$/;
                                          if (!patrn.exec(e.target.value)) {
                                            JSON.stringify(e.target.value).substr(1);
                                            setQuantity(Number(JSON.stringify(e.target.value).substr(1)));
                                          } else if (Number(e.target.value) > infoData.max_entries_per_user) {
                                            setQuantity(100);
                                          } else {
                                            setQuantity(Number(e.target.value));
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
                            <img src={require('../../asstes/img/personal.png').default} alt="" />
                            <span className="text-left">Richard Fitzgerald</span>
                          </div>
                        </div>
                      </>
                  }



                  {
                    infoData?.winner.display_name === ''
                      ? currentEntryLens === infoData.total_entries
                        ? <>
                          <div className="w-full">
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
                                disabled={mintLoading}
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
                          <Link to={'/completed'} className='hyperlink font-Bold w-full block'>
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
                    <Button ghost size="large" onClick={shareontweet}>Share On Twitter &nbsp;
                      <span className=" icon-twitter icon"></span>
                    </Button>
                  </div>
                  <div className="detail-copy-button pb-10">
                    <Button ghost size="large">
                      CONTRACT: j3hd8vned8vjd89d33jj333azvvooemmeladjk
                      &nbsp;
                      <span className="icon-copy icon"></span>
                    </Button>
                  </div>
                  <div>
                    {/* <div className="activity-participants px-4 pt-10 md:hidden block">
                      <TwoColActivity tableData={activityData}></TwoColActivity>
                    </div> */}
                    {/* <div className="end-soon-detail pb-10 pt-4">
                      End soon
                    </div> */}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;