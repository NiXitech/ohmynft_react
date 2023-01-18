import { useEffect, useState } from "react";
import { LStorage } from "../../api/services/cooike/storage";
import { getnotification, refreshNotification } from "../../api/services/http/api";
import './index.scss'

const Notification = (): JSX.Element => {
	const [detailInfo, setdetailInfo] = useState(true);
	const [textInfo, settextInfo] = useState('')
	const [notiList, setnotiList] = useState([
		{
			category: '',
			display_name: '',
			id: 0,
			raffle_activity_id: 0,
			raffle_id: 0,
			read: false
		}
	])

	const backInfoHome = () => {
		setdetailInfo(!detailInfo)
	}

	const showDetailInfo = (item: any) => {
		refreshNotificationFun()
		setdetailInfo(false)
		settextInfo(item)
	}

	const refreshNotificationFun = async () => {
		try {
			let userInfo = LStorage.get('LastAuthUser')
			const { code, data } = await refreshNotification(userInfo.address || '') as any
			if (code === 200) {
				console.log('nononononononononononononononononono----no---------->', data);
			}
		} catch (error) {

		}
	}

	const getnotificationFun = async () => {
		try {
			let userInfo = LStorage.get('LastAuthUser')
			const { code, data } = await getnotification(userInfo.address || '') as any
			if (code === 200) {
				setnotiList(data)
			}
		} catch (error) {

		}
	}

	useEffect(
		() => {
			getnotificationFun()
		}, []
	)


	return (
		<>
			<div className="activity-page container">
				<div className="text-title" onClick={() => backInfoHome()}>
					Notifications
				</div>
				{
					detailInfo &&
					<div className="text-list" >
						{
							notiList.map(
								(item, index) => {
									return (
										<div className="text-row" key={index} onClick={() => showDetailInfo(item.category)}>
											<div className="text-column">
												{item.category || ''}
											</div>
											<div className="text-column-time">
												{item.raffle_activity_id}
											</div>
										</div>
									)
								}
							)
						}
					</div>
				}
				{
					!detailInfo &&
					<div className="text-detail">
						{textInfo}
					</div>
				}
			</div>
		</>
	);
}

export default Notification;