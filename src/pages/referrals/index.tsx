// import Footer from "../../components/footer";
import './index.scss'

const Referrals = (): JSX.Element => {
  return (
    <>
      <main className="flex flex-wrap grow px-2 pb-10 lg:px-8 transition-all duration-300 page-enter:opacity-0 page-enter:-translate-y-4 layout-enter:opacity-0 layout-enter:-translate-y-4 pt-16">
        <div className="w-full mx-auto 5xl:container">
          <section className="animate-fade-in max-w-7xl mx-auto relative min-h-[50vh]">
            <nav className="flex justify-center md:justify-start referrals-tab">
              <div className="content flex justify-center md:justify-start">
                <button className="uppercase text-base tracking-wider py-5 grow max-w-[150px] md:grow-0 md:max-w-none md:px-6 md:text-base overflow-hidden relative transition-all hover:text-cyan-500 text-cyan-500"><span>Summary</span>
                </button>
                <button className="uppercase text-base tracking-wider py-5 grow max-w-[150px] md:grow-0 md:max-w-none md:px-6 md:text-base overflow-hidden relative transition-all hover:text-cyan-500 text-white"><span>Referrals</span>
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
                    <input className="block relative w-full rounded-full outline-none transition-all appearance-none hover:appearance-none text-white" name="referralLink" type="text" placeholder="Referral link" disabled value={'https://ohmynft.xyz/home/username'} />
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                      <a href="http://twitter.com/share?text=Take%20a%20look%20at%20MetaWin%2C%20the%20first%20decentralized%20NFT%20Competition%20marketplace%20where%20you%20can%20win%20NFTs%20from%20Blue%20Chip%20collections%20like%20Bored%20Ape%20and%20more&amp;url=https://metawin.com/t/will-zhao&amp;hashtags=WinninginWeb3" rel="noopener noreferrer" target="_blank" className=" text-white rounded-full tracking-widest uppercase  transition-all relative disabled:opacity-40  relative flex justify-center items-center mx-auto w-full">
                        <span className="text">Share on Twitter</span>
                        <span className=" icon-twitter icon "></span>
                      </a>
                      <button className=" text-white rounded-full tracking-widest uppercase  transition-all relative disabled:opacity-40  relative flex justify-center items-center mx-auto w-full">
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
                      0</h3>
                    <div className="flex justify-between mx-3 text-left">
                      <span>Today</span>
                      <span className="text-white">
                        0</span>
                    </div>
                    <div className="flex justify-between mx-3 text-left">
                      <span>Yesterday</span>
                      <span className="text-white">
                        0</span>
                    </div>
                    <div className="flex justify-between mx-3 text-left" style={{ display: 'none' }}>
                      <span>Last 7 days</span>
                      <span className="text-white">
                        0</span>
                    </div>
                    <div className="flex justify-between mx-3 text-left">
                      <span>This month</span>
                      <span className="text-white">
                        0</span>
                    </div>
                    <div className="flex justify-between mx-3 text-left">
                      <span>Last month</span>
                      <span className="text-white">
                        0</span>
                    </div>
                    <div className="flex justify-between mx-3 text-left" style={{ display: 'none' }}>
                      <span>Lifetime</span>
                      <span className="text-white">
                        0</span>
                    </div>
                  </article>
                  <article className="item rounded-xl text-center pt-3 pb-2 last-of-type:col-span-2 md:last-of-type:col-auto">
                    <h2 className=" tracking-wider">Rreferrals</h2>
                    <h3 className=" text-base mb-3">
                      0</h3>
                    <div className="flex justify-between mx-3 text-left">
                      <span>Today</span>
                      <span className="text-white">
                        0</span>
                    </div>
                    <div className="flex justify-between mx-3 text-left">
                      <span>Yesterday</span>
                      <span className="text-white">
                        0</span>
                    </div>
                    <div className="flex justify-between mx-3 text-left" style={{ display: 'none' }}>
                      <span>Last 7 days</span>
                      <span className="text-white">
                        0</span>
                    </div>
                    <div className="flex justify-between mx-3 text-left">
                      <span>This month</span>
                      <span className="text-white">
                        0</span>
                    </div>
                    <div className="flex justify-between mx-3 text-left">
                      <span>Last month</span>
                      <span className="text-white">
                        0</span>
                    </div>
                    <div className="flex justify-between mx-3 text-left" style={{ display: 'none' }}>
                      <span>Lifetime</span>
                      <span className="text-white">
                        0</span>
                    </div>
                  </article>
                  <article className="item rounded-xl text-center pt-3 pb-2 last-of-type:col-span-2 md:last-of-type:col-auto">
                    <h2 className=" tracking-wider">Revenue</h2>
                    <h3 className=" text-base mb-3"><span className="icon-ico-eth inline-block mr-1 md:text-sm lg:text-lg"></span>0</h3>
                    <div className="flex justify-between mx-3 text-left">
                      <span>Today</span>
                      <span className="text-white"><span className="icon-ico-eth inline-block top-[2px] mr-1 relative"></span>0</span>
                    </div>
                    <div className="flex justify-between mx-3 text-left">
                      <span>Yesterday</span>
                      <span className="text-white"><span className="icon-ico-eth inline-block top-[2px] mr-1 relative"></span>0</span>
                    </div>
                    <div className="flex justify-between mx-3 text-left" style={{ display: 'none' }}>
                      <span>Last 7 days</span>
                      <span className="text-white"><span className="icon-ico-eth inline-block top-[2px] mr-1 relative"></span>0</span>
                    </div>
                    <div className="flex justify-between mx-3 text-left">
                      <span>This month</span>
                      <span className="text-white"><span className="icon-ico-eth inline-block top-[2px] mr-1 relative"></span>0</span>
                    </div>
                    <div className="flex justify-between mx-3 text-left">
                      <span>Last month</span>
                      <span className="text-white"><span className="icon-ico-eth inline-block top-[2px] mr-1 relative"></span>0</span>
                    </div>
                    <div className="flex justify-between mx-3 text-left" style={{ display: 'none' }}>
                      <span>Lifetime</span>
                      <span className="text-white"><span className="icon-ico-eth inline-block top-[2px] mr-1 relative"></span>0</span>
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