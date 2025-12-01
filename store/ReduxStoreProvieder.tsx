"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import { Toaster } from "react-hot-toast";

interface Props {
  children: React.ReactNode;
}

export default function ReduxProvider({ children }: Props) {
  return (
    <>
      <Provider store={store}>{children}</Provider>
      <Toaster />
    </>
  );
}
