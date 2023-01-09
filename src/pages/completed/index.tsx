/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import _ from "lodash";
import { useState } from "react";
import { Col, Row } from 'antd';
import './index.scss'
// import CompletedCard from '../../components/completedcard'
import NFTCard from '../livenow/nftcard/index'



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
		<div className="container ">
			<section className="w-full pb-4 pt-16">
				<div className="home-page-completed w-fullpb-4 ">
					<div className="congratulations">
						<div className="attention-info">
							Earn Big Rewards With
							<span>
								&nbsp;Referrals！
							</span>
						</div>
					</div>
					<div className="py-6">
						<Row wrap gutter={[16, { xs: 12, sm: 12, md: 18, lg: 24 }]}>
							{
								state.allCardList.map(
									(item: any, idx: any) => {
										return <Col  md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 6 }} span={12} key={idx}>
											<NFTCard cardData={item} key={idx}></NFTCard>
										</Col>
									}
								)
							}
						</Row>
					</div>
				</div>
			</section>
		</div>
	);
}

export default Completed;