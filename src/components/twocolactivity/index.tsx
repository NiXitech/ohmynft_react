import { useEffect, useState } from "react";
import { ActivityItem, ParticipantItem } from "../../types/types";
import { getQueryVariable, updateUrl  } from "../../libs/userAgent"


interface propsType {
  tableData: ActivityItem[],
  subLoading: boolean,
  participants?: ParticipantItem[]
}

const TwoColActivity = (props: propsType): JSX.Element => {
  const [activityList, setActivityList] = useState<any>([])
  const [loading, setLoading] = useState(true)

  const [selectType, setSelectType] = useState('')
  // const getAllActivityFun = async () => {
  //   setActivityList(tableData);
  //   setLoading(false)
  // }

  useEffect(() => {
    const query = getQueryVariable('tab')
    if (query) {
      if (query === 'participants') {
        setSelectType(query)
      } else {
        window.open(`/participants`, '_self')
      }
    } else {
      if (query === '') {
        window.open(`/participants`, '_self')
      }
    }
  }, [])

  const selectTypeFun = (type: any) => {
    setSelectType(type)
    updateUrl('tab', type)

  }

  return (
    <>
      <section className="w-full mx-auto lg:screnHeight">
        <div className="lg:overflow-y-auto overflow-y-auto overflow-x-hidden lg:overflow-x-hidden relative pb-0 hideScrollbar"
          style={{
            height: '100%',
            width: '100%',
            borderRadius: '1.5rem',
            background: '#061222',
          }}
        >

          {
            props.subLoading
              ? <div className="absolute z-10 flex justify-center align-middle w-full pt-8">
                <img className="inline-block spinner-border animate-spin-slowing" src={require('../../asstes/img/spinner-white.svg').default} alt="" width="30" height="30" />
              </div>
              : <section className="text-left text-sm md:text-base whitespace-nowrap w-full mb-4 animate-fade-in">
                <div className="text-base md:text-xl lh-3 font-Bold lg:sticky z-10 backdrop-blur-md shadow-[0_1px_0_0] shadow-blue-100/50 flex px-6 font-black lg:top-0 bg-[#061222]"
                >
                  {/* <div className="py-3 w-6/12 md:w-4/12">
                    <h3>Username</h3>
                  </div>
                  <div className="hidden md:inline-block py-3 w-3/12">
                    <h3>Entries Purchased</h3>
                  </div> */}
                  <button className={["tab-item uppercase text-sm tracking-wider py-5 grow md:grow-0 md:max-w-none md:px-6 md:text-base relative overflow-hidden transition-all after:bg-blue-500 after:absolute after:w-full after:h-1 after:left-0 after:bottom-0 after:rounded-t-full after:transition-all hover:opacity-100  rounded-rt-xl lg:rounded-rt-2xl after:translate-y-3 ", selectType === '' ? 'border-r-2 -top-1 border-b-none opacity-100 !bg-img-transparent' : 'opacity-70'].join(' ')}
                                  onClick={() => { selectTypeFun('') }}><span>Activity</span>
                                </button>
                                <button className={["tab-item uppercase text-sm tracking-wider py-5 grow md:grow-0 md:max-w-none md:px-6 md:text-base overflow-hidden relative transition-all after:bg-blue-500 after:absolute after:w-full after:h-1 after:left-0 after:bottom-0 after:rounded-t-full after:transition-all hover:opacity-100  after:translate-y-3 rounded-rt-xl lg:rounded-rt-2xl rounded-lt-xl lg:rounded-lt-2xl", selectType === 'participants' ? 'border-r-2 border-l-2 -top-1 border-b-none opacity-100 !bg-img-transparent' : 'opacity-70'].join(' ')}
                                  onClick={() => { selectTypeFun('participants') }}
                                >
                                  <span>Participants</span>
                                  {/* <span> ({props?.participants.length})</span> */}
                                  </button>
                </div>
                <div className="relative z-0 px-6">
                  {
                    selectType === '' ?
                   
                    <>
                    {
                       props.tableData.length > 0
                       ?
                       props.tableData.map((item: ActivityItem, index: number) => {
                        return <article key={index} className="border-b border-slate-500 py-3 lg:py-1 hover:bg-slate-700 flex items-center flex-wrap">
                          <div className="py-3 w-6/12 md:w-4/12 relative">
                            <a href={`/mw/${item.display_name}`} className="flex items-center overflow-hidden mr-3 group">
                              <span className="relative mr-2 md:mr-3">
                                <img className="inline-block rounded-full w-12 h-12 border-2 border-transparent group-hover:border-gray-300 transition-all" src={require('../../asstes/img/default_personal.png').default} alt="" loading="lazy" />
                              </span>
                              <h3 className="text-ellipsis overflow-hidden group-hover:text-gray-300 transition-colors font-heavy">{item.display_name}</h3>
                            </a>
                          </div>
                          <div className="flex md:flex w-full pl-2 md:w-5/12 md:pl-0">
                            <div className="flex md:py-3 w-1/2">
                              <span className="text-slate-100 block md:hidden mr-1">Entries</span>
                              <span className="font-bold font-heavy">{item.entry_info.count}</span>
                            </div>
                          </div>
                        </article>
                      })
                      : <div className="text-center w-full py-4">
                        <h2 className="text-center w-full px-3 lg:text-xl py-3 text-white animate-fade-in font-heavy">
                          <span>Nothing to display</span>
                        </h2>
                      </div>
                    }
                    </>
                    :<>
                    {
                                        props?.participants && props?.participants.length > 0
                                          ?
                                          props?.participants.map((item: ParticipantItem, index) => {
                                            return <div key={index} className="border-b border-slate-500 last-of-type:border-none py-2 hover:bg-slate-700 animate-fade-in flex items-center justify-between">
                                              <a href={`/mw/${item.display_name}`} className="flex items-center overflow-hidden mr-3 group min-h-[48px]">
                                                <span className="relative inline-block mr-3">
                                                  <img className="inline-block rounded-full w-12 h-12 border-2 border-transparent group-hover:border-gray-300 transition-all" src={require('../../asstes/img/default_personal.png').default} alt="" width="48" height="48" loading="lazy" />
                                                </span>
                                                <h3 className="text-ellipsis overflow-hidden group-hover:text-gray-300 transition-colors leading-tight truncate">{item.display_name}</h3>
                                              </a>
                                              <div>
                                                <span className="text-sm text-blue-500 tracking-wider uppercase whitespace-nowrap">{item.buy_entry_count} {item.buy_entry_count > 1 ? "entries" : "entry"}</span>
                                              </div>
                                            </div>
                                          })

                                          : <div className="text-center w-full py-4">
                                            <h2 className="text-center w-full px-3 lg:text-xl py-3 text-white animate-fade-in font-heavy">
                                              <span>Nothing to display</span>
                                            </h2>
                                          </div>
                                      } 
                    </>
                  }

                </div>
              </section>
          }
        </div>
      </section>
    </>
  );
}

export default TwoColActivity;