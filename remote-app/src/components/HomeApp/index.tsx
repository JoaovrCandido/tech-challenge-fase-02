import { useState } from "react";
import { Transaction, TransactionType } from "@/types";
import BoxBalance from "./components/BoxBalance/BoxBalance";
import NewTransaction from "./components/NewTransaction/NewTransaction";
import SuccessModal from "../SuccessModal/SuccessModal";
import TransactionHomeContainer from "./components/TransactionHomeContainer/TransactionHomeContainer";
import FinancialDashboard from "./components/FinancialDashboard/FinancialDashboard";
import { formatCurrency } from "@/utils/formatCurrency";
import style from "./HomeApp.module.css";

function HomeApp({
  transactions,
  balance,
  dateString,
  onCreate,
  onUpdate,
  onDelete,
}: {
  transactions: Transaction[];
  balance: number;
  dateString: string;
  onCreate: (t: Omit<Transaction, "id">) => void;
  onUpdate: (t: Transaction) => void;
  onDelete: (id: number) => void;
}) {
  const [type, setType] = useState<TransactionType | "">("");
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("Sucesso!");
  const [announcement, setAnnouncement] = useState("");


  const isHighBalance = balance > 5000;

  const suggestionText = isHighBalance 
    ? "Sugestão: Seu saldo está alto! Clique para realizar uma transferência."
    : "Sugestão: Seu saldo está baixo. Clique para realizar um depósito.";

  const handleApplySuggestion = () => {
    if (isHighBalance) {
      setType("transferencia");
      setDescription("Investimento de excedente");
    } else {
      setType("deposito");
      setDescription("Aporte de recursos");
    }

    setTimeout(() => setAnnouncement(""), 1000);
  };

  const handleInvalidForm = () => {
    setIsOpenModal(true);
    setModalTitle("Erro!!!");
    setModalMessage("Por favor, preencha a transação!");

    setTimeout(() => {
      setType("");
      setValue("");
      setDescription("");
    }, 1500);
  };

  const handleInvalidTransfer = () => {
    setIsOpenModal(true);
    setModalTitle("Erro!!!");
    setModalMessage("Saldo insuficiente para realizar a transferência!\nFaça um depósito!");

    setTimeout(() => {
      setType("");
      setValue("");
      setDescription("");
    }, 1500);
  };

  const handleSubmit = () => {
    if (!type || !value || Number(value) <= 0) {
      handleInvalidForm();
      return;
    }

    if (type == "transferencia" && Number(value) > balance) {
      handleInvalidTransfer();
      return;
    }

    setIsSubmitting(true);

    onCreate({
      type: type as TransactionType,
      value: Number(value),
      description,
      date: new Date().toISOString().slice(0, 10),
    });

    setModalTitle("Sucesso!!!");
    setModalMessage("Transação criada com sucesso!");
    setIsOpenModal(true);

    setTimeout(() => {
      setIsOpenModal(false);
      setIsSubmitting(false);
      setType("");
      setValue("");
      setDescription("");
    }, 1500);
  };

  return (
    <>
      <div className={style.mainContent}>
        <BoxBalance balance={formatCurrency(balance)} dateString={dateString} />

        <div 
            aria-live="polite" 
            className="sr-only"
            style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}
        >
            {announcement}
        </div>

        <button 
          className={isHighBalance ? style.suggestionBtnTransfer : style.suggestionBtnDeposit}
          onClick={handleApplySuggestion}
          type="button"
        >
          <span aria-hidden="true">💡 </span>
          {suggestionText}
        </button>

        <NewTransaction
          title="Nova transação"
          type={type}
          value={value}
          description={description}
          onTypeChange={setType}
          onValueChange={setValue}
          onDescriptionChange={setDescription}
          onSubmit={handleSubmit}
          disabled={isSubmitting}
        />

        <FinancialDashboard transaction={transactions} />
      </div>

      <aside className={style.transactionsPanel}>
        <TransactionHomeContainer
          transactions={transactions}
          onCreate={onCreate}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      </aside>

      <SuccessModal
        isOpen={isOpenModal}
        title={modalTitle}
        onClose={() => setIsOpenModal(false)}
        message={modalMessage}
      />
    </>
  );
}

export default HomeApp;