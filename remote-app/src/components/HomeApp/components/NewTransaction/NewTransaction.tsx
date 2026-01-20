"use client";

import { TransactionType } from "@/types";
import { NewTransactionProps } from "@/types";
import { useSelector } from "react-redux";


import style from "./NewTransaction.module.css";

export default function NewTransaction({
  title,
  type,
  value,
  description,
  onTypeChange,
  onValueChange,
  onDescriptionChange,
  onSubmit,
  disabled = false,
}: NewTransactionProps) {
  // eslint-disable-next-line
  const transactionTypes = useSelector((state: any) => state.transactionTypes.types)

  const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const apenasNumeros = e.target.value.replace(/[^0-9.,]/g, "");
    onValueChange(apenasNumeros);
  };

  return (
    <div className={style.newTransaction}>
      <h3>{title}</h3>

      <select
        aria-label="Tipo de transação"
        value={type}
        onChange={(e) => onTypeChange(e.target.value as TransactionType)}
        disabled={disabled}
      >
    
       {/* // <option value="deposito">Depósito</option> */}
       {/* // <option value="transferencia">Transferência</option> */}
       <option value="">Selecione o tipo de transação</option>
        {/* {transactionTypes.map(t => ( <option value={t} key={t}>{t}</option> */}
        {transactionTypes?.map((t: string) => (
            <option key={t} value={t}>{t}</option>
          ))}
          
      </select>
      
      <p>Valor</p>
      <input
        type="text"
        placeholder="10,00"
        value={value}
        onChange={handleValorChange}
        disabled={disabled}
      />

      <input
        type="text"
        placeholder="Descrição (opcional)"
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
        disabled={disabled}
      />

      <button className={style.button} onClick={onSubmit} disabled={disabled}>
        Concluir transação
      </button>
    </div>
  );
}
