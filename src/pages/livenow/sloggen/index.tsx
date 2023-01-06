/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import _ from "lodash";
import { useEffect, useRef, useState } from "react";
import './index.scss';


/* eslint-disable jsx-a11y/img-redundant-alt */
const Slogen = (): JSX.Element => {
	const [state, setstate] = useState({});


	return (
		<div className="card-content-slogen">
			<div className="card-left">
				<div className="slogen-Info">
					<span>
						Earn Big Rewards With
						<div className="referrals">Referrals!</div>
					</span>
				</div>
				<div className="slogen-detail">
					<div>
						Invite good friends to connect the wallet and participate in the event,
						you can get up to 25% commission, what are you waiting for, send the
						link to your friends!
					</div>
				</div>
				<div className="button-share">
					<button>
						Share On Twitter
					</button>
					<button>
						Copy Link
					</button>
				</div>
			</div>
			<div className="card-right">
				{/* <img src="../assets/partImg/slogen.png" /> */}
			</div>
		</div>
	);
}

export default Slogen;