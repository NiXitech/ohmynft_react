// import Footer from "../../components/footer";

const Notifications = (): JSX.Element => {
  return (
    <>
      <main className="flex flex-wrap grow px-2 pb-10 lg:px-8 transition-all duration-300 page-enter:opacity-0 page-enter:-translate-y-4 layout-enter:opacity-0 layout-enter:-translate-y-4 pt-16">
        <div className="w-full mx-auto 5xl:container">
          <section className="animate-fade-in max-w-3xl mx-auto relative min-h-[50vh]">
            <nav className="flex justify-center lg:justify-start px-4 lg:px-0 border-b border-slate-400">
              <button className="uppercase text-sm tracking-wider py-6 grow max-w-[140px] lg:grow-0 lg:max-w-none lg:px-6 lg:text-base overflow-hidden relative transition-all hover:text-cyan-500 text-cyan-500"><span>All</span>
              </button>
              <button className="uppercase text-sm tracking-wider py-6 grow max-w-[140px] lg:grow-0 lg:max-w-none lg:px-6 lg:text-base overflow-hidden relative transition-all hover:text-cyan-500 text-white"><span>Wins</span>
              </button>
              <button className="uppercase text-sm tracking-wider py-6 grow max-w-[140px] lg:grow-0 lg:max-w-none lg:px-6 lg:text-base overflow-hidden relative transition-all hover:text-cyan-500 text-white"><span>My gifts</span>
              </button>
            </nav>
            <div className="relative">
              <div className="absolute flex justify-center align-middle w-full pt-8 bg-black animate-fade-in">
                <img className="inline-block spinner-border animate-spin-slowing" src="https://metawin.com/_nuxt/spinner-white.d8595d4a.svg" alt="" width="30" height="30" />
              </div>
              <div className="text-center w-full py-4">
                <h2 className="text-center w-full px-3 lg:text-xl py-3 text-slate-100">Nothing to display</h2>
              </div>
              <div></div>
            </div>
          </section>
        </div>
      </main>
      {/* <Footer></Footer> */}
    </>
  );
}

export default Notifications;