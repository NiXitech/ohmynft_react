/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.scss';
import 'react-toastify/dist/ReactToastify.css';
import LiveNow from './pages/livenow/index';
import CompletedCard from './pages/completed';
import ProductDetail from './pages/productdetail'
import HttpPage from './pages/Request';
import Header from './components/header';
import MWPage from './pages/mw';
import Winners from './pages/Winners';
import Referrals from './pages/referrals';
import Notifications from './pages/notifications';
import AccountPage from './pages/account';
import { useEffect, useState } from 'react';
import RegisterComp from './pages/signup/register';
import { useAccount, useDisconnect, useSignMessage } from 'wagmi';
import Verification from './pages/signup/verification';
import { getPrice, getRegistration, getRegistrationSign, Register } from './api/services/http/api';
import useStateHook from './pages/store';
import CookiePolicy from './pages/cookiePolicy';
import PrivacyPolicy from './pages/privacyPolicy';
import TermsAndConditions from './pages/termsAndConditions';
import FAQ from './pages/FAQ';
import { LStorage } from './api/services/cooike/storage';
import UserInfo from './pages/useInfo';
import Footer from './components/footer';
import Activity from './pages/Activity';
import MyEntries from './pages/myentries';
import Origin from './pages/origin/Origin';
import Redeem from './pages/redeem'
import Notification from './pages/notification'


function App() {
  const [state, actions] = useStateHook();
  const { isConnected, address } = useAccount()

  const { disconnect } = useDisconnect({
    onError: () => {
    }
  })

  const [loading, setLoading] = useState(true)

  //   useEffect(() => {
  //     let script2 = document.createElement('script');
  //     script2.type = 'text/javascript';
  //     script2.src = 'https://static.zdassets.com/ekr/snippet.js?key=e4c74970-fc71-4c36-8e68-85ad01771e84';

  //     script2.onerror = reject
  //     script2.onload = function () {
  //       isLoaded = true
  //       resolve(window.AMap)
  //     }
  //     document.head.appendChild(script)
  //   })
  // }
  //     // appendChild(script2);
  //   });

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1500)



  }, [isConnected])
  return (
    <>
      <Router>
        <Header></Header>
        <div className="min-h-screen flex flex-col">
          {
            loading
              ? <div className="w-20 h-20 fixed top-1/2 left-1/2 z-50 -translate-y-1/2 -translate-x-1/2 bg-slate-900 p-3 rounded-full shadow-md fade-in-delayed">
                <img className="inline-block spinner-border animate-spin-slowing" src={require('./asstes/img/spinner-blue.svg').default} alt="" width="124" height="124" />
              </div>
              : <Routes>
                <Route path="/" element={<LiveNow />} />
                <Route path="/activity" element={<Activity />} />
                <Route path="/productdetail/:raffle_id" element={<ProductDetail />} />
                <Route path="/completed" element={<CompletedCard />} />
                <Route path="/myentries" element={<MyEntries />} />
                <Route path="/mw/:name" element={<MWPage />} />
                <Route path="/winners" element={<Winners />} />
                <Route path="/referrals" element={<Referrals />} />
                <Route path="/redeem" element={<Redeem />} />
                <Route path="/notification" element={<Notification />} />
                <Route path='/signup/register' element={<RegisterComp />} />
                <Route path='/signup/verification' element={<Verification />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/cookie-policy" element={<CookiePolicy />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                <Route path="/userinfo" element={<UserInfo />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/http" element={<HttpPage />} />
                <Route path="/t/:username" element={<Origin />} />
                <Route path="*" element={<Navigate to="/" replace={true} />} />
                
              </Routes>
          }
        </div>
        {
          window.location.href.indexOf('/signup/register') > 0 || window.location.href.indexOf('/signup/verification') > 0 ? <></> :
            <Footer></Footer>
        }
        <ToastContainer theme="dark" autoClose={3000} hideProgressBar />
      </Router>
    </>
  );
}

export default App;
