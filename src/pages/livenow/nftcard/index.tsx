/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import _ from "lodash";
import { useEffect, useState } from "react";
import './index.scss';
import cardImg from '../../../asstes/tmpImg/cardImg.png';
import { Link, useNavigate } from 'react-router-dom';
import { Progress } from 'antd';
import { CallBackData, RaffleItemData } from "../../../types/types";
import { getPrice } from "../../../api/services/http/api";
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite } from "wagmi";
import { BigNumber } from "ethers";
import useDebounce from "../../../libs/usehooks";


interface propspromise {
	cardData: RaffleItemData
}
/* eslint-disable jsx-a11y/img-redundant-alt */
const NFTCard = (props: propspromise): JSX.Element => {
	console.log('props->', props)
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
				console.log('Success', data)
			},
			onError(error: any) {
				console.log('Error1212122211', error)
			},
		})

	const getPriceFun = async () => {
		try {
			const data: CallBackData = await getPrice() as any
			setPrice(data.data.BUSD)


			console.log('%c🀃 { }', 'color: #00e600; font-size: 20px;', isConnected, address);
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
		let  count = 0
		// eslint-disable-next-line array-callback-return
		props.cardData.participants.map((ele)=>{
			count += ele.buy_entry_count
		})
		return Number(Number(count / props.cardData.total_entries * 100).toFixed(0));
	}

	const navigateTo = ()=> {
		navigate(`/productdetail/${props.cardData.id}`);
	}


	return (
		<div className="card-content-nft-card">
			<div className="card-img">
				<img className="cursor-pointer" src={props.cardData.prize.image_url} alt="" onClick={navigateTo}/>
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
				<span>
					<span>{props.cardData.prize.value} BUSD</span>
					<img src={require('../../../asstes/partImg/binance.png').default} alt="" />
				</span>
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
								{/* countEntire/total */}
								<Progress trailColor="#fff" percent={percant()} strokeColor='#1F95FF' />
							</div>
						</div>
						{/* <div className="card-button"> */}
							{/* <div className="uppercase link  text-base lg:text-xl"> */}
								<Link to={`/productdetail/${props.cardData.id}`}  className="w-full rounded-full font-Bold button-background text-center uppercase link text-base lg:text-xl py-5">
									Enter now
								</Link>
							{/* </div> */}
						{/* </div> */}
					</>
			}
		</div>
	);
}

export default NFTCard;