// import Footer from "../../components/footer";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";
import { useEffect, useState } from 'react';
import { getReferralSummay } from '../../api/services/http/api';
import { summaryReferrals } from '../../types/types';
import './index.scss'
import { LStorage } from "../../api/services/cooike/storage";

const Referrals = (): JSX.Element => {
  const [summaryData, setSummaryData] = useState<summaryReferrals>();
  const [userLink, setUserLink] = useState('');
  const [tweetShareInfo, setTweetShareInfo] = useState('')

  useEffect(
    () => {
      getReferralSummayFun()
      // login user 
      let userinfo = LStorage.get('LastAuthUser');
      let linkTmp = process.env.REACT_APP_BASE_URL + '/' + userinfo.name
      setUserLink(linkTmp);
      let shareLink = 'http://twitter.com/share?' +
        'text=Join me at OH MY NFT, the most convenient place packed with the best giveaway prizes of real-world goods changing the way you win in Web3' +
        '&url=' + linkTmp + '&hashtags=WinninginWeb3';
      setTweetShareInfo(shareLink)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []
  )

  const getReferralSummayFun = async () => {
    try {
      // get referral summary data
      const ethereum_address = process.env.REACT_APP_CONTRACT_ADDRESS + '';
      const { code, data } = await getReferralSummay(ethereum_address) as any
      if (code === 200 && data) {
        setSummaryData(data);
      } else {
        // fail modal 
      }
    } catch (err) {
      console.log('getRaffleListFun:', err)
    }
  }

  // copy link
  const copyLink = () => {
    copy(userLink);
    toast.success('Copy succeeded!');
  }

  const [isActive, setIsActive] = useState('Summary')
  const cahngeTab = (name: string) => {
    setIsActive(name)
  }

  return (
    <>
      <main className="flex flex-wrap grow px-2 pb-10 lg:px-8 transition-all duration-300 page-enter:opacity-0 page-enter:-translate-y-4 layout-enter:opacity-0 layout-enter:-translate-y-4 pt-16">
        <div className="w-full mx-auto 5xl:container xxl:px-6rem66 xxxl:px-6rem66">
          <section className="animate-fade-in max-w-7xl mx-auto relative min-h-[50vh]">

            <nav className="flex justify-center md:justify-start referrals-tab">
              <div className="content flex justify-center md:justify-start">
                <button className={["uppercase text-base tracking-wider py-5 grow max-w-[150px] md:grow-0 md:max-w-none md:px-6 md:text-base overflow-hidden relative transition-all hover:text-cyan-500 text-cyan-500", isActive === 'Summary' ? "text-blue" : 'text-white/90'].join(' ')} onClick={() => cahngeTab('Summary')}><span>Summary</span>
                </button>
                <button className={["uppercase text-base tracking-wider py-5 grow max-w-[150px] md:grow-0 md:max-w-none md:px-6 md:text-base overflow-hidden relative transition-all hover:text-cyan-500 text-white", isActive === 'Referrals' ? "text-blue" : 'text-white/90'].join(' ')} onClick={() => cahngeTab('Referrals')}>
                  <span>Referrals</span>
                </button>
                <button className="uppercase router-link-active router-link-exact-active text-base tracking-wider py-5 grow max-w-[150px] md:grow-0 md:max-w-none md:px-6 md:text-base overflow-hidden relative transition-all hover:text-cyan-500 text-white">
                  <span>Withdrawals</span>
                </button>
              </div>
            </nav>

            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 referrals-info">
                <div className=" text-white rounded-xl mt-5 max-w-4xl mx-auto  left">
                  <h2 className="head flex justify-start items-center">
                    <img src={require('../../asstes/img/coin.png').default} alt="" />
                    <span>Earn Big Rewards With Referrals!</span>
                  </h2>
                  <p className="mb-3">
                    Earn up to 2.5% commission on each purchase made when your friends use your referral link to connect their wallets and buy entries. Join us now at the most convenient platform jam-packed with the best real-world giveaway prizes, changing the way you win in Web3.
                  </p>
                </div>
                <div className="w-full mt-3 md:mt-3 animate-fade-in">
                  <section className="referrals-share">
                    <input className="block relative w-full rounded-full outline-none transition-all appearance-none hover:appearance-none text-white" name="referralLink" type="text" placeholder="Referral link" disabled value={userLink} />
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                      <a href={tweetShareInfo} rel="noopener noreferrer" target="_blank" className=" text-white rounded-full tracking-widest uppercase  transition-all relative disabled:opacity-40  relative flex justify-center items-center mx-auto w-full">
                        <span className="text">Share on Twitter</span>
                        <span className=" icon-twitter icon "></span>
                      </a>
                      <button className=" text-white rounded-full tracking-widest uppercase  transition-all relative disabled:opacity-40  relative flex justify-center items-center mx-auto w-full" onClick={() => { copyLink() }}>
                        <span className="transition-all">
                          <span className="text">Copy link</span>
                          <span className=" icon-copy icon"></span>
                        </span>
                        <div className="opacity-0 transition-all absolute flex justify-center align-middle left-0 top-0 w-full h-full pointer-events-none overflow-hidden" role="status">
                          <img className="inline-block spinner-border animate-spin-slowing" src={'../../asstes/img/spinner-white.svg'} alt="" width="30" height="30" />
                        </div>
                      </button>

                    </div>

                  </section>
                </div>
              </div>
              <div className="mt-10 py-3 animate-fade-in referral-statistics">
                <h3 className="w-full  tracking-wider title">Referral Statistics</h3>
                <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-2">
                  <article className="item rounded-xl text-center pt-3 pb-2 last-of-type:col-span-2 md:last-of-type:col-auto">
                    <h2 className=" tracking-wider">Clicks</h2>
                    <h3 className=" text-base mb-3">
                      {summaryData?.clicks.lifetime}</h3>
                    <div className="flex justify-between mx-3 text-left">
                      <span>Today</span>
                      <span className="text-white">
                        {summaryData?.clicks.today}</span>
                    </div>
                    <div className="flex justify-between mx-3 text-left">
                      <span>Yesterday</span>
                      <span className="text-white">
                        {summaryData?.clicks.yesterday}
                      </span>
                    </div>

                    <div className="flex justify-between mx-3 text-left">
                      <span>This month</span>
                      <span className="text-white">
                        {summaryData?.clicks.thisMonth}</span>
                    </div>
                    <div className="flex justify-between mx-3 text-left">
                      <span>Last month</span>
                      <span className="text-white">
                        {summaryData?.clicks.lastMonth}</span>
                    </div>

                  </article>
                  <article className="item rounded-xl text-center pt-3 pb-2 last-of-type:col-span-2 md:last-of-type:col-auto">
                    <h2 className=" tracking-wider">Referrals</h2>
                    <h3 className=" text-base mb-3">
                      {summaryData?.referrals.lifetime}</h3>
                    <div className="flex justify-between mx-3 text-left">
                      <span>Today</span>
                      <span className="text-white">
                        {summaryData?.referrals.today}
                      </span>
                    </div>
                    <div className="flex justify-between mx-3 text-left">
                      <span>Yesterday</span>
                      <span className="text-white">
                        {summaryData?.clicks.yesterday}</span>
                    </div>

                    <div className="flex justify-between mx-3 text-left">
                      <span>This month</span>
                      <span className="text-white">
                        {summaryData?.referrals.thisMonth}
                      </span>
                    </div>
                    <div className="flex justify-between mx-3 text-left">
                      <span>Last month</span>
                      <span className="text-white">
                        {summaryData?.referrals.lastMonth}
                      </span>
                    </div>
                  </article>
                  <article className="item rounded-xl text-center pt-3 pb-2 last-of-type:col-span-2 md:last-of-type:col-auto">
                    <h2 className=" tracking-wider">Revenue</h2>
                    <h3 className=" text-base mb-3"><span className="icon-ico-eth inline-block mr-1 md:text-sm lg:text-lg"></span>{summaryData?.revenue.lifetime}</h3>
                    <div className="flex justify-between mx-3 text-left">
                      <span>Today</span>
                      <span className="text-white"><span className="icon-ico-eth inline-block top-[2px] mr-1 relative"></span>{summaryData?.revenue.today}</span>
                    </div>
                    <div className="flex justify-between mx-3 text-left">
                      <span>Yesterday</span>
                      <span className="text-white"><span className="icon-ico-eth inline-block top-[2px] mr-1 relative"></span>{summaryData?.revenue.yesterday}</span>
                    </div>

                    <div className="flex justify-between mx-3 text-left">
                      <span>This month</span>
                      <span className="text-white"><span className="icon-ico-eth inline-block top-[2px] mr-1 relative"></span>{summaryData?.revenue.thisMonth}</span>
                    </div>
                    <div className="flex justify-between mx-3 text-left">
                      <span>Last month</span>
                      <span className="text-white"><span className="icon-ico-eth inline-block top-[2px] mr-1 relative"></span>{summaryData?.revenue.lastMonth}</span>
                    </div>

                  </article>
                </div>
              </div>

            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default Referrals;