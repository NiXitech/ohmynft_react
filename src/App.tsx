/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import './App.scss';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import LiveNow from './pages/livenow';
import CompletedCard from './pages/completed';
import ProductDetail from './pages/productdetail'
import HttpPage from './pages/Request';
import Header from './components/header';
import Competition from './pages/competition';
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


function App() {
  const [state, actions] = useStateHook();
  const { isConnected, address } = useAccount()

  const { disconnect } = useDisconnect({
    onError: () => {
    }
  })

  const [loading, setLoading] = useState(true)



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
                <Route path="/home" element={<Home />} />
                <Route path="/" element={<LiveNow />} />
                <Route path="/productdetail" element={<ProductDetail />} />
                <Route path="/comp" element={<CompletedCard />} />
                <Route path="/competition/:id" element={<Competition />} />
                <Route path="/mw/:name" element={<MWPage />} />
                <Route path="/winners" element={<Winners />} />
                <Route path="/referrals" element={<Referrals />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path='/signup/register' element={<RegisterComp />} />
                <Route path='/signup/verification' element={<Verification />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/cookie-policy" element={<CookiePolicy />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                <Route path="/userinfo" element={<UserInfo />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/http" element={<HttpPage />} />
                <Route path="*" element={<Navigate to="/" replace={true} />} />
              </Routes>
          }


        </div>

        <ToastContainer theme="dark" autoClose={3000} hideProgressBar />
      </Router>
    </>
  );
}

export default App;
