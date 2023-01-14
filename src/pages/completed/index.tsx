/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import _ from "lodash";
import { useEffect, useState } from "react";
import { Col, Row } from 'antd';
import './index.scss'
// import CompletedCard from '../../components/completedcard'
import NFTCard from '../livenow/nftcard/index'
import { getRaffleList } from "../../api/services/http/api";
import { RaffleItemData } from "../../types/types";



/* eslint-disable jsx-a11y/img-redundant-alt */
const Completed = (): JSX.Element => {
	const [completedData, setCompletedData] = useState({
		featured: [],
		upcoming: [],
		endsoon: [],
		all: []
	})

	useEffect(
		() => {
			getRaffleListFun();
		}, []
	)


	const getRaffleListFun = async () => {
		try {
			// 获取全站activity
			const { code, data: { items } } = await getRaffleList({
				status: 'completed',
				offset: 0,
				limit: 100000,
			}) as any
			if (code === 200) {
				seletSortLiveNowData(items);
			} else {
				// 提示弹框
			}
		} catch (err) {
			console.log('getRaffleListFun:', err)
		}
	}

	const seletSortLiveNowData = (data: RaffleItemData[]) => {
		if (data === null) return
		let completedDataTmp: any = {
			featured: [],
			upcoming: [],
			endsoon: [],
			all: []
		};
		data.forEach((ele: any) => {
			// console.log(ele)
			if (ele.category === "featured") {
				completedDataTmp.featured.push(ele)
			} else if (ele.category === 'upcoming') {
				completedDataTmp.upcoming.push(ele)
			} else {
				completedDataTmp.all.push(ele)
			}
		})
		setCompletedData(completedDataTmp)
	}


	return (
		<div className="container xxl:px-6rem66 xxxl:px-6rem66">
			<section className="w-full pb-4">
				{
					completedData.featured.length === 0 ?
						<div className="text-center w-full">
							<h2 className="text-center w-full px-3 lg:text-xl py-3 text-white font-Bold">
								<span>Nothing to display</span>
							</h2>
						</div> :
						<div className="home-page-completed w-full pb-4 ">
							<div className="py-6">
								<Row wrap gutter={[16, { xs: 12, sm: 12, md: 18, lg: 24 }]}>
									{
										completedData.featured.map(
											(completed: RaffleItemData, index: any) => {
												return <Col md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 6 }} span={12} key={index}>
													<NFTCard cardData={completed}></NFTCard>
												</Col>
											}
										)
									}
								</Row>
							</div>
						</div>
				}
			</section>
		</div>
	);
}

export default Completed;