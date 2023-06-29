import React from "react";
import Header from "../layout/header/header";

export default function DefaultLayout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
