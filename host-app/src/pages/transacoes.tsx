import Head from "next/head";
import dynamic from "next/dynamic";

import { useIsMobile } from "@/hooks/useIsMobile";
import { useTransactions } from "@/hooks/useTransactions";

import { displayDate } from "@/utils/formatDate";

import { TransactionAppProps } from "@/types";

import style from "@/styles/transacoes.module.css";

const Menu = dynamic(() => import("remoteApp/Menu"), { ssr: false });

const TransactionApp = dynamic<TransactionAppProps>(
  () => import("remoteApp/TransactionApp"),
  { ssr: false }
);

export default function Transacoes() {
  const { transactions, setTransactions } = useTransactions();
  const isMobile = useIsMobile();

  return (
    <>
      <Head>
        <title>Transações</title>
        <meta name="description" content="Transações - Projeto Financeiro" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <section className={style.containerStatement}>
          {!isMobile && <Menu />}

          <div className={style.boxStatement}>
            <TransactionApp
              transactions={transactions}
              dateString={displayDate}
              onCreate={(data) =>
                setTransactions((prev) => [
                  ...prev,
                  { id: Date.now(), ...data },
                ])
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
        </section>
      </main>
    </>
  );
}
