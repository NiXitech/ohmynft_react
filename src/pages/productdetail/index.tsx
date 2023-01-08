/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import _ from "lodash";
import { useState } from "react";
import './index.scss'
import { Progress, Divider, Button, InputNumber } from 'antd';
import TwoColActivity from "../../components/twocolactivity";
import NFTCard from "../livenow/nftcard";
import ConnectWallet from "../../components/connectWallet";
import useStateHook from '../store';


/* eslint-disable jsx-a11y/img-redundant-alt */
const ProductDetail = (): JSX.Element => {
  const [status, actions] = useStateHook();
  const [state, setstate] = useState({
    cardtitle: 'Apple Watch Series 8 - Starlight Aluminum Case with Sport Loop',
    cardlist: [
      { cardName: 'up coming01', cardValue: '1', BUSD: '0.01', unit: 'BUSD', progress: 60 },
      { cardName: 'up coming02', cardValue: '2', BUSD: '0.01', unit: 'BUSD', progress: 60 }
    ]
  });

  // 连接钱包
  const connectWallet = (item: any) => {
    actions.openConnect();
  }

  // 数字输入框
  const onChange = (value: any) => {
    console.log('input number:', value);
  }

  return (
    <section className="w-full pt-16 pb-4 lg:px-8">
      <div className="container pt-14">
        <div className="detail-content">
          <div className="grid grid-cols-2 flex-center-detail">
            <div className="card-img-detail">
              <img src={require('../../asstes/tmpImg/cardImg.png').default} alt="loading" />
            </div>
            <div className="card-info">
              <div className="info-top">
                <div className="card-title" title="cardtitle">
                  {state.cardtitle}
                </div>
                {/* <Divider /> */}
                <div className="card-cols-2 pt-8">
                  <div className="color-title">
                    123
                  </div>
                  <div className="white-title">
                    456
                  </div>
                </div>

                <div className="card-cols-2 pt-4">
                  <div className="attention-number pt-2 pb-2">
                    Total Entries:
                    <span>&nbsp;1000</span>
                  </div>
                </div>

                <div className="card-cols-2 pt-2">
                  <Progress percent={60} showInfo={false} trailColor="#fff" />
                </div>

                <div className="card-cols-2 pt-2">
                  <div className="attention-number pt-2 pb-2">
                    Current Entries:
                    <span>&nbsp;500</span>
                  </div>
                  <div className="attention-number pt-2 pb-2">
                    Remaining Entries:
                    <span>&nbsp;600</span>
                  </div>
                </div>

                <div className="card-cols-2 pt-2">
                  <div className="attention-number pb-2">
                    Buying more entries increases your odds of winning!
                  </div>
                </div>

                <div className="card-cols-2">
                  <div className="attention-number pt-2 pb-2">
                    BUSD:
                    <span>&nbsp;0.05</span>
                    <label className="lable-button">
                      <Button type="primary" size="small">Maximum limit exceeded.</Button>
                    </label>
                  </div>
                </div>

                <div className="card-cols-2">
                  <div className="attention-number pt-2 pb-2">
                    Entries:&nbsp;&nbsp;
                    <InputNumber size="small" min={1} max={10} defaultValue={3} onChange={onChange} />
                    &nbsp;&nbsp;You used 0 of 400 entries
                  </div>
                </div>

                <div className="card-cols-2 pt-4">
                  <div className="detail-buy-button">
                    <Button type="primary" size="large">BUY ENTRY</Button>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <Divider />

          <div className="grid grid-cols-2 flex-center-detail">
            <div className="activity-participants px-4">
              <TwoColActivity></TwoColActivity>
            </div>

            <div className="share-twitter pl-6">
              <div className="detail-share-twitter-button pb-10">
                <Button ghost size="large">Share On Twitter &nbsp;
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
                <div className="end-soon-detail pb-10">
                  End soon
                </div>
                <div className="grid grid-cols-2 flex flex-row justify-between">
                  {
                    state.cardlist.map(
                      (item, index) => {
                        return (
                          <NFTCard cardData={item} key={index}></NFTCard>
                        )
                      }
                    )
                  }
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