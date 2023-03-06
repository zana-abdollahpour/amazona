import React from "react";
import Head from "next/head";
import Link from "next/link";

export default function Layout({ title, children }) {
  return (
    <>
      <Head>
        <title>{title ? title + " - Amazona" : "Amazona"}</title>
        <meta name="description" content="ECommerce website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col justify-between min-h-screen">
        <header>
          <nav className="flex items-center justify-between h-12 px-4 shadow-md">
            <Link className="text-lg font-bold" href="/">
              Amazona
            </Link>
            <div>
              <Link className="p-2" href="/cart">
                Cart
              </Link>
              <Link className="p-2" href="/login">
                Login
              </Link>
            </div>
          </nav>
        </header>
        <main className="container px-4 m-auto mt-4">{children}</main>
        <footer className="flex items-center justify-center h-10 shadow-inner">
          Copyright &#169; 2023 Amazona
        </footer>
      </div>
    </>
  );
}
