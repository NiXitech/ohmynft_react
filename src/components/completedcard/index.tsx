/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import _ from "lodash";
import { useState } from "react";
import './index.scss'


/* eslint-disable jsx-a11y/img-redundant-alt */
const CompletedCard = (props: any): JSX.Element => {
	const [state, setstate] = useState({});
	const { cardData } = props;

	return (
		<div className="card-content-completed">
			<div className="card-img">
				<img src={require('../../asstes/partImg/redeem.png').default} alt=""/>
				<div className="card-id">
					{ cardData.cardValue }
				</div>
			</div>
			<div className="card-detail">
				<div className="card-name-value">
					<div className="card-name">{ cardData.cardName }</div>
					<div className="card-value">{ cardData.cardValue }</div>
				</div>
			</div>
			<div className="card-busd">
				<span>{ cardData.BUSD } { cardData.unit }</span>
				<img src={require('../../asstes/partImg/binance.png').default} alt=""/>
			</div>
			<div className="card-progress">
				<div className="progress-bar">
					{/* <van-progress :percentage="cardData.progress" pivot-text="" stroke-width="8" color="#1F95FF" /> */}
				</div>
				<span>
					{ cardData.progress }%
				</span>
			</div>
			<div className="card-button">
				<button>
					Enter now
				</button>
			</div>
		</div>
	);
}

export default CompletedCard;