import * as React from 'react';
import DashboardContainer from './dashboardContainer';
import { Provider } from 'react-redux';
import store from '../redux/store';

const Dashboard =() => {

  return (
    <>
    <Provider store={store}>
      <DashboardContainer />
    </Provider>
    </>
  );
}

export default Dashboard;