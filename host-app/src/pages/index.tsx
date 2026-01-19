import Head from "next/head";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { GetStaticProps } from "next";

import { useIsMobile } from "@/hooks/useIsMobile";
import { useTransactions } from "@/hooks/useTransactions";

import { HomeAppProps } from "@/types";

import { calculateBalance } from "@/utils/calculateBalance";
import { displayDate } from "@/utils/formatDate";

import Loading from "@/components/Loading/Loading";

import style from "@/styles/home.module.css";

const LoadingFallback = () => <Loading />;

const Menu = dynamic(() => import("remoteApp/Menu"), { ssr: false,  loading: () => <Loading /> });


const HomeApp = dynamic<HomeAppProps>(() => import("remoteApp/HomeApp"), {
  ssr: false,
   loading: () => <LoadingFallback />,
});

export default function Home() {
  const { transactions, setTransactions } = useTransactions();
  const isMobile = useIsMobile();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const balanceValue = calculateBalance(transactions);

  if (!isMounted) {
    return null; 
  }

  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Home - Projeto Financeiro" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className={style.layout}>
          {!isMobile && <Menu />}

          <HomeApp
            transactions={transactions}
            balance={balanceValue}
            dateString={displayDate}
            onCreate={(data) =>
              setTransactions((prev) => [...prev, { id: Date.now(), ...data }])
            }
            onUpdate={(updated) =>
              setTransactions((prev) =>
                prev.map((t) => (t.id === updated.id ? updated : t))
              )
            }
            onDelete={(id) =>
              setTransactions((prev) => prev.filter((t) => t.id !== id))
            }
          />
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
