/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Button, Col, Row, Space, Image } from 'antd';
import NFTCard from "./nftcard"
import './index.scss';
import { getRaffleList } from '../../api/services/http/api';
import { RaffleItemData } from '../../types/types';
import { LStorage } from '../../api/services/cooike/storage';
import copy from 'copy-to-clipboard';
import { toast } from 'react-toastify';
import useStateHook from '../../pages/store';
import TweetAuth from './tweetauth';

const LiveNow = (props: any) => {
	const [actionstate, actions] = useStateHook();
	const [state] = useState({
		title: 'Feature',
		textHead: 'COME ON ！',
		textWrap: 'Be A',
		textcolor: 'Winner',
		textEnd: 'In Web3',
		slogenDetail: 'Leveling the playing field & winning big rewards.',
	});

	const [liveNowData, setLiveData] = useState({
		featured: [],
		upcoming: [],
		endsoon: [],
		all: []
	})

	const [tweetShareInfo, setTweetShareInfo] = useState('')

	const userdata = LStorage.get('accessToken');
	const sharetweet = () => {
		if (userdata) {
			let userinfo = LStorage.get('LastAuthUser') || {};
			let userLink = window.location.origin + '/t/' + (userinfo.name || '');
			let shareLink = 'http://twitter.com/share?' +
				'text=Join me at OH MY NFT, the most convenient place packed with the best giveaway prizes of real-world goods changing the way you win in Web3' +
				'&url=' + userLink + '&hashtags=WinninginWeb3';
			setTweetShareInfo(shareLink)
			window.open(shareLink,  '_blank');
		} else {
			actions.openConnect();
		}
	}


	// copy link
	const copyLink = () => {
		if (userdata) {
			let userinfo = LStorage.get('LastAuthUser') || {};
			copy(window.location.origin+ '/t/' + (userinfo.name || ''));
			toast.success('Copy succeeded!');
		} else {
			actions.openConnect();
		}
	}

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
			console.log('all------activity------->', items);
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

	// const processPercant = (ele:any) => {
	// 	let count = 0
	// 	ele?.participants.map(
	// 		// eslint-disable-next-line array-callback-return
	// 		(element:any) => {
	// 			count += element.buy_entry_count
	// 		}
	// 	)
	// 	return Number(Number(count / ele.total_entries * 100).toFixed(0))
	// }

	useEffect(
		() => {
			getRaffleListFun();
		}, []
	)


	return (
		<section className="w-full pb-4 pt-16 lg:px-8">
			<div className="container pt-16 xxl:px-6rem66 xxxl:px-6rem66">
				<Row align="middle">
					<Col className="gutter-row" span={24} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 12 }}>
						<Space direction="vertical" size="large" style={{ width: '100%' }}>
							<BrText></BrText>
							<div className="slogen-detail pt-2">
								{state.slogenDetail}
							</div>
							<TweetAuth></TweetAuth>
							<Space className="pt-6 flex justify-center md:justify-start">
								<div className=" text-white rounded-full tracking-widest uppercase  transition-all relative disabled:opacity-40  relative flex justify-center items-center mx-auto w-full" onClick={() => sharetweet()}>
									<Button className='pr-6 uppercase' type="primary" shape="round" size="large">
										Share On Twitter &nbsp;<span className=" icon-twitter icon"></span>
									</Button>
								</div>
								<Button className='uppercase' type="primary" ghost shape="round" size="large" onClick={copyLink}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Copy Link&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Button>
							</Space>
						</Space>
					</Col>
					<Col className="gutter-row  md:block hidden" span={12}>
						<Image src={require('../../asstes/partImg/slogen.png').default} alt="" style={{ width: '63.187rem' }} preview={false}
							fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="
						/>
					</Col>
				</Row>
				<div>
					{
						liveNowData.featured.length > 0 ?
							<Row >
								<div className='livenow-title'>
									Featured
								</div>
							</Row> : <></>
					}
					<Row wrap gutter={[32, { xs: 12, sm: 12, md: 18, lg: 24 }]}>
						{
							liveNowData.featured.map((feature: RaffleItemData, index: any) => {
								return <>
									{/* className={[processPercant(feature) === 100 ? 'hidden' : ''].join(' ')} */}
									<Col md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 6 }} span={12} key={index}>
										<NFTCard cardData={feature}></NFTCard>
									</Col>
								</>
							})
						}
					</Row>

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
									<Col md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 6 }} span={12} key={index}>
										<NFTCard cardData={feature}></NFTCard>
									</Col>
								</>
							})
						}
					</Row>

					{
						liveNowData.upcoming.length > 0 ? <Row >
							<div className='livenow-title'>
								Up Coming
							</div>
						</Row> : <></>
					}

					<Row wrap gutter={[32, { xs: 12, sm: 12, md: 18, lg: 24 }]}>
						{
							liveNowData.upcoming.map((feature: RaffleItemData, index: any) => {
								return <>
									<Col md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 6 }} span={12} key={index}>
										<NFTCard cardData={feature}></NFTCard>
									</Col>
								</>
							})
						}
					</Row>

					{/* <Row className='pt-16'>
						<ReferralCard></ReferralCard>
					</Row> */}

					{
						liveNowData.all.length > 0 ? <Row >
							<div className='livenow-title'>
								All
							</div>
						</Row> : <></>
					}

					<Row wrap gutter={[32, { xs: 12, sm: 12, md: 18, lg: 24 }]}>
						{
							liveNowData.all.map((feature: RaffleItemData, index: any) => {
								return <>
									{/* className={[processPercant(feature) === 100 ? 'hidden' : ''].join(' ')} */}
									<Col md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 6 }} span={12} key={index}>
										<NFTCard cardData={feature}></NFTCard>
									</Col>
								</>
							})
						}
					</Row>


				</div>
			</div>
		</section>
	)
}

export default LiveNow;