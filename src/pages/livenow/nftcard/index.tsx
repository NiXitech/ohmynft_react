/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import _ from "lodash";
import { useState } from "react";
import './index.scss';
import cardImg from '../../../asstes/tmpImg/cardImg.png';
import { useNavigate } from 'react-router-dom';
import { Progress } from 'antd';


/* eslint-disable jsx-a11y/img-redundant-alt */
const NFTCard = (props: any): JSX.Element => {
	const [state, setstate] = useState({});
	const { cardData } = props;
	const navigate = useNavigate();

	const routerToDetail = ()=> {
		navigate('/productdetail')
	}

	return (
		<div className="card-content-nft-card">
			<div className="card-img">
				<img src={cardImg} alt="" />
				<div className="card-id">
					{cardData.cardValue}
				</div>
			</div>
			<div className="card-detail">
				<div className="card-name-value">
					<div className="card-name">{cardData.cardName}</div>
					<div className="card-value">{cardData.cardValue}</div>
				</div>
			</div>
			<div className="card-busd">
				<span>{cardData.BUSD} {cardData.unit}</span>
				<img src={require('../../../asstes/partImg/binance.png').default} alt="" />
			</div>
			<div className="card-progress">
				<div className="progress-bar">
					<Progress percent={30} />
				</div>
			</div>
			<div className="card-button">
				<button className="uppercase" onClick={routerToDetail}>
					Enter now
				</button>
			</div>
		</div>
	);
}

export default NFTCard;