/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import _ from "lodash";
import { useEffect, useState } from "react";
import './index.scss'
import { Progress, Divider, Button, InputNumber } from 'antd';
import TwoColActivity from "../../components/twocolactivity";
import NFTCard from "../livenow/nftcard";
// import ConnectWallet from "../../components/connectWallet";
import useStateHook from '../store';
import { ActivityItem, CallBackData, RaffleItemData } from "../../types/types";
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite } from "wagmi";
import { getPrice, getRaffleActivity, getRaffleInfo } from "../../api/services/http/api";
import { useParams } from "react-router-dom"
import { BigNumber } from "ethers";
import useDebounce from "../../libs/usehooks";
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

  useEffect(() => {
    actions.setGlobalLoading()
    getRaffleInfoFun()
    getPriceFun()
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
      address: `0xb8Ce6900827C2718E6b07685492Eb75ea08eFEa3`,
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
      args: [BigNumber.from(debouncedTokenId?.raffle_id)],
      chainId: 97,
      enabled: false,
      onSuccess(data: any) {
        console.log('Success', data)
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
        console.log('-----------555------>', result)
        // if()
        // if (isConnected) {
        //   refetchSupply()
        // }
      }
    } catch (error) {
      console.log('%c🀁 error', 'color: #ff0000; font-size: 20px;', error);
    }
    setLiading(false)

  }

  // 连接钱包
  const connectWallet = (item: any) => {
    actions.openConnect();
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
                <img src={require('../../asstes/tmpImg/cardImg.png').default} alt="loading" />
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
                  <Divider className="bg-white/40" />
                  <div className="card-cols-2">
                    <div className="color-title">
                      #{infoData?.prize.token_id}
                    </div>
                    <div className="white-title">
                      {infoData?.prize.value}
                    </div>
                  </div>

                  <div className="card-cols-2 pt-4">
                    <div className="attention-number pt-6 pb-2">
                      Total Entries:
                      <span>&nbsp;{infoData?.total_entries}</span>
                    </div>
                  </div>

                  <div className="card-cols-2 pt-2">
                    <Progress percent={60} showInfo={false} trailColor="#fff" />
                  </div>

                  <div className="card-cols-2 pt-2">
                    <div className="attention-number pt-4 pb-2">
                      Current Entries:
                      <span>&nbsp;500</span>
                    </div>
                    <div className="attention-number pt-4 pb-2">
                      Remaining Entries:
                      <span>&nbsp;600</span>
                    </div>
                  </div>

                  <div className="card-cols-2 pt-8">
                    <div className="attention-number pb-2">
                      {
                        infoData?.winner.display_name === '' ? 'Buying more entries increases your odds of winning!' : '已经开奖'
                      }
                      
                    </div>
                  </div>

                  <div className="card-cols-2">
                    <div className="attention-number pt-6 pb-2">
                      BUSD:
                      <span>&nbsp;{infoData?.prize.value}</span>
                      <label className="lable-button">
                        <Button type="primary" size="small">Maximum limit exceeded.</Button>
                      </label>
                    </div>
                  </div>

                  <div className="card-cols-2">
                    <div className="attention-number pt-6 pb-2">
                      Entries:&nbsp;&nbsp;
                      {/* <InputNumber size="small" min={1} max={10} defaultValue={3} onChange={onChange} /> */}
                      <div className="count">
                        <div className="inputGroup">
                          <button onClick={() => { if (Quantity > 1) { setQuantity(Quantity - 1) } }}>-</button>
                          <div className="cont-input">
                            <input id="tentacles" name="tentacles" type="number" value={Quantity} step={1} min="1" max="300"
                              onBlur={(e) => {
                                if (e.target.value === '') setQuantity(1)
                              }}
                              onChange={(e) => {
                                console.log('number:--->', e.target.value);
                                var patrn = /^([1-9]\d*)(\.\d*[1-9])?$/;
                                if (!patrn.exec(e.target.value)) {
                                  JSON.stringify(e.target.value).substr(1);
                                  setQuantity(Number(JSON.stringify(e.target.value).substr(1)));
                                } else if (Number(e.target.value) > 100) {
                                  setQuantity(100);
                                } else {
                                  setQuantity(Number(e.target.value));
                                }
                              }} />
                          </div>
                          <button onClick={() => { if (Quantity < 300) { setQuantity(Quantity + 1) } }}>+</button>
                        </div>
                      </div>
                      &nbsp;&nbsp;You used 0 of 400 entries
                    </div>
                  </div>

                  <div className="card-cols-2 pt-8">
                    <div className="detail-buy-button">
                      <Button type="primary" size="large">BUY ENTRY </Button>
                      {/* <a href="https://twitter.com/intent/tweet?in_reply_to=463440424141459456" className="router-link-active router-link-exact-active inline-block mx-1">Reply</a>
                      <a className="router-link-active router-link-exact-active inline-block mx-1" href="https://twitter.com/intent/retweet?tweet_id=463440424141459456">Retweet</a>
                      <a className="router-link-active router-link-exact-active inline-block mx-1" href="https://twitter.com/intent/like?tweet_id=463440424141459456">Like</a> */}
                    </div>
                  </div>

                  <div className="md:block lg:block pt-6 font-thin text-xs">
                    Quick Tip! Gas fees are required for each purchase. You can save a lot of money on gas fees by purchasing multiple entries at once.
                  </div>

                </div>
              </div>

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
                    <div className="end-soon-detail pb-10 pt-4">
                      End soon
                    </div>
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