/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "antd";
import _ from "lodash";
import { useState } from "react";
import WinsCard from "../../components/winscard/winscard";


/* eslint-disable jsx-a11y/img-redundant-alt */
const Redeem = (): JSX.Element => {

    const [cardList, setCardList] = useState([{ id: 1, checked: false, redeemStatus: false }, { id: 2, checked: false, redeemStatus: false }, { id: 3, checked: false, redeemStatus: false }, { id: 4, checked: false, redeemStatus: false }, { id: 5, checked: false, redeemStatus: false }, { id: 6, checked: false, redeemStatus: false }]);

    const [modalOpen, setModalOpen] = useState(false);
    const attention = () => {
        setModalOpen(true)
    }

    const clickCallback = (id: any) => {
        const arr: any = [];
        // eslint-disable-next-line array-callback-return
        cardList.map((item, index) => {
            // eslint-disable-next-line eqeqeq
            if (item.id == id) {
                item.checked = true
            } else {
                item.checked = false
            }
            arr.push(item)
        })
        setCardList(arr)
    }

    return (
        // <WinsCard></WinsCard>
        <>
            {
                modalOpen &&
                <div className="fixed w-full h-full bg-black flex item-center " style={{ zIndex: '10000' }} onClick={() => setModalOpen(false)}>
                    <div className="container m-auto text-white"
                        style={{
                            width: '30rem',
                            height: '19rem',
                            background: '#021222',
                            borderRadius: '1.5rem',
                            marginTop: '10%'
                        }}
                    >
                        <div className="text-right text-2xl font-thin px-6 cursor-pointer" onClick={()=> setModalOpen(false)}>
                            &times;
                        </div>
                        <div className="text-white text-4xl py-10 text-center font-Bold">
                            Submitted
                        </div>
                        <div className="text-sm font-Regular ml-2 py-4 align-center px-6" style={{color: 'rgba(255,255,255,0.6)', lineHeight: '1.25rem'}}>
                            Your exchange request has been submitted for approval, and your funds will be transferred to your wallet within 48 hours.
                        </div>
                        <div className="text-center py-4 px-10">
                            <Button style={{borderRadius: '9999px', height:'3.25rem'}} className="w-full" type="primary" size="large">OK</Button>
                        </div>
                    </div>
                </div>
            }
            <div className="container pt-16 xxl:px-6rem66 xxxl:px-6rem66">
                <div className="mt-6 lg:mt-16 cordList-enter-to cordList-enter-active">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 lg:gap-4 lg:grid-cols-5 mb-5">
                        {
                            cardList.map((ele, index) => {
                                return (
                                    <WinsCard key={index} cardData={ele} clickCallback={(id: any) => { clickCallback(id) }}></WinsCard>
                                )
                            })
                        }
                    </div>
                    <div className="w-full text-center mt-28">
                        <Button onClick={() => { attention() }} className='pr-6 button-blue uppercase text-center border-none text-white text-xl font-Medium' ghost shape="round" size="large" style={{
                            backgroundColor: '#3A8AFF',
                            height: '4rem',
                            width: '19rem'
                        }}>
                            EXCHANGE
                            <span className="pl-2 icon-twitter icon"></span>
                        </Button>
                        <div className="py-4 font-sm font-Regular text-slate-100">
                            Physical delivery coming soon!
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Redeem;