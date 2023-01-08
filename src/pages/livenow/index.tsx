/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Button, Col, Row, Space } from 'antd';
import NFTCard from "./nftcard"
import './index.scss';

const LiveNow = (props: any) => {
	const [state, setState] = useState({
		title: 'Feature',
		textHead: 'COME ON ！',
		textWrap: 'Be A',
		textcolor: 'Winner',
		textEnd: 'In Web3',
		slogenDetail: 'Leveling the playing field & winning big rewards.',
		featureList: [
			{ title: 'Feature', cardList: [{ cardName: 'NFT01', cardValue: '#1', BUSD: '0.01', unit: 'BUSD', progress: 60 }, { cardName: 'NFT02', cardValue: '#2675', BUSD: '0.01', unit: 'BUSD', progress: 60 }, { cardName: 'NFT03', cardValue: '#3', BUSD: '0.01', unit: 'BUSD', progress: 60 }, { cardName: 'NFT04', cardValue: '#4', BUSD: '0.01', unit: 'BUSD', progress: 60 }] },
			{ title: 'Up Coming', cardList: [{ cardName: 'up coming01', cardValue: '1', BUSD: '0.01', unit: 'BUSD', progress: 60 }, { cardName: 'up coming02', cardValue: '2', BUSD: '0.01', unit: 'BUSD', progress: 60 }, { cardName: 'up coming03', cardValue: '3', BUSD: '0.01', unit: 'BUSD', progress: 60 }, { cardName: 'up coming04', cardValue: '4', BUSD: '0.01', unit: 'BUSD', progress: 60 }] },
			{ title: 'Ending Soon', cardList: [{ cardName: 'up coming01', cardValue: '1', BUSD: '0.01', unit: 'BUSD', progress: 60 }, { cardName: 'up coming02', cardValue: '2', BUSD: '0.01', unit: 'BUSD', progress: 60 }, { cardName: 'up coming03', cardValue: '3', BUSD: '0.01', unit: 'BUSD', progress: 60 }, { cardName: 'up coming04', cardValue: '4', BUSD: '0.01', unit: 'BUSD', progress: 60 }] },
		],
	});

	const BrText = () => {
		return (
			<div className='slogen-Info'>
				{state.textHead}
				<br />
				{state.textWrap}
				<div className="referrals">
					&nbsp;{state.textcolor}&nbsp;
				</div>
				{state.textEnd}
			</div>
		)
	}

	const Cardlist = (): JSX.Element => {
		return (
			<>
				{state.featureList.map((feature: any, index: any) => {
					return <div className="feature-card" key={index}>
						<div className="feature-title" >
							{feature.title}
						</div>
						<div className="card-List">
							{
								feature.cardList.map(
									(item: any, idx: any) => {
										return <NFTCard cardData={item} key={idx}></NFTCard>
									}
								)
							}
						</div>
					</div>
				})}
			</>
		)

	}

	useEffect(
		() => {
			const title = '';
			setState({
				...state, title
			})
		}, []
	)


	return (
		<section className="w-full pb-4 pt-16 lg:px-8">
			<Row>
				<Col className="gutter-row" span={12}>
					<Space direction="vertical" size="large" style={{ width: '100%' }}>
						<BrText></BrText>
						<div className="slogen-detail pt-2">
							{state.slogenDetail}
						</div>
						<Row className="pt-6">
							<Col span={6}>
								<Button type="primary" block shape="round" size="large" >Share On Twitter</Button>
							</Col>
							<Col span={6}>
								<Button type="primary" block shape="round" size="large" >Copy Link</Button>
							</Col>
						</Row>
					</Space>
				</Col>
				<Col className="gutter-row" span={12}>
					<img src={require('../../asstes/partImg/slogen.png').default} alt="" style={{ width: '63.187rem' }} />
				</Col>
			</Row>
			{
				state.featureList.map((feature: any, index: any) => {
					return (
						<>
							<Row key={index}>
								<div className='livenow-title'>
									{feature.title}
								</div>
							</Row>
							<Row gutter={{ xs: 12, sm: 12, md: 18, lg: 24 }} wrap>
								{
									feature.cardList.map(
										(item: any, idx: any) => {
											return <Col md={{ span: 8 }} lg={{ span: 6 }} span={12}>
												<NFTCard cardData={item} key={idx}></NFTCard>
											</Col>
										}
									)
								}
							</Row>
						</>
					)
				})
			}
		</section>
	)
}

export default LiveNow;