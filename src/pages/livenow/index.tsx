/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import _ from "lodash";
import { useEffect, useRef, useState } from "react";
import Slogen from "./sloggen"
import NFTCard from "./nftcard"
import './index.scss'


/* eslint-disable jsx-a11y/img-redundant-alt */
const LiveNow = (): JSX.Element => {
	const [state, setstate] = useState({
		loading: true,
		logos: [
			// { text: "Metamask Connect", imgSrc: require("../assets/partImg/metamask.png") },
			// { text: "Binance Connect", imgSrc: require("../assets/partImg/binance.png") },
			// { text: "Redeem Connect", imgSrc: require("../assets/partImg/redeem.png") },
			// { text: "My Referral", imgSrc: require("../assets/partImg/referral.png") },
		],
		featureList: [
			{ title: 'Feature', cardList: [{ cardName: 'NFT01', cardValue: '#1', BUSD: '0.01', unit: 'BUSD', progress: 60 }, { cardName: 'NFT02', cardValue: '#2675', BUSD: '0.01', unit: 'BUSD', progress: 60 }, { cardName: 'NFT03', cardValue: '#3', BUSD: '0.01', unit: 'BUSD', progress: 60 }, { cardName: 'NFT04', cardValue: '#4', BUSD: '0.01', unit: 'BUSD', progress: 60 }] },
			{ title: 'Up Coming', cardList: [{ cardName: 'up coming01', cardValue: '1', BUSD: '0.01', unit: 'BUSD', progress: 60 }, { cardName: 'up coming02', cardValue: '2', BUSD: '0.01', unit: 'BUSD', progress: 60 }, { cardName: 'up coming03', cardValue: '3', BUSD: '0.01', unit: 'BUSD', progress: 60 }, { cardName: 'up coming04', cardValue: '4', BUSD: '0.01', unit: 'BUSD', progress: 60 }] },
			{ title: 'Ending Soon', cardList: [{ cardName: 'up coming01', cardValue: '1', BUSD: '0.01', unit: 'BUSD', progress: 60 }, { cardName: 'up coming02', cardValue: '2', BUSD: '0.01', unit: 'BUSD', progress: 60 }, { cardName: 'up coming03', cardValue: '3', BUSD: '0.01', unit: 'BUSD', progress: 60 }, { cardName: 'up coming04', cardValue: '4', BUSD: '0.01', unit: 'BUSD', progress: 60 }] },
		],
		allCardList: [
			{ cardName: 'NFT01', cardValue: '#1', BUSD: '0.01', unit: 'BUSD', progress: 60 }, { cardName: 'NFT02', cardValue: '#2675', BUSD: '0.01', unit: 'BUSD', progress: 60 }, { cardName: 'NFT03', cardValue: '#3', BUSD: '0.01', unit: 'BUSD', progress: 60 }, { cardName: 'NFT04', cardValue: '#4', BUSD: '0.01', unit: 'BUSD', progress: 60 }
		]
	});


	return (
		<>
			<section className="w-full pb-4 pt-16 lg:px-8">
				<div className="homepage">
					<div className="goods">

						<div className="slogen">
							<Slogen></Slogen>
						</div>

						{state.featureList.map((feature, index) => {
							return <div className="feature-card" >
								<div className="feature-title" >
									{feature.title}
									
								</div>
								<div className="card-List">
									{
										feature.cardList.map(
											(item, idx) => {
												return <NFTCard cardData={item} key={idx}></NFTCard>
											}
										)
									}
								</div>
							</div>
						})}

						<div className="card-referrals-dashborde">
							{/* <referral-card> </referral-card> */}
						</div>

						<div className="feature-card">
							<div className="feature-title">
								ALL
							</div>
							<div className="card-List">
								{/* <NFTCard :cardData="item" v-for="item in allCardList" :key="item.cardName"></NFTCard> */}
							</div>
						</div>
					</div>
				</div >
			</section >
		</>
	);
}

export default LiveNow;