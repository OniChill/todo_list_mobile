// import  {store , persistor}  from '@/redux/store';
// import { PersistGate } from 'redux-persist/integration/react';
// import { Provider } from 'react-redux';
import Login from '@/components/Login';


export default function Index() {

  return (
    // <Provider store={store}>
    //  <PersistGate loading={null} persistor={persistor}>
        <Login />
    //    </PersistGate>
    // </Provider> 

  );
}
