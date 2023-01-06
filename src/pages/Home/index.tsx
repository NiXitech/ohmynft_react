/* eslint-disable jsx-a11y/img-redundant-alt */
import { useEffect, useState } from "react";
import Footer from "../../components/footer";
import { getQueryVariable, updateUrl } from "../../libs/userAgent";
import Activity from "./Activity";
import Completed from "./Completed";
import LiveNow from "./LiveNow";

const Home = (): JSX.Element => {
  const [selectType, setSelectType] = useState('')

  useEffect(() => {

    const query = getQueryVariable('tab')
    if (query) {
      if (query === 'completed' || query === 'activity') {
        setSelectType(query)
      } else {
        window.open(`/`, '_self')
      }
    } else {
      if (query === '') {
        window.open(`/`, '_self')
      }
    }
  }, [])

  const selectTypeFun = (type: any) => {
    setSelectType(type)
    updateUrl('tab', type)
  }
  
  return (
    <>
      <div className="relative 5xl:container 5xl:mx-auto pt-16">
        <div className="flex flex-col lg:flex-row relative z-10 lg:justify-between lg:px-4 5xl:pl-0">
          <nav className="font-play overflow-x-auto whitespace-nowrap text-white/60">
            <button className="uppercase text-sm tracking-wider py-8 lg:text-base whitespace-nowrap overflow-hidden relative transition-all after:absolute after:w-full after:h-1 after:left-0 after:bottom-0 after:rounded-t-full after:transition-all group after:translate-y-3 px-2 lg:px-4" onClick={() => { selectTypeFun('') }}>
              <div className={["group-hover:text-white transition-all", selectType === '' ? 'opacity-100 text-white' : ''].join(' ')}>
                <span>Live now</span>
                <span></span>
              </div>
            </button>
            <button className="uppercase text-sm tracking-wider py-8 lg:text-base whitespace-nowrap overflow-hidden relative transition-all after:absolute after:w-full after:h-1 after:left-0 after:bottom-0 after:rounded-t-full after:transition-all group after:translate-y-3 px-2 lg:px-4" onClick={() => { selectTypeFun('completed') }}>
              <div className={["group-hover:text-white transition-all", selectType === 'completed' ? 'opacity-100 text-white' : ''].join(' ')}>
                <span>Completed</span>
                <span></span>
              </div>
            </button>
            <button className="uppercase text-sm tracking-wider py-8 lg:text-base whitespace-nowrap overflow-hidden relative transition-all after:absolute after:w-full after:h-1 after:left-0 after:bottom-0 after:rounded-t-full after:transition-all group after:translate-y-0 px-2 lg:px-4" onClick={() => { selectTypeFun('activity') }}>
              <div className={["group-hover:text-white transition-all", selectType === 'activity' ? 'opacity-100 text-white' : ''].join(' ')}>
                <span>Activity</span>
              </div>
            </button>
          </nav>
        </div>
      </div>
      <main className="flex flex-wrap grow px-2 lg:px-8 transition-all duration-300 page-enter:opacity-0 page-enter:-translate-y-4 layout-enter:opacity-0 layout-enter:-translate-y-4 relative z-0">
        <div className="w-full mx-auto 5xl:container">
          {/* <a href="/referrals" className="flex text-slate-100 mb-3 text-xs md:text-sm p-2 rounded-lg bg-slate-800 text-center hover:bg-slate-700 transition-all">
            <p className="w-full">
              <strong className="text-white uppercase tracking-wider animate-glow-slow-cyan">New!</strong> Earn ETH with MetaWin. Get 2.5% commission on all user purchases with your referral link
            </p>
          </a> */}


          {
            selectType === ''
              ? <LiveNow></LiveNow>
              : selectType === "completed"
                ? <Completed></Completed>
                : selectType === 'activity'
                  ? <Activity></Activity>
                  : <LiveNow></LiveNow>
          }


        </div>
      </main>
      <Footer></Footer>
    </>
  );
}

export default Home;
