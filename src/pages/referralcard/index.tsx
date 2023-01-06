/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import _ from "lodash";
import { useEffect, useRef, useState } from "react";
import './index.scss'


/* eslint-disable jsx-a11y/img-redundant-alt */
const ReferralCard = (): JSX.Element => {
	const [state, setstate] = useState({});


	return (
		<div className="card-content-referral">
			<div className="card-referrals">
				<div className="dash-title">
					Earn Big Rewards With Referrals!
				</div>

				<div className="mention-info">
					Earn up to 2.5% commission when you invite friends to connect their wallets and participate in the event using
					your referral link.
				</div>

				<div className="id-adress">
					<span>
						2h23u3dio34ids9x9ks0g90s0
					</span>
				</div>

				<div className="button-share">
					<button>
						Share On Twitter
					</button>
					<button>
						Copy Link
						{/* <!-- <van-icon name="records"></van-icon> --> */}
					</button>
				</div>
			</div>
		</div>
	);
}

export default ReferralCard;