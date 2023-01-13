/* eslint-disable jsx-a11y/anchor-is-valid */
import './index.scss'

const Footer = (): JSX.Element => {
  return (
    <>
      <div className="w-full pt-14 mx-auto 5xl:container 5xl:mx-auto font-black text-white">
        <footer className="py-4 lg:px-8 border-t border-blue ">
          <div className='container xxl:px-6rem66 xxxl:px-6rem66'>
            <nav className="flex flex-col lg:flex-row lg:align-middle lg:items-center">
              <div className="text-center lg:order-3">
                <ul className="lg:flex lg:justify-end">
                  {/* <li className="inline-block"><a href="" title=" Instagram" className="inline-block p-4 lg:px-2 2xl:p-4 text-cyan-500 text-shadow-cyan" target="_blank" rel="noreferrer"><span className="icon-ico-instagram text-[22px]"></span></a></li> */}
                  <li className="inline-block">
                    <a href="#" title="Twitter" className="inline-block p-4 lg:px-2 2xl:p-4 text-white" target="_blank" rel="noreferrer">
                      <span className="icon-ico-twitter text-[22px]">
                      </span>
                    </a>
                  </li>
                  {/* <li className="inline-block"><a href="a" title="Discord" className="inline-block p-4 lg:px-2 2xl:p-4 text-cyan-500 text-shadow-cyan" target="_blank" rel="noreferrer"><span className="icon-ico-discord text-[22px]"></span></a></li> */}
                </ul>
              </div>
              <div className="lg:grow text-center mt-3 lg:order-2 lg:mt-0">
                <ul className="lg:flex lg:justify-center 2xl:justify-end font-nft">
                  <li className="lg:inline-block"><a href="/FAQ" className="text-sm lg:text-xs 2xl:text-sm font-bold tracking-widest uppercase p-3 lg:px-2 xl:px-2 2xl:px-3 inline-block transition-opacity hover:opacity-90">FAQ</a></li>

                  <li className="lg:inline-block"><a href="/privacy-policy" className="text-sm lg:text-xs 2xl:text-sm font-bold tracking-widest uppercase p-3 lg:px-2 xl:px-2 2xl:px-3 inline-block transition-opacity hover:opacity-90">Privacy Policy</a></li>
                  <li className="lg:inline-block"><a href="/cookie-policy" className="text-sm lg:text-xs 2xl:text-sm font-bold tracking-widest uppercase p-3 lg:px-2 xl:px-2 2xl:px-3 inline-block transition-opacity hover:opacity-90">Cookie Policy</a></li>
                  <li className="lg:inline-block"><a href="/terms-and-conditions" className="text-sm lg:text-xs 2xl:text-sm font-bold tracking-widest uppercase p-3 lg:px-2 xl:px-2 2xl:px-3 inline-block transition-opacity hover:opacity-90">Terms and Conditions</a></li>
                  <li className="lg:inline-block"><a href="https://twitter.com" className="text-sm lg:text-xs 2xl:text-sm font-bold tracking-widest uppercase p-3 lg:px-2 xl:px-2 2xl:px-3 inline-block transition-opacity hover:opacity-90"><span className=" icon-twitter icon"></span></a></li>
                </ul>
              </div>
              <div className="text-center mt-10 lg:order-1 lg:mt-0 lg:flex lg:flex-wrap lg:justify-start lg:text-left lg:max-w-[240px] xl:max-w-[280px]">
                <span className="text-xs 3xl:text-sm tracking-widest uppercase px-2 block w-full font-nft">COPYRIGHT &copy; 2022 OH MY NFT</span>
                {/* <span className="text-xs 3xl:text-sm tracking-widest uppercase px-2 block"> Patent Pending </span> */}
              </div>
              <div className="text-center mt-14 lg:hidden">
                <a aria-current="page" href="/" className="router-link-active router-link-exact-active"><img src={require('../../asstes/img/personal.png').default} alt="ohmynft logo" width="80" height="80" className="inline m-0" /></a>
              </div>
            </nav>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Footer;