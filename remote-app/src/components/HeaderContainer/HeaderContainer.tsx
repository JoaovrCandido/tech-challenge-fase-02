"use client";

// import { useAccessibility } from "hostApp/accessibility";

import Header from "./components/Header/Header";

interface Props {
  onToggleDarkMode: () => void;
  onToggleFontSize: () => void;
}

function HeaderContainer({ onToggleDarkMode, onToggleFontSize }: Props) {
  // const { toggleDarkMode, toggleChangeFontSize } = useAccessibility();

  return (
    <Header
      title="Banco FIAP"
      onToggleDarkMode={onToggleDarkMode}
      onToggleFontSize={onToggleFontSize}
    />
  );
}

export default HeaderContainer;
