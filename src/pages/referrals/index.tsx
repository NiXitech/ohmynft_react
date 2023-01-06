import Footer from "../../components/footer";

const Referrals = (): JSX.Element => {
  return (
    <>
      <main className="flex flex-wrap grow px-2 pb-10 lg:px-8 transition-all duration-300 page-enter:opacity-0 page-enter:-translate-y-4 layout-enter:opacity-0 layout-enter:-translate-y-4 pt-16">
        <div className="w-full mx-auto 5xl:container">
          <section className="animate-fade-in max-w-7xl mx-auto relative min-h-[50vh]">
            <nav className="flex justify-center md:justify-start px-1 md:px-0 border-b border-slate-500">
              <button className="uppercase text-sm tracking-wider py-5 grow max-w-[150px] md:grow-0 md:max-w-none md:px-6 md:text-base overflow-hidden relative transition-all hover:text-cyan-500 text-cyan-500"><span>Summary</span>
              </button>
              <button className="uppercase text-sm tracking-wider py-5 grow max-w-[150px] md:grow-0 md:max-w-none md:px-6 md:text-base overflow-hidden relative transition-all hover:text-cyan-500 text-white"><span>Referrals</span>
              </button>
            </nav>

            <div>
              <div className="text-center p-3 text-white bg-slate-800 rounded-xl mt-5 max-w-4xl mx-auto text-sm lg:text-base">
                <p className="mb-3 font-bold text-base lg:text-lg">Earn ETH by sharing MetaWin!</p>
                <p className="mb-3">Post your unique tracker in your socials, in your Discord and send it to anyone with a passion for NFTs with a little explanation of MetaWin.</p>
                <p className="mb-3">You’ll be rewarded handsomely with 2.5% of their purchases day after day paid to you in ETH.</p>
                <p>Not bad!</p>
              </div>
              <div className="w-full max-w-sm m-auto mt-3 md:mt-3 animate-fade-in">
                <section>
                  <p className="text-slate-200 text-center mb-3">Here's the link:</p>
                  <input className="block relative w-full bg-slate-600 border-slate-600 rounded-lg py-3 px-4 border-2 outline-none focus:border-slate-200 focus:ring-0 autofill:bg-slate-600 transition-all appearance-none hover:appearance-none text-white disabled:text-white" name="referralLink" type="text" placeholder="Referral link" />
                  <button className="text-md py-4 px-8 bg-blue-400 text-white rounded-full tracking-widest uppercase hover:bg-blue-500 transition-all focus:bg-blue-500 relative disabled:opacity-40 disabled:hover:bg-blue-500 mt-3 relative flex justify-center items-center mx-auto w-full"><span className="transition-all"><span className="pr-4">Copy link</span><span className="text-2xl icon-ico-copy absolute right-5 top-3"></span></span>
                    <div className="opacity-0 transition-all absolute flex justify-center align-middle left-0 top-0 w-full h-full pointer-events-none overflow-hidden" role="status">
                      <img className="inline-block spinner-border animate-spin-slowing" src="https://metawin.com/_nuxt/spinner-white.d8595d4a.svg" alt="" width="30" height="30" />
                    </div></button>
                  <a href="http://twitter.com/share?text=Take%20a%20look%20at%20MetaWin%2C%20the%20first%20decentralized%20NFT%20Competition%20marketplace%20where%20you%20can%20win%20NFTs%20from%20Blue%20Chip%20collections%20like%20Bored%20Ape%20and%20more&amp;url=https://metawin.com/t/will-zhao&amp;hashtags=WinninginWeb3" rel="noopener noreferrer" target="_blank" className="text-md py-4 px-8 bg-blue-400 text-white rounded-full tracking-widest uppercase hover:bg-blue-500 transition-all focus:bg-blue-500 relative disabled:opacity-40 disabled:hover:bg-blue-500 mt-3 relative flex justify-center items-center mx-auto w-full"><span className="pr-4">Share on Twitter</span><span className="text-2xl icon-ico-twitter absolute right-5 top-3"></span></a>

                </section>
              </div>
              <div className="mt-10 py-3 border-t border-slate-500 animate-fade-in">
                <h3 className="w-full mb-3 uppercase text-sm md:text-base tracking-wider text-center">Your statistics</h3>
                <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-2">
                  <article className="bg-slate-800 rounded-xl text-center pt-3 pb-2 last-of-type:col-span-2 md:last-of-type:col-auto">
                    <h2 className="uppercase tracking-wider text-sm text-slate-100">clicks</h2>
                    <h3 className="font-bold text-base md:text-xl lg:text-2xl mb-3">
                      0</h3>
                    <div className="flex justify-between text-xs mx-3 text-slate-100 text-left border-t py-1 px-1 border-slate-400 hover:bg-slate-700">
                      <span>Today</span>
                      <span className="text-white">
                        0</span>
                    </div>
                    <div className="flex justify-between text-xs mx-3 text-slate-100 text-left border-t py-1 px-1 border-slate-400 hover:bg-slate-700">
                      <span>Yesterday</span>
                      <span className="text-white">
                        0</span>
                    </div>
                    <div className="flex justify-between text-xs mx-3 text-slate-100 text-left border-t py-1 px-1 border-slate-400 hover:bg-slate-700" style={{ display: 'none' }}>
                      <span>Last 7 days</span>
                      <span className="text-white">
                        0</span>
                    </div>
                    <div className="flex justify-between text-xs mx-3 text-slate-100 text-left border-t py-1 px-1 border-slate-400 hover:bg-slate-700">
                      <span>This month</span>
                      <span className="text-white">
                        0</span>
                    </div>
                    <div className="flex justify-between text-xs mx-3 text-slate-100 text-left border-t py-1 px-1 border-slate-400 hover:bg-slate-700">
                      <span>Last month</span>
                      <span className="text-white">
                        0</span>
                    </div>
                    <div className="flex justify-between text-xs mx-3 text-slate-100 text-left border-t py-1 px-1 border-slate-400 hover:bg-slate-700" style={{ display: 'none' }}>
                      <span>Lifetime</span>
                      <span className="text-white">
                        0</span>
                    </div>
                  </article>
                  <article className="bg-slate-800 rounded-xl text-center pt-3 pb-2 last-of-type:col-span-2 md:last-of-type:col-auto">
                    <h2 className="uppercase tracking-wider text-sm text-slate-100">referrals</h2>
                    <h3 className="font-bold text-base md:text-xl lg:text-2xl mb-3">
                      0</h3>
                    <div className="flex justify-between text-xs mx-3 text-slate-100 text-left border-t py-1 px-1 border-slate-400 hover:bg-slate-700">
                      <span>Today</span>
                      <span className="text-white">
                        0</span>
                    </div>
                    <div className="flex justify-between text-xs mx-3 text-slate-100 text-left border-t py-1 px-1 border-slate-400 hover:bg-slate-700">
                      <span>Yesterday</span>
                      <span className="text-white">
                        0</span>
                    </div>
                    <div className="flex justify-between text-xs mx-3 text-slate-100 text-left border-t py-1 px-1 border-slate-400 hover:bg-slate-700" style={{ display: 'none' }}>
                      <span>Last 7 days</span>
                      <span className="text-white">
                        0</span>
                    </div>
                    <div className="flex justify-between text-xs mx-3 text-slate-100 text-left border-t py-1 px-1 border-slate-400 hover:bg-slate-700">
                      <span>This month</span>
                      <span className="text-white">
                        0</span>
                    </div>
                    <div className="flex justify-between text-xs mx-3 text-slate-100 text-left border-t py-1 px-1 border-slate-400 hover:bg-slate-700">
                      <span>Last month</span>
                      <span className="text-white">
                        0</span>
                    </div>
                    <div className="flex justify-between text-xs mx-3 text-slate-100 text-left border-t py-1 px-1 border-slate-400 hover:bg-slate-700" style={{ display: 'none' }}>
                      <span>Lifetime</span>
                      <span className="text-white">
                        0</span>
                    </div>
                  </article>
                  <article className="bg-slate-800 rounded-xl text-center pt-3 pb-2 last-of-type:col-span-2 md:last-of-type:col-auto">
                    <h2 className="uppercase tracking-wider text-sm text-slate-100">revenue</h2>
                    <h3 className="font-bold text-base md:text-xl lg:text-2xl mb-3"><span className="icon-ico-eth inline-block text-xs mr-1 md:text-sm lg:text-lg"></span>0</h3>
                    <div className="flex justify-between text-xs mx-3 text-slate-100 text-left border-t py-1 px-1 border-slate-400 hover:bg-slate-700">
                      <span>Today</span>
                      <span className="text-white"><span className="icon-ico-eth inline-block top-[2px] mr-1 relative"></span>0</span>
                    </div>
                    <div className="flex justify-between text-xs mx-3 text-slate-100 text-left border-t py-1 px-1 border-slate-400 hover:bg-slate-700">
                      <span>Yesterday</span>
                      <span className="text-white"><span className="icon-ico-eth inline-block top-[2px] mr-1 relative"></span>0</span>
                    </div>
                    <div className="flex justify-between text-xs mx-3 text-slate-100 text-left border-t py-1 px-1 border-slate-400 hover:bg-slate-700" style={{ display: 'none' }}>
                      <span>Last 7 days</span>
                      <span className="text-white"><span className="icon-ico-eth inline-block top-[2px] mr-1 relative"></span>0</span>
                    </div>
                    <div className="flex justify-between text-xs mx-3 text-slate-100 text-left border-t py-1 px-1 border-slate-400 hover:bg-slate-700">
                      <span>This month</span>
                      <span className="text-white"><span className="icon-ico-eth inline-block top-[2px] mr-1 relative"></span>0</span>
                    </div>
                    <div className="flex justify-between text-xs mx-3 text-slate-100 text-left border-t py-1 px-1 border-slate-400 hover:bg-slate-700">
                      <span>Last month</span>
                      <span className="text-white"><span className="icon-ico-eth inline-block top-[2px] mr-1 relative"></span>0</span>
                    </div>
                    <div className="flex justify-between text-xs mx-3 text-slate-100 text-left border-t py-1 px-1 border-slate-400 hover:bg-slate-700" style={{ display: 'none' }}>
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
      <Footer></Footer>
    </>
  );
}

export default Referrals;