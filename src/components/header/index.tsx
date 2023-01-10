/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAccount, useDisconnect } from 'wagmi';
import { LStorage } from '../../api/services/cooike/storage';
import useStateHook from '../../pages/store';
import ConnectWallet from '../connectWallet';
// import ZenDesk from '../zendesk'
import './index.scss'
// import Script from 'react-load-script';

export type NavItemProps = {
  to: string,
  title: string,
}




const Header = (): JSX.Element => {
  const [state, actions] = useStateHook();
  const [showSocial, setShowSocial] = useState(false)
  const [mobileOpenMenu, setMobileOpenMenu] = useState(false)
  const { isConnected } = useAccount()
  const [hasUser, setHasUser] = useState(false)
  const { disconnect } = useDisconnect()
  const location = useLocation();
  const [tipHide, setTipHide] = useState(false);


  const NavItem = (props: NavItemProps): JSX.Element => {
    const {
      to,
      title,
    } = props;

    const location = useLocation();
    let navigate = useNavigate();
    const isActive = location.pathname === to;

    return (
      <>
        <li className={['animate-slide-down-fade-in01s lg:flex lg:self-stretch'].join(' ')}>
          <div className={["route-link lg:flex lg:self-stretch pb-2 px-2 lg:pb-0 lg:px-2 lg:mx-3 group cursor-pointer font-nft", isActive ? "router-link-active router-link-exact-active text-cyan-500" : 'text-white/90'].join(' ')} onClick={() => {
            if (!isActive) navigate(to)
            setMobileOpenMenu(!mobileOpenMenu)
          }}>
            <span className="inline-block py-1 my-3 uppercase tracking-wider lg:whitespace-nowrap lg:my-0 lg:py-0 lg:mx-0 lg:flex lg:self-center transition-all duration-100 group-hover:text-cyan-500">{title}</span>
          </div>
        </li>
      </>
    )
  }
  const [lastUserName, setLastUserName] = useState({
    name: ''
  })

  useEffect(() => {
    window.addEventListener('click', function () {
      setShowSocial(false)

    }, false);
    const userData = LStorage.get('LastAuthUser')
    setLastUserName(userData)
  }, [])



  useEffect(() => {
    if (isConnected) {
      initData()
    }

  }, [isConnected])

  const initData = () => {
    const data = LStorage.get('accessToken');
    if (data) {
      setHasUser(true)
    }
  }

  useEffect(() => {
    const data = LStorage.getWagmi('wagmi.store')
    let userInfo = LStorage.get('LastAuthUser')
    if (data && userInfo) {
      if (JSON.parse(data).state.data.account !== userInfo.address) {
        Logout()
      }

    }
  }, [])

  const Logout = () => {
    disconnect()
    setHasUser(false)
    LStorage.delete('accessToken');
    LStorage.delete('LastAuthUser');
    window.location.reload();
  }

  return (
    <>
      {/* <Script id="ze-snippet"
        src="https://static.zdassets.com/ekr/snippet.js?key=e4c74970-fc71-4c36-8e68-85ad01771e84"> </Script> */}

      {
        location.pathname === '/signup/register' || location.pathname === '/signup/verification'
          ? ''
          : <>
            {
              state.showConnectWallet
                ? <ConnectWallet></ConnectWallet>
                : ''
            }
            <div className={["header-bg nav-main w-full top-0 left-0 fixed z-30 lg:border-cyan-500 lg:px-8 before:w-full before:h-full before:absolute before:-z-10 before:left-0 before:backdrop-blur-md before:transition-all before:duration-500 lg:before:hidden lg:backdrop-blur-md transition-all duration-500", mobileOpenMenu ? 'before:!bg-black' : ''].join(' ')}>
              <div className="container">
                <div className={['flex flex-col lg:flex-row lg:min-h-0 5xl:container 5xl:mx-auto', mobileOpenMenu ? 'min-h-screen' : ''].join(' ')}>
                  <div className={["flex justify-center lg:items-center border-b border-transparent transition-all lg:!bg-transparent lg:border-0 border-cyan-500", mobileOpenMenu ? '!border-transparent' : ''].join(' ')}  >
                    {/* <div className="grow w-14 flex items-center lg:hidden">
                    <div className="inline-block p-4 text-cyan-500 text-shadow-cyan cursor-pointer relative top-[2px] py-2 px-4">
                      <span className="icon-ico-discord text-[22px]"></span>
                    </div>
                  </div> */}
                    <div className="grow-0 text-center">
                      <a href="/" className="router-link-active router-link-exact-active inline-block mx-1 ">
                        <img src={require('../../asstes/img/ohmynftlogo.png').default} alt="OH MY NFT" className={["inline-block transition-all nav-logo", mobileOpenMenu ? "!py-1" : ''].join(' ')} />
                      </a>
                    </div>

                    <div className="grow w-14 flex justify-end items-center lg:hidden">
                      <div className="px-3 flex h-full items-center cursor-pointer">
                        <div className={['relative', 'w-6 h-4 transition-all duration-300', mobileOpenMenu ? 'menu-burger-active rotate-180' : ''].join(' ')} onClick={() => {
                          setMobileOpenMenu(!mobileOpenMenu)
                        }}>
                          <span className="rounded-full transition-all duration-300 border-b-2 block border-white w-6 absolute top-0 right-0 menu-burger:-rotate-45 menu-burger:top-2"></span>
                          <span className="rounded-full transition-all duration-300 border-b-2 block border-white w-4 absolute top-1/2 right-0 menu-burger:opacity-0"></span>
                          <span className="rounded-full transition-all duration-300 border-b-2 block border-white w-5 absolute top-full right-0 menu-burger:w-6 menu-burger:rotate-45 menu-burger:top-2"></span>
                        </div>
                      </div>
                    </div>
                    {/* <div className="justify-center hidden lg:flex">
              <a href="" className="inline-block p-4 p-1 relative top-1 ml-4 text-cyan-500 text-shadow-cyan" target="_blank" rel="noreferrer">
                <span className="icon-ico-discord text-[22px]"></span>
              </a>
            </div> */}
                  </div>
                  <div className={["grow flex-col justify-evenly lg:flex-row lg:flex lg:items-center lg:justify-end flex", mobileOpenMenu ? '' : 'hidden'].join(' ')}>
                    <ul className="text-center mt-3 lg:flex lg:mt-0 lg:items-stretch justify-center flex-1 lg:text-left lg:h-full empty:hidden">
                      {
                        // hasUser
                        // ? <>
                        <>
                          <NavItem to={'/'} title="Live Now"></NavItem>
                          <NavItem to={'/completed'} title="Completed"></NavItem>
                          <NavItem to={'/activity'} title="Activity"></NavItem>
                          {/* <NavItem to={'/winners'} title="Winners"></NavItem>
                          <NavItem to={'/referrals'} title="referrals"></NavItem> */}

                          {/* <NavItem to={'/home'} title="home"></NavItem> */}
                        </>
                        // : ''
                      }

                    </ul>
                    {
                      hasUser
                        ? ''
                        : <div className="block mx-auto lg:mx-0 lg:flex justify-center lg:pl-4">
                          <button className="button-bg-bl button-sm text-white rounded-full tracking-widest uppercase  transition-all relative shadow-[0_0_2px_0] disabled:bg-slate-800 disabled:hover:bg-slate-800 shadow-none"
                            onClick={() => { actions.openConnect() }}
                            onMouseEnter={() => { setTipHide(true) }}
                            onMouseLeave={() => { setTipHide(false) }}
                          >
                            <span className="transition-all">
                              <span className="">Connect Wallet</span>
                              {
                                tipHide
                                  ? <div className="hidden lg:block absolute top-13 p-4 rounded-xl animate-slide-down-fade-in lg:w-[350px] lg:-right-25"
                                    style={{
                                      background: '#021222'
                                    }}
                                  >
                                    <h2 className="text-slate-100 ft-18 mb-2 leading-tight animate-fade-in text-white">Why connect?</h2>
                                    <p className="op-6 ft-14 normal-case tracking-normal animate-fade-in">
                                      ohmynft runs on the blockchain. Taking part requires a personal signature. No private data is shared with us. We will NEVER ask for an ‘Approve All’ state.
                                    </p>
                                  </div>

                                  : ''
                              }
                            </span>
                            <div className="opacity-0 transition-all absolute flex justify-center align-middle left-0 top-0 w-full h-full pointer-events-none overflow-hidden" role="status">
                              <img className="inline-block spinner-border animate-spin-slowing" src={require('../../asstes/img/spinner-white.svg').default} alt="" width="30" height="30" />
                            </div>
                          </button>
                          {/* <button className="p-3 block mt-4 mx-auto py-1 my-3 text-white/60 hover:text-white uppercase tracking-wider transition-all duration-100 lg:hidden"
                          onClick={() => {
                            actions.mobileWhyConnect()
                          }}
                        >
                          Why connect?
                        </button> */}
                        </div>
                    }

                    {
                      hasUser
                        ? <>
                          <div className="hidden lg:flex ml-3 lg:border-white/30 lg:pl-4 lg:ml-0">
                            <div className="nav-main-avatar relative mr-2 cursor-pointer group">
                              <div className="relative" onClick={(e) => { e.stopPropagation(); setShowSocial(!showSocial) }}>
                                <img className="rounded-full border-2 border-white transition-all group-hover:border-cyan-500 p-[1px] border-white" src={require('../../asstes/img/default_personal.png').default} alt="Your avatar" decoding="async" />
                              </div>
                              <ul className={['flex flex-col absolute z-20 nav-dropdown shadow-2xl rounded-xl top-[52px] overflow-hidden', showSocial ? 'right-0' : 'left-0 hidden'].join(' ')}>
                                <li className="block whitespace-nowrap">
                                  <a href={`/mw/${lastUserName.name}`} className="flex w-full items-center px-3 py-3 item transition-all duration-100">
                                    <span className="mr-3 icon-ico icon-personal"></span>
                                    <span className="">My profile</span>
                                  </a>
                                </li>
                                <li className="block whitespace-nowrap">
                                  <a href="/referrals" className="flex w-full items-center px-3 py-3 item transition-all duration-100">
                                    <span className=" mr-3  icon-ico icon-referals"></span>
                                    <span className="">Referrals</span>
                                  </a>
                                </li>
                                <li className="block whitespace-nowrap">
                                  <a href="/account" className="flex w-full items-center px-3 py-3 item transition-all duration-100">
                                    <span className=" mr-3 icon-ico icon-settings"></span>
                                    <span className="">Settings</span>
                                  </a>
                                </li>
                                <li className="block whitespace-nowrap"><button className="flex w-full items-center px-3 py-3 transition-all duration-100" onClick={Logout}>
                                  <span className="icon-logout icon-ico mr-3"></span>
                                  <span className="">Logout</span>
                                </button>
                                </li>
                              </ul>
                            </div>
                            {/* <a href="/notifications" className="router-link-active router-link-exact-active relative h-10 flex items-center ml-3 cursor-pointer px-2 transition-all hover:opacity-100 opacity-50" aria-current="page"><span className="absolute w-4 h-4 rounded-full bg-cyan-500 top-1 right-0 border-[3px] border-slate-900 animate-fade-in hidden"></span><span className="icon-ico-bell text-2xl inline-block"></span></a> */}
                          </div>

                          <div className="flex justify-center lg:hidden">
                            <button className="py-3 text-slate-100 uppercase tracking-wider hover:text-white transition-all" onClick={Logout}> Log out </button>
                          </div>
                        </>
                        : ''
                    }

                    {/* <div className="lg:hidden">
                    <ul className="text-center lg:hidden empty:hidden font-play">


                      <li className="animate-slide-down-fade-in03s">
                        <a href="/privacy-policy" className="nav-main-link lg:flex lg:self-stretch pb-2 px-2 lg:pb-0 lg:px-2 lg:mx-3 group relative">
                          <span className="inline-block py-1 my-3 text-2xl text-white/90 uppercase tracking-wider transition-all duration-100 group-hover:text-cyan-500">Privacy Policy</span>
                        </a>
                      </li>
                      <li className="animate-slide-down-fade-in03s">
                        <a href="/cookie-policy" className="nav-main-link lg:flex lg:self-stretch pb-2 px-2 lg:pb-0 lg:px-2 lg:mx-3 group relative">
                          <span className="inline-block py-1 my-3 text-2xl text-white/90 uppercase tracking-wider transition-all duration-100 group-hover:text-cyan-500">Cookie Policy</span>
                        </a>
                      </li>
                      <li className="animate-slide-down-fade-in03s">
                        <a href="/faq" className="nav-main-link lg:flex lg:self-stretch pb-2 px-2 lg:pb-0 lg:px-2 lg:mx-3 group relative">
                          <span className="inline-block py-1 my-3 text-2xl text-white/90 uppercase tracking-wider transition-all duration-100 group-hover:text-cyan-500">FAQ</span>
                        </a>
                      </li>
                      <li className="animate-slide-down-fade-in04s">
                        <a href="/terms-and-conditions" className="nav-main-link lg:flex lg:self-stretch pb-2 px-2 lg:pb-0 lg:px-2 lg:mx-3 group relative">
                          <span className="inline-block py-1 my-3 text-2xl text-white/90 uppercase tracking-wider transition-all duration-100 group-hover:text-cyan-500">Terms</span>
                        </a>
                      </li>
                    </ul>
                  </div> */}
                    {/* <ul className="text-center animate-slide-down-fade-in06s lg:hidden">
                    <li className="inline-block">
                      <a href="#" className="inline-block p-4 lg:px-2 2xl:p-4 text-cyan-500 text-shadow-cyan" target="_blank">
                        <span className="icon-ico-instagram text-[22px]"></span>
                      </a>
                    </li>
                    <li className="inline-block">
                      <a href="#" className="inline-block p-4 lg:px-2 2xl:p-4 text-cyan-500 text-shadow-cyan" target="_blank">
                        <span className="icon-ico-twitter text-[22px]"></span>
                      </a>
                    </li>
                    <li className="inline-block">
                      <a href="#" className="inline-block p-4 lg:px-2 2xl:p-4 text-cyan-500 text-shadow-cyan" target="_blank">
                        <span className="icon-ico-discord text-[22px]"></span>
                      </a>
                    </li>
                  </ul> */}
                  </div>

                </div>
              </div>
            </div>
            <div className="pt-16 attention-info fixed w-full">
              <div className="py-2 text-center">
                Earn Big Rewards With
                <span>
                  &nbsp;Referrals！
                </span>
              </div>
            </div>
            {/* <div className='fixed top-80 -right-8 cursor-pointer'>
              <ZenDesk></ZenDesk>
            </div> */}
          </>
      }
    </>
  );
}

export default Header;