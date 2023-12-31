import LogInForm from "@/components/LogInForm";
import RootLayout from "@/layouts/rootLayout";
import Head from "next/head";
import React from "react";

function LogInPage() {
  return (
    <RootLayout>
      <Head>
        <title>Log in</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LogInForm />
    </RootLayout>
  );
}

export default LogInPage;
