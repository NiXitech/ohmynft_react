/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import MobileWhyConnect from '../../components/mobileWhyConnect';
import useSharedState from './customHook';


const initState = {
  showConnectWallet: false,
  isLogin: false,
  showWhyConnect: false,
  globalLoading: false
};

const actions = {
  openConnect: function (store: any) {
    store.setState({ showConnectWallet: !store.state.showConnectWallet });
  },
  login: function (store: any) {
    store.setState({ isLogin: !store.state.isLogin });
  },
  mobileWhyConnect: function (store: any) {
    store.setState({ showWhyConnect: !store.state.showWhyConnect });
  },
  setGlobalLoading: function (store: any) {
    store.setState({ globalLoading: !store.state.globalLoading });
  },
};

const useStateHook = useSharedState(React, initState, actions);

export default useStateHook;