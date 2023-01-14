/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import copy from "copy-to-clipboard";
import _ from "lodash";
import { useState } from "react";
import { toast } from "react-toastify";
import { LStorage } from "../../api/services/cooike/storage";
import './index.scss'


/* eslint-disable jsx-a11y/img-redundant-alt */
const ReferralCard = (): JSX.Element => {
	const [tweetShareInfo, setTweetShareInfo] = useState('')
	const userinfo = LStorage.get('LastAuthUser') || {};
	console.log('userinfo', userinfo)

	const sharetweet = () => {
		let userLink = 'https://ohmynft.xyz/home/' + userinfo.name;
		let shareLink = 'http://twitter.com/share?' +
			'text=Join me at OH MY NFT, the most convenient place packed with the best giveaway prizes of real-world goods changing the way you win in Web3' +
			'&url=' + userLink + '&hashtags=WinninginWeb3';
		setTweetShareInfo(shareLink)
	}

	// copy link
	const copyLink = () => {
		copy('https://ohmynft.xyz/home/');
		toast.success('Copy succeeded!');
	}

	return (
		<div className="card-content-referral w-full">
			<div className="container card-referrals grid grid-cols-1 pt-32 rounded-6xl pb-10">
				<div className="dash-title ">
					<span className="text-5xl px-12 py-10">
						Earn Big Rewards With Referrals!
					</span>
				</div>

				<div className="mention-info pt-12 text-sm">
					Earn up to 2.5% commission when you invite friends to connect their wallets and participate in the event using
					your referral link.
				</div>

				{
					userinfo.address ?
						<div className="id-adress text-sm mt-12 h-16 rounded-4xl">
							<span className="px-10">
								{userinfo.name}
							</span>
						</div> : <></>
				}

				<div className="py-10 button-share grid grid-cols-2 w-full gap-2">
					<a href={tweetShareInfo} rel="noopener noreferrer" target="_blank" className="h-16 text-white rounded-full tracking-widest uppercase items-center ">
						<button className="h-16 px-4 text-white rounded-full rounded-full uppercase items-center w-full" >
							Share On Twitter &nbsp;<span className=" icon-twitter icon"></span>
						</button>
					</a>
					<button className="h-16 px-4 text-white rounded-full tracking-widest rounded-full uppercase  relative flex justify-center items-center mx-auto w-full" onClick={copyLink}>Copy Link <span className=" icon-copy icon"></span></button>
				</div>
			</div>
		</div>
	);
}

export default ReferralCard;