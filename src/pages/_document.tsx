import { Html, Head, Main, NextScript } from "next/document";
import { ToastContainer } from "react-toastify";
export default function Document() {
  return (
    <Html lang="en" id="chocovery-app">
      <Head />
      <body className="bg-prim-libg dark:bg-prim-dkbg">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
