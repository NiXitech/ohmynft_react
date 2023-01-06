/* eslint-disable no-unused-vars */
function setState(newState) {
  this.state = {
    ...this.state,
    ...newState
  };
  this.subscriptions.forEach((subscription) => {
    subscription(this.state);
  });
}

function useCustom(React) {
  const [_, subscription] = React.useState();
  React.useEffect(() => {
    this.subscriptions.push(subscription);
    return () => {
      this.subscriptions = this.subscriptions.filter(item => item !== subscription);
    };
  }, []);
  return [this.state, this.actions];
}

function mappingActions(store, actions) {
  const associatedActions = {};
  Object.keys(actions).forEach((key) => {
    if (typeof actions[key] === 'function') {
      associatedActions[key] = actions[key].bind(null, store);
    }
    if (typeof actions[key] === 'object') {
      associatedActions[key] = mappingActions(store, actions[key]);
    }
  });
  return associatedActions;
}

export default function useSharedState(React, initState, actions) {
  const store = {
    state: initState,
    subscriptions: []
  };
  store.setState = setState.bind(store);
  store.actions = mappingActions(store, actions);
  return useCustom.bind(store, React);
}