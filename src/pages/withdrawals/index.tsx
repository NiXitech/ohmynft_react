import { useEffect, useState } from 'react';
import { LStorage } from '../../api/services/cooike/storage';
import './index.scss'
import { Button } from 'antd';
import { getWithdrawal } from '../../api/services/http/api';


const WithDrawals = (): JSX.Element => {
  const userData = LStorage.get('LastAuthUser')
  const [history, setHistory] = useState([])


  const getWithdrawalFun = async()=> {
    try{
      const {code, data: {items}} = await getWithdrawal(userData.address) as any
      if(code === 200) {
        setHistory({...items})
      }else {

      }
    }catch(error) {
      console.log('getWithdrawalFun', error)
    }
  }


  useEffect(
    () => {
      getWithdrawalFun()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []
  )


  return (
    <>
      <main className="flex flex-wrap grow mt-8 lg:mt-8 px-2 lg:px-8 transition-all duration-300 page-enter:opacity-0 page-enter:-translate-y-4 layout-enter:opacity-0 layout-enter:-translate-y-4 pt-12">
        <div className="w-full max-w-[600px] m-auto">
          <section className="text-center mb-6">
            <h1 className="text-white text-sm block truncate font-Regular">Current balance：{userData.name}</h1>
          </section>
          <section className="mb-6">
            <form>
              <div className="mt-6 relative input-success-active">
                <input className="font-Regular text-sm h-16 py-2 rounded-full bg-grey-6 block relative w-full rounded-lg py-3 px-4 outline-none focus:border-slate-200 focus:ring-0 autofill:bg-slate-600 transition-all appearance-none hover:appearance-none border-none" name="email" id="email" type="email" step="" placeholder="Enter withdrawal amount"/>
                <span className="icon-ico-tick text-green text-2xl top-2 right-2 absolute z-10 transition-all pointer-events-none duration-300 -translate-y-2 opacity-0 input-success:opacity-100 input-success:translate-y-0"></span>
                <span className="icon-ico-x text-red text-sm top-4 right-3 absolute z-10 transition-all pointer-events-none duration-300 translate-y-2 opacity-0 input-error:opacity-100 input-error:translate-y-0"></span>
                <p className="w-full inline-block text-red text-sm mt-1" ></p>
              </div>

              <div className="mt-3 relative input-success-active w-full flex justify-center">
                <Button className='rounded-full mx-2 border-none' type='primary' style={{ backgroundColor: '#443C4A' }} ghost>001</Button>
                <Button className='rounded-full mx-2 border-none' type='primary' style={{ backgroundColor: '#443C4A' }} ghost>002</Button>
                <Button className='rounded-full mx-2 border-none' type='primary' style={{ backgroundColor: '#443C4A' }} ghost>003</Button>
                <Button className='rounded-full mx-2 border-none' type='primary' style={{ backgroundColor: '#443C4A' }} ghost>002</Button>
                <Button className='rounded-full mx-2 border-none' type='primary' style={{ backgroundColor: '#443C4A' }} ghost>003</Button>
              </div>

              <div className="mt-3 relative input-success-active w-full flex justify-center py-2">
                <p className='text-error-red font-Regular text-sm'>
                  error
                </p>
              </div>

              <div className="mt-3 relative input-success-active w-full flex justify-center">
                <Button className='rounded-full mx-2 w-1/2 h-16 font-Regular font-base border-none' style={{ backgroundColor: '#443C4A' }} ghost>REQUEST WITHDRAWAL</Button>
              </div>

              <div className="mt-3 relative input-success-active w-full flex justify-center py-2">
                <p className='font-Regular text-sm text-white'>Withdrawal fee of 2.5% up to BUSD 0.0025 applies.</p>
              </div>

              <div className="mt-3 relative input-success-active w-full flex justify-center">
                <p className='font-Regular text-sm text-white'>Destination address: 0x9b2a3d6cb86cc4fd20bf6a109c476003be14f92b</p>
              </div>

              <div className="mt-3 relative input-success-active w-full flex justify-start mt-16">
                <p className='font-Bold text-base text-white py-4 border-b w-full border-slate-100'>History</p>
              </div>


              {
                true ?
                  <div className='h-56 w-full overflow-hidden lg:overflow-y-auto overflow-y-auto hideScrollbar '>
                    {
                      [1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => {
                        return (
                          <div key={index} className="mt-3 relative input-success-active w-full flex justify-between">
                            <p className='font-Regular text-sm text-white py-4 border-b w-full border-slate-100'>BUSD:0.7</p>
                            <p className='font-Regular text-sm text-white py-4 border-b w-full border-slate-100 text-right'>2023-01-15</p>
                          </div>
                        )
                      })
                    }
                  </div>
                  :
                  <div className="mt-3 relative input-success-active w-full flex justify-startstart">
                    <p className='font-Regular text-sm text-slate-100'>You haven't made any withdrawals yet!</p>
                  </div>
              }
            </form>
          </section>
        </div>
      </main>
    </>
  );
}

export default WithDrawals;
