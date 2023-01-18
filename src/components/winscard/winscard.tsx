import { useState } from "react";
import { LStorage } from "../../api/services/cooike/storage";
import { RaffleItemData } from "../../types/types";

/* eslint-disable @typescript-eslint/no-unused-vars */
interface propstype {
    cardData: RaffleItemData,
    selectedid?: any,
    checkedCallback?: (raffle_id:string) => void
}
const WinsCard = (props: propstype): JSX.Element => {

    const userinfo = LStorage.get('LastAuthUser');
    // const [selectedid, setselectedid] = useState(null)
    const checkedItem = (key: any) => {
        // setselectedid(key);
        if (props.checkedCallback) {
            props.checkedCallback(key);
        }
    }

    return (
        <>
            <article onClick={() => checkedItem(props.cardData.id)} className={["cursor-pointer flex flex-col bg-grey-6 rounded-3xl xl:rounded-3xl transition-all duration-200 lg:hover:scale-[1.03] relative group", props.selectedid === props.cardData.id ? 'border-3' : 'border-none'].join(' ')} style={{ borderColor: '#3A8AFF' }}>
                <figure className="w-full aspect-square rounded-xl overflow-hidden relative z-0 -top-[0.5px]">
                    <div className="relative pt-5 px-5">
                        <img className="transition-all rounded-3xl z-10 relative object-cover h-full w-full block relative z-10 opacity-100" src={
                            props.cardData.prize.image_url
                        } alt="" width="350" height="350" loading="lazy" decoding="async" draggable="false" />
                        <div style={{ width: 'fit-content' }} className="relative bg-white rounded-full -top-10 z-10 left-0 p-2 px-2 mx-2 text-black ">#{props.cardData.id}</div>
                    </div>
                </figure>
                <div className="px-5 xl:px-5">
                    <div className="flex flex-col">
                        <div className="grow overflow-hidden">
                            <div className="flex items-center justify-between">
                                <h3 className="text-base xl:text-xl text-white font-Bold relative">{props.cardData.prize.name}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 items-center justify-center pt-4 w-full px-6">
                        <span className="text-white whitespace-nowrap uppercase font-Bold text-base">Won by</span>
                        {/* <a aria-current="page" href="/mw/montereyjack3d" className="router-link-active router-link-exact-active flex items-center ml-1"> */}
                        <span className="relative flex justify-center text-center">
                            {
                                props.cardData.winner.avatar
                                    ?
                                    <img className="inline-block rounded-full bg-slate-600" src={props.cardData.winner.avatar} alt="" width="28" height="28" loading="lazy" />
                                    :
                                    <div className='flex items-center rounded-full bg-slate-600 justify-center user-name-first-word uppercase text-base' style={{
                                        width: '28px',
                                        height: '28px'
                                    }}>
                                        {userinfo.name?.substr(0, 1)}
                                    </div>
                            }
                        </span>
                        <span className="text-blue text-base font-Bold whitespace-nowrap text-ellipsis overflow-hidden">{props.cardData.winner.display_name}</span>
                        {/* </a> */}
                    </div>
                    <div className="flex items-center justify-center pt-2">
                        <span className="text-yellow-[FDE23B] font-Bold text-ellipsis overflow-hidden text-base xl:text-xl">{props.cardData.prize.value} BUSD</span>
                    </div>
                    <div className="text-white text-center text-base font-Bold uppercase py-4">
                        {props.cardData.participants.length || 0} participants
                    </div>
                </div>
                {
                    false ?
                        <div className="z-20 w-full h-full absolute bg-grey-6 opacity-90 rounded-3xl xl:rounded-3xl">
                            {
                                false ?
                                    <div className="bg-white text-black rouded-full m-3 m-auto text-center mt-28 w-32 h-32 rounded-full" style={{ lineHeight: '8rem' }} >
                                        Redeemed
                                    </div>
                                    :
                                    <div className="bg-white text-black rouded-full m-3 m-auto text-center mt-28 w-32 h-32 rounded-full" style={{ lineHeight: '8rem' }} >
                                        Reject
                                    </div>
                            }
                        </div>
                        :
                        <></>
                }
            </article>
        </>
    );
}

export default WinsCard;