/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import _ from "lodash";
import { useState } from "react";
import './index.scss'
import CompletedCard from '../../components/completedcard'


/* eslint-disable jsx-a11y/img-redundant-alt */
const Completed = (): JSX.Element => {
	const [state, setstate] = useState({
		allCardList: [
			{ cardName: 'NFT01', cardValue: '#1', BUSD: '0.01', unit: 'BUSD', progress: 60 }, { cardName: 'NFT02', cardValue: '#2675', BUSD: '0.01', unit: 'BUSD', progress: 60 }, { cardName: 'NFT03', cardValue: '#3', BUSD: '0.01', unit: 'BUSD', progress: 60 }, { cardName: 'NFT04', cardValue: '#4', BUSD: '0.01', unit: 'BUSD', progress: 60 },
			{ cardName: 'NFT01', cardValue: '#1', BUSD: '0.01', unit: 'BUSD', progress: 60 }, { cardName: 'NFT02', cardValue: '#2675', BUSD: '0.01', unit: 'BUSD', progress: 60 }, { cardName: 'NFT03', cardValue: '#3', BUSD: '0.01', unit: 'BUSD', progress: 60 }, { cardName: 'NFT04', cardValue: '#4', BUSD: '0.01', unit: 'BUSD', progress: 60 },
			{ cardName: 'NFT01', cardValue: '#1', BUSD: '0.01', unit: 'BUSD', progress: 60 }, { cardName: 'NFT02', cardValue: '#2675', BUSD: '0.01', unit: 'BUSD', progress: 60 }, { cardName: 'NFT03', cardValue: '#3', BUSD: '0.01', unit: 'BUSD', progress: 60 }, { cardName: 'NFT04', cardValue: '#4', BUSD: '0.01', unit: 'BUSD', progress: 60 }
		]
	});


	return (
		<section className="w-full pb-4 pt-16 lg:px-8">
			<div className="home-page-completed">
				<div className="congratulations">
					<div className="attention-info">
						Earn Big Rewards With
						<span>
							Referrals！
						</span>
					</div>
				</div>
				<div className="card-list">
					{
						state.allCardList.map(
							(element, index) => {
								return (
									<CompletedCard cardData={element} key={index}></CompletedCard>
								)
							}
						)
					}
					{/* <completed-card cardData="item" v-for="item in allCardList" :key="item.cardName"></completed-card> */}
				</div>
			</div>
		</section>
	);
}

export default Completed;