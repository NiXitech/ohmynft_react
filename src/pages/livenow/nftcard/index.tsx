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
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import { BigNumber } from "ethers";
import useDebounce from "../../../libs/usehooks";
import { toast } from "react-toastify";


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
	// const {
	// 	config,
	// 	error: prepareError,
	// 	isError: isPrepareError,
	// 	isSuccess: perSuccess
	// } = usePrepareContractWrite({
	// 	address: debouncedTokenId.contract_address,
	// 	abi: [
	// 		{
	// 			"inputs": [{
	// 				"internalType": "uint256",
	// 				"name": "",
	// 				"type": "uint256"
	// 			}
	// 			],
	// 			"name": "raffles",
	// 			"outputs": [],
	// 			"stateMutability": "view",
	// 			"type": "function"
	// 		},
	// 	],
	// 	functionName: 'raffles',
	// 	args: [BigNumber.from(debouncedTokenId.raffle_id)],

	// 	chainId: 97,
	// 	// cacheTime: 2_000,
	// 	// enabled: Boolean(debouncedTokenId.contractddress),
	// 	// staleTime: 2_000,
	// 	onSuccess(data: any) {
	// 		console.log('Success', data)
	// 	},
	// 	onError(error: any) {
	// 		console.log('Error1212122211', error.message)
	// 	},
	// });

	// const { data, error, isError, write, isLoading } = useContractWrite({
	// 	...config,
	// 	onSuccess(data: any) {
	// 		console.log('Success useContractWrite', data)
	// 		toast.success('The transaction is successful, waiting for block confirmation！')
	// 	},
	// 	onError(error: any) {
	// 		console.log('Error1212122211 useContractWrite', error.message)
	// 		toast.error(error.message)
			
	// 	},
	// })


	const getPriceFun = async () => {
		try {
			const data: CallBackData = await getPrice() as any
			setPrice(data.data.BUSD)
		} catch (error) {
			console.log('nftcard-getPriceFun:', error)
		}
	}



	useEffect(
		() => {
			getPriceFun()
			
		}, []
	)

	useEffect(()=> {
		// console.log(write, config)
		// if(write !== undefined) {
		// 	// @ts-ignore
		// 	write()
		// }
		
	})

	return (
		<div className="card-content-nft-card">
			<div className="card-img">
				<img src={props.cardData.prize.image_url} alt="" />
				<div className="card-id" onClick={()=>{
					// @ts-ignore
					write()
				}}>
					{props.cardData.prize.token_id}
				</div>
			</div>
			<div className="card-detail">
				<div className="card-name-value">
					<div className="card-name">{props.cardData.prize.name}</div>
					<div className="card-value">${Number(props.cardData.prize.value) * price.usd}</div>
				</div>
			</div>
			<div className="card-busd">
				<span>{props.cardData.prize.value} BUSD</span>
				<img src={require('../../../asstes/partImg/binance.png').default} alt="" />
			</div>
			<div className="card-progress">
				<div className="progress-bar">
					{/* countEntire/total */}
					<Progress percent={Number(Number(props.cardData.max_entries_per_user / props.cardData.total_entries).toFixed(2))} />
				</div>
			</div>
			<div className="card-button">
				<div className="uppercase link">
					<Link to={'/productdetail'} >
						Enter now
					</Link>
				</div>
			</div>
		</div>
	);
}

export default NFTCard;