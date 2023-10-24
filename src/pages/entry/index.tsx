import EntryContainer from "@/components/EntryContainer/EntryContainer";
import ThemeToggler from "@/components/Layout/ThemeToggler";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import SeaCargo from "@/components/SVG/SeaCargo";
import React from "react";
import { ToastContainer } from "react-toastify";

function index() {
  return (
    <main className="relative flex min-h-screen">
      <LoadingScreen />
      <div className="fixed right-5 top-5 z-50">
        <ThemeToggler />
      </div>
      <div className="relative z-10 h-screen w-[50vw] overflow-hidden bg-prim-light dark:bg-prim-dark">
        <SeaCargo className="absolute -bottom-[10%] -left-[70%] h-auto w-[80vw] fill-white" />
        <h1 className="absolute right-5 top-5 text-[2.5rem] font-bold text-white">
          SeaCargo
        </h1>
      </div>
      <EntryContainer />
      <ToastContainer />
    </main>
  );
}

export default index;
