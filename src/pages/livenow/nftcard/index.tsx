/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import _ from "lodash";
import { useEffect, useState } from "react";
import './index.scss';
import cardImg from '../../../asstes/tmpImg/cardImg.png';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Progress } from 'antd';
import { CallBackData, RaffleItemData } from "../../../types/types";
import { getPrice, getRaffleInfo } from "../../../api/services/http/api";
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite } from "wagmi";
import { BigNumber } from "ethers";
import useDebounce from "../../../libs/usehooks";
import { TimeInterval } from "../../../libs/userAgent";


interface propspromise {
	cardData: RaffleItemData
}
/* eslint-disable jsx-a11y/img-redundant-alt */
const NFTCard = (props: propspromise): JSX.Element => {
	const [state, setstate] = useState({});
	const [price, setPrice] = useState({
		usd: 0
	})

	const navigate = useNavigate();

	const debouncedTokenId = useDebounce(props.cardData, 0)

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
			args: [BigNumber.from(debouncedTokenId?.raffle_id || 0)],
			chainId: 97,
			enabled: false,
			onSuccess(data: any) {
			},
			onError(error: any) {
				console.log('Error1212122211', error)
			},
		})

	const getPriceFun = async () => {
		try {
			const data: CallBackData = await getPrice() as any
			setPrice(data.data.BUSD)


			if (isConnected) {
				refetchSupply()
			}

		} catch (error) {
			console.log('nftcard-getPriceFun:', error)
		}
	}

	useEffect(
		() => {
			getPriceFun()
		}, []
	)

	const percant = () => {
		let count = 0
		// eslint-disable-next-line array-callback-return
		props.cardData.participants.map((ele) => {
			count += ele.buy_entry_count
		})
		return Number(Number(count / props.cardData.total_entries * 100).toFixed(0));
	}

	const navigateTo = () => {
		navigate(`/productdetail/${props.cardData.id}`);
	}

	const getWinnerAvator = (displayName: any) => {
		let imgUrl = ''
		// getWinnerImg(displayName).then((val: any) => {
		//   if (val.avatar_url) {
		//     imgUrl = val.avatar_url
		//   }

		// })

		return imgUrl
	}

	return (
		<div className="card-content-nft-card lg:hover:scale-[1.03] "
		>
			<div className="card-img">
				<img className={props.cardData.category === 'upcoming' ? "pointer-events-none" : "cursor-pointer"} src={props.cardData.prize.image_url} alt="" onClick={navigateTo} />
				<div className="card-id" onClick={() => {
					// @ts-ignore
					write()
				}}>
					{props.cardData.prize.token_id}
				</div>
			</div>
			<div className="card-detail">
				<div className="card-name-value text-base lg:text-2-5xl ">
					<div className="card-name">{props.cardData.prize.name}</div>
					<div className="card-value">${Number(props.cardData.prize.value) * price.usd}</div>
				</div>
			</div>
			<div className="card-busd flex justify-between text-base lg:text-2-5xl">
				{
					props.cardData.winner.display_name !== '' ? <></> :
						<span>
							<span>{props.cardData.prize.value} BUSD</span>
							<img src={require('../../../asstes/partImg/binance.png').default} alt="" />
						</span>
				}
				{
					props.cardData.category !== "upcoming" ? <></> :
						<span className="icon icon-heart-full text-xl lg:text-xl rounded-full bg-grey-radio px-2 py-1">
							&nbsp;86
						</span>
				}
			</div>

			{
				props.cardData.category === "upcoming" ? <></> :
					<>
						<div className="card-progress">
							<div className="progress-bar">
								{
									props.cardData.winner.display_name === '' ?
										<>
											{
												percant() < 100 ? <Progress trailColor="#fff" percent={percant()} strokeColor='#1F95FF' />
													:
													<Progress percent={percant()} showInfo={false} trailColor="#fff" success={{ strokeColor: '#FDE23B' }} />
											}
											<div className="text-yellow-[FDE23B] py-1 px-1">
												{
													percant() === 100 ? '100%' : ''
												}
											</div>
										</>
										: <div className="wineer flex items-center justify-center  w-full pb-2">
											<span className="text-right">Won By</span>
											{
												props.cardData.winner.avatar
													? <img src={props.cardData.winner.avatar} alt="" className="rounded-full bg-slate-600 default-winner-img-size " />
													: <div className='flex mx-2 items-center justify-center user-name-first-word uppercase default-img rounded-full'>
														{props.cardData?.winner.display_name.substr(0, 1)}
													</div>
											}

											<span className="text-left">{props.cardData?.winner.display_name}</span>
										</div>

								}
							</div>

						</div>
						{/* <div className="card-button"> */}
						{/* <div className="uppercase link  text-base lg:text-xl"> */}
						{props.cardData.winner.display_name === '' ? <Link to={`/productdetail/${props.cardData.id}`} className="w-full rounded-full font-Bold button-background text-center uppercase link text-base lg:text-xl py-5"
							style={{
								background: `${props.cardData.winner.display_name === '' && percant() > 99 ? 'linear-gradient(104deg, #EC0F00 -1%, #FCDC66 100%)' : ''}`
							}}
						>
							{props.cardData.winner.display_name === '' && percant() > 99 ? 'closed' : 'Enter now'}
						</Link>
							:
							<button
								disabled
								className="w-full rounded-full font-Bold button-background text-center uppercase link text-base lg:text-xl py-5 text-white"
								style={{
									background: '#7C8893'
								}}
							>
								ended {
									TimeInterval(props.cardData.close_time)
								}
								&nbsp;ago
							</button>
						}

						{/* </div> */}
						{/* </div> */}
					</>
			}
		</div>
	);
}

export default NFTCard;