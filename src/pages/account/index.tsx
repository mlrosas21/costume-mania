import Breadcrumbs from "@/components/Breadcrumbs";
import RootLayout from "@/layouts/rootLayout";
import Head from "next/head";
import React, { useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { Frijole } from "next/font/google";
import AccountDetailsForm from "@/components/AccountDetailsForm";
import Favorites from "@/components/Favorites";
import Purchases from "@/components/Purchases";
import { Tab } from "@headlessui/react";
import { GetServerSideProps } from "next";
import { getLastPurchases, getUserInfo } from "@/services/users.service";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { Order, UserData } from "@/interfaces/user";
import { useSession } from "next-auth/react";

const frijole = Frijole({
  subsets: ["latin"],
  weight: "400",
});

type Props = {
  userData: UserData;
  purchases: Order[];
};

function AccountPage({ userData: intialUserData, purchases }: Props) {
  const tabs = ["Account", "Favorites", "Purchases"];

  const { data: session } = useSession();
  const [userData, setUserData] = useState(intialUserData);

  const fetchUpdatedUserData = async () => {
    try {
      const response = await fetch(`/api/users/me`, {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
      });
      if (response.ok) {
        const updatedData = await response.json();
        setUserData(updatedData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <RootLayout>
      <Head>
        <title>Account details</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="min-h-[50%] w-[90vw] px-4 sm:px-6 lg:px-8">
        <h1
          className={`${frijole.className} text-5xl py-4 md:py-6 text-orange-2`}
          style={{ textShadow: "2px 2px 2px rgba(0, 0, 0, 1)" }}
        >
          Account
        </h1>
        <Breadcrumbs
          homeElement={<AiOutlineHome />}
          separator={<span> / </span>}
          activeClasses="text-amber-500"
          containerClasses="flex py-2 md:py-4 bg-gradient-to-r from-purple-600 to-blue-600 items-center"
          listClasses="hover:underline mx-2 font-bold"
          capitalizeLinks
        />
        <div>
          <Tab.Group>
            <Tab.List className="flex flex-row space-x-1 bg-purple-3 bg-opacity-50 md:text-2xl p-2 gap-2 md:gap-8 justify-center mb-2 shadow-md rounded">
              {tabs.map((e, idx) => (
                <Tab
                  key={idx}
                  className={({
                    selected,
                  }) => `w-full rounded-lg py-2.5 leading-5 text-orange-2 ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-1 
                    ${
                      selected
                        ? "bg-white shadow"
                        : "text-purple-1 hover:bg-white/[0.12] hover:text-white"
                    }`}
                >
                  {e}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                {userData && (
                  <AccountDetailsForm className="flex-2" account={userData} onUpdate={fetchUpdatedUserData} />
                )}
              </Tab.Panel>
              <Tab.Panel>
                <Favorites />
              </Tab.Panel>
              <Tab.Panel>
                <Purchases purchases={purchases} />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </section>
    </RootLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
  res,
}) => {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    const { token, user_id: idUser } = session?.user;

    try {
      const userData = await getUserInfo(token);
      const purchases = await getLastPurchases({ token, idUser });

      return {
        props: {
          userData,
          purchases,
        },
      };
    } catch (error) {
      // Handle errors if necessary
      console.error("Error fetching data:", error);
      return {
        props: {
          userData: null,
          purchases: null,
        },
      };
    }
  }

  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
};

export default AccountPage;
