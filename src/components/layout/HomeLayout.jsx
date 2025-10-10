import React from "react";
import Header from "../custom-component/Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../custom-component/Footer/Footer";

export default function HomeLayout() {
  return (
    <>
      <Header />
      <main className="mt-18">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
