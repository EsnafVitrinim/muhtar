"use client";

import { SessionProvider } from "next-auth/react";
import { Provider } from 'react-redux';
import { NextUIProvider } from '@nextui-org/react'
import store from '@/store';

export default function ClientProvider({ children }) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <NextUIProvider>
          {children}
        </NextUIProvider>
      </Provider>
    </SessionProvider>
  )
}
