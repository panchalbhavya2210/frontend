"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import { useEffect } from "react";
import { loadProfileThunk } from "./slices/authSlice";
import { Toaster } from "sonner";

interface Props {
  children: React.ReactNode;
}

export default function ReduxProvider({ children }: Props) {
  useEffect(() => {
    store.dispatch(loadProfileThunk());
  }, []);
  return (
    <>
      <Provider store={store}>{children}</Provider>
      <Toaster theme="system" position="top-right" closeButton />
    </>
  );
}
