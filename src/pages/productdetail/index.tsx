/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import _ from "lodash";
import { useState } from "react";
import './index.scss'
import TwoColActivity from "../../components/twocolactivity";


/* eslint-disable jsx-a11y/img-redundant-alt */
const ProductDetail = (): JSX.Element => {
  const [state, setstate] = useState({
    cardtitle: 'Apple Watch Series 8 - Starlight Aluminum Case with Sport Loop',
  });


  return (
    <section className="w-full pb-4 pt-16 lg:px-8">
      <div className="home-page-detail">
        <div className="congratulations">
          <div className="attention-info">
            Earn Big Rewards With Referrals！
          </div>
        </div>
        <div className="detail-content">
          <div className="grid grid-cols-2">
            <div>
              <div className="card-img">
                <img src={require('../../asstes/tmpImg/cardImg.png').default} alt="" />
              </div>
            </div>
            <div>
              <div className="card-info">
                <div className="info-top">
                  <div className="card-title" title="cardtitle">
                    {state.cardtitle}
                  </div>
                  <div className="card-number">
                    {
                      [1, 2, 3].map(
                        (item, index) => {
                          return (
                            <span key={index}>
                              <img src={require('../../asstes/partImg/binance.png').default} alt="" />
                              <span> {item}</span>
                            </span>
                          )
                        }
                      )
                    }
                  </div>
                </div>
                <div className="info-bottom">
                  <div className="choosing-winner">
                    <div className="choosing-pic">

                    </div>
                    <div className="choosing-text">
                      FULL
                    </div>
                    <div className="choosing-status">Winner is being drawn</div>
                  </div>
                  <div className="button-list">
                    {
                      ['choosing a winner', 'share on twitter', 'contract:0X4D6283B4198C0039F2ADDC6A8784BBDEF6E259EB'].map(
                        (item, index) => {
                          return (
                            <div
                              key={index}>
                              <button> {item}</button>
                            </div>
                          )
                        }
                      )
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="split-line"></div>
          <div className="grid grid-cols-2">
            <div className="activity-participants">
              <TwoColActivity></TwoColActivity>
            </div>
            <div  >
              <div className="ending-soon">
                {/* {
                         
                <NFTCard cardData={item} key={idx}></NFTCard>
                } */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;