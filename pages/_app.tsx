import store from '@/redux/store'
import { AppProps } from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'

const KanBan = ({Component, pageProps} : AppProps) => {
  return (
    <Provider store={store}>
      <Component {...pageProps}/>
    </Provider>
  )
}

export default KanBan