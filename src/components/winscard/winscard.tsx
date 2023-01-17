/* eslint-disable @typescript-eslint/no-unused-vars */
const WinsCard = (props): JSX.Element => {

    return (
        <>
            <article onClick={()=> props.clickCallback(props.cardData.id)} className={["cursor-pointer flex flex-col bg-grey-6 rounded-3xl xl:rounded-3xl transition-all duration-200 lg:hover:scale-[1.03] relative group", props.cardData.checked && !props.cardData.redeemStatus ? 'border-3' : 'border-none'].join(' ')} style={{ borderColor: '#3A8AFF' }}>
                <figure className="w-full aspect-square rounded-xl overflow-hidden relative z-0 -top-[0.5px]">
                    <div className="relative pt-5 px-5">
                        <img className="transition-all rounded-3xl z-10 relative object-cover h-full w-full block relative z-10 opacity-100" src="https://i.seadn.io/gae/AOUDTbuATAzvgGTS6J3xP2lDNevT0cIvHRCr0xWo8bTtRRnspZPgso2SjSOP_RLQ3COogtEwplZZ0c8ZJvv8BO3Z79KRy9anokdJ?fit=max&amp;w=350&amp;auto=format" alt="" width="350" height="350" loading="lazy" decoding="async" draggable="false" />
                        <div style={{ width: 'fit-content' }} className="relative bg-white rounded-full -top-10 z-10 left-0 p-2 px-2 mx-2 text-black ">#123</div>
                    </div>
                </figure>
                <div className="px-5 xl:px-5">
                    <div className="flex flex-col">
                        <div className="grow overflow-hidden">
                            <div className="flex items-center justify-between">
                                <h3 className="text-base xl:text-xl text-white font-Bold relative">victor</h3>
                                <div className="flex items-center justify-end">
                                    {/* <span className="text-slate-100 font-Bold text-ellipsis overflow-hidden text-base xl:text-xl">∼</span> */}
                                    {/* <img src="https://metawin.com/_nuxt/ico-eth-opacity-black.1761ffc0.svg" alt="ohmynft logo" width="8" height="16" className="inline-block mr-[2px] opacity-80" /> */}
                                    <span className="text-yellow-[FDE23B] font-Bold text-ellipsis overflow-hidden text-base xl:text-xl">0.7 BNB</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 items-center justify-center pt-4 w-full px-6">
                        <span className="text-white whitespace-nowrap uppercase font-Bold text-base">Won by</span>
                        {/* <a aria-current="page" href="/mw/montereyjack3d" className="router-link-active router-link-exact-active flex items-center ml-1"> */}
                        <span className="relative mr-1 text-center">
                            <img className="inline-block rounded-full" src="https://content.prod.platform.metawin.com/avatars/template/default.png" alt="" width="28" height="28" loading="lazy" />
                        </span>
                        <span className="text-blue text-base font-Bold whitespace-nowrap text-ellipsis overflow-hidden">MontereyJack3D</span>
                        {/* </a> */}
                    </div>
                    <div className="text-white text-center text-base font-Bold uppercase py-4">
                        26 {JSON.stringify(props.cardData.checked)} participants
                    </div>
                </div>
                {
                    props.redeemStatus ?
                        <div className="z-20 w-full h-full absolute bg-grey-6 opacity-90 rounded-3xl xl:rounded-3xl">
                            {
                                props.redeemStatus ?
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