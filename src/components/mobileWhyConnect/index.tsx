import useStateHook from "../../pages/store";

const MobileWhyConnect = (): JSX.Element => {
  const [state, actions] = useStateHook();
  return (
    <>
      {
        state.showWhyConnect
          ? <div className="fixed z-40 inset-0 w-full h-screen flex bg-black/95 max-h-screen overflow-y-auto py-3 sm:px-3 cursor-pointer">
            <div className="relative w-full shadow-2xl rounded-2xl m-auto animate-slide-down-fade-in04s cursor-auto max-w-md py-8 bg-slate-800 max-w-md">
              <button aria-label="close" className="absolute z-10 flex justify-center items-center top-4 right-3 w-8 h-8 bg-slate-600 rounded-full transition-all hover:bg-slate-500 animate-slide-down-fade-in07s"
                onClick={() => {
                  actions.mobileWhyConnect()
                }}
              >
                <span className="icon-ico-x text-xs"></span>
              </button>
              <div className="bg-slate-800 px-4 md:px-7 pt-4 w-full">
                <article className="animate-fade-in">
                  <div className="text-center block">
                    <h1 className="text-3xl uppercase tracking-widest mt-5 text-center animate-slide-down-fade-in01s">Why connect?</h1>
                    <div className="text-slate-100 mt-4 mb-8 leading-tight animate-slide-down-fade-in04s text-center">
                      <p>ohmynft runs on the blockchain. Taking part requires a personal signature. No private data is shared with us. We will NEVER ask for an ‘Approve All’ state.</p>
                    </div>
                    <button className="text-md py-4 px-8 bg-slate-600 border-2 border-cyan-500 text-white rounded-full tracking-widest uppercase hover:bg-slate-800 hover:border-cyan-200 transition-all focus:bg-slate-800 focus:border-cyan-200 relative shadow-[0_0_2px_0] shadow-cyan-500 disabled:bg-slate-800 disabled:hover:bg-slate-800 shadow-none"
                      onClick={actions.openConnect()}
                    >
                      <span className="transition-all">
                        <span className="pr-3">
                          Connect Wallet
                        </span>
                        {/* <span className="icon2-ico-eth text-cyan-500 animate-glow-slow-cyan text-center absolute text-lg top-1/2 right-4 -translate-y-1/2"></span> */}
                        <img src={require('../../asstes/img/ico-eth-opacity-blue.svg').default} alt="ohmynft logo" width="11" height="18" className="inline-block relative -top-[2px] mr-[2px] h-4"></img>
                      </span>
                      <div className="opacity-0 transition-all absolute flex justify-center align-middle left-0 top-0 w-full h-full pointer-events-none overflow-hidden" role="status">
                        <img className="inline-block spinner-border animate-spin-slowing" src={require('../../asstes/img/spinner-white.svg').default} alt="" width="30" height="30" />
                      </div></button>
                  </div>
                </article>
              </div>
            </div>
          </div>
          : ''
      }
    </>
  );
}

export default MobileWhyConnect; 