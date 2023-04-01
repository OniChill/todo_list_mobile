import TodoList from '@/components/TodoList'
import React from 'react'
import  {store , persistor}  from '@/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

export default function index() {
  return (
    <>
    <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>
        <TodoList />
      </PersistGate>
    </Provider> 
    </>
  )
}
