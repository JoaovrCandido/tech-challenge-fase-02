"use client";

import { TransactionType } from "@/types";
import { NewTransactionProps } from "@/types";
import { useSelector } from "react-redux";


import style from "./NewTransaction.module.css";

interface NewTransactionPropsExtended extends NewTransactionProps {
  selectedFile?: File | null;
  onClearFile?: () => void;
}

export default function NewTransaction({
  title,
  type,
  value,
  description,
  onTypeChange,
  onValueChange,
  onDescriptionChange,
  onFileChange,
  onSubmit,
  disabled = false,
  currentFile,
  selectedFile,
  onClearFile,
}: NewTransactionPropsExtended) {
  // eslint-disable-next-line
  const transactionTypes = useSelector((state: any) => state.transactionTypes.types)

  const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const apenasNumeros = e.target.value.replace(/[^0-9.,]/g, "");
    onValueChange(apenasNumeros);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onFileChange) {
      const file = e.target.files ? e.target.files[0] : null;
      onFileChange(file);
    }
  };

  const hasFile = !!currentFile || !!selectedFile;

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
        aria-label="Valor da transação"
        type="text"
        placeholder="10,00"
        value={value}
        onChange={handleValorChange}
        disabled={disabled}
      />

      <input
        aria-label="Descrição da transação"
        type="text"
        placeholder="Descrição (opcional)"
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
        disabled={disabled}
      />

      <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
        <p style={{ marginBottom: "0.5rem", fontSize: "0.9rem" }}>
          Comprovante
        </p>

        {hasFile ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0.8rem",
              backgroundColor: "#f0f0f0",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          >
            <div
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: "80%",
              }}
            >
              <span style={{ fontSize: "1.2rem", marginRight: "0.5rem" }}>
                📄
              </span>
              {selectedFile ? (
                <span style={{ fontSize: "0.9rem" }}>
                  {selectedFile.name} (Novo)
                </span>
              ) : (
                <a
                  href={currentFile || "#"}
                  download="comprovante"
                  style={{
                    fontSize: "0.9rem",
                    color: "#0070f3",
                    textDecoration: "underline",
                  }}
                >
                  Ver Comprovante Salvo
                </a>
              )}
            </div>

            <button
              type="button"
              onClick={onClearFile}
              disabled={disabled}
              title="Remover arquivo"
              style={{
                background: "transparent",
                border: "none",
                color: "#d93025",
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: "1rem",
              }}
            >
              ✕
            </button>
          </div>
        ) : (
          <input
            aria-label="Upload de comprovante"
            type="file"
            onChange={handleFileChange}
            disabled={disabled}
            accept="image/*,.pdf"
          />
        )}
      </div>

      <button className={style.button} onClick={onSubmit} disabled={disabled}>
        Concluir transação
      </button>
    </div>
  );
}
