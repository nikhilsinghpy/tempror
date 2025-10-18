import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../custom-component/Header/Header";

export default function UserLayout() {
  return (
    <>
      <Header />
      <main className="mt-18">
        <Outlet />
      </main>
    </>
  );
}
