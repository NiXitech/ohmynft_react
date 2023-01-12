import { useEffect, useState } from "react";
import { ActivityItem, ParticipantItem } from "../../types/types";
import { getQueryVariable, TimeInterval, updateUrl } from "../../libs/userAgent"


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
            <section className="text-left text-sm md:text-base whitespace-nowrap w-full mb-4 animate-fade-in">
              <div className="text-base md:text-xl lh-3 font-Bold lg:sticky z-10 backdrop-blur-md shadow-[0_1px_0_0] shadow-white-60 flex font-black lg:top-0 bg-[#061222]"
              >
                {/* <div className="py-3 w-6/12 md:w-4/12">
                    <h3>Username</h3>
                  </div>
                  <div className="hidden md:inline-block py-3 w-3/12">
                    <h3>Entries Purchased</h3>
                  </div> */}
                <div className={[" uppercase text-sm tracking-wider py-5 grow md:grow-0 md:max-w-none md:px-6 md:text-base relative overflow-hidden transition-all hover:opacity-100  rounded-rt-xl lg:rounded-rt-2xl cursor-pointer ", selectType === '' ? 'text-blue' : ''].join(' ')}
                  onClick={() => { selectTypeFun('') }}><span>Activity</span>
                </div>
                <div className={[" uppercase text-sm tracking-wider py-5 grow md:grow-0 md:max-w-none md:px-6 md:text-base overflow-hidden relative transition-all hover:opacity-100  rounded-rt-xl lg:rounded-rt-2xl rounded-lt-xl lg:rounded-lt-2xl cursor-pointer", selectType === 'participants' ? 'text-blue' : ''].join(' ')}
                  onClick={() => { selectTypeFun('participants') }}
                >
                  <span>Participants</span>
                  {/* <span> ({props?.participants.length})</span> */}
                </div>
              </div>
              <div className="relative z-0 px-6">

                {
                  props.subLoading
                    ? <div className="absolute z-10 flex justify-center align-middle w-full pt-8">
                      <img className="inline-block spinner-border animate-spin-slowing" src={require('../../asstes/img/spinner-white.svg').default} alt="" width="30" height="30" />
                    </div>
                    : <>
                      {
                        selectType === '' ?

                          <>
                            {
                              props.tableData.length > 0
                                ?
                                props.tableData.map((item: ActivityItem, index: number) => {
                                  return <div key={index} className="border-b border-white-60 last-of-type:border-none py-4 animate-fade-in flex items-center justify-between">
                                    <a href={`/mw/${item.display_name}`} className="flex items-center overflow-hidden mr-3 group min-h-[48px]">
                                      <span className="relative inline-block mr-3">
                                        <img className="inline-block rounded-full rounded-full w-12 h-12 border-2 border-transparent group-hover:border-gray-300 transition-all" src={require('../../asstes/img/default_personal.png').default} alt="" width="28" height="28" loading="lazy" /></span>
                                      <h3 className="text-ellipsis overflow-hidden group-hover:text-gray-300 transition-colors truncate">{item.display_name}
                                        <span className="uppercase tracking-wider block text-xs text-blue-500 group-hover:text-blue-400">{item.entry_info.count} {item.entry_info.count > 1 ? "entries" : "entry"}</span>
                                      </h3>
                                    </a>
                                    <div>
                                      <a href={`https://goerli.etherscan.io/tx/${item.entry_info.tx_hash}`} target="_blank" className="text-blue-500 hover:text-blue-400" rel="noreferrer">
                                        <div className="block text-right text-sm whitespace-nowrap">
                                          {TimeInterval(item.create_time)} ago
                                          <span className="icon2-ico-share inline-block ml-[1px] top-[2px] relative text-sm"></span>
                                        </div></a>
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
                          : <>
                            {
                              props?.participants && props?.participants.length > 0
                                ?
                                props?.participants.map((item: ParticipantItem, index) => {
                                  return <div key={index} className="border-b border-white-60 last-of-type:border-none py-4  animate-fade-in flex items-center justify-between">
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
                    </>
                }


              </div>
            </section>
          }
        </div>
      </section >
    </>
  );
}

export default TwoColActivity;