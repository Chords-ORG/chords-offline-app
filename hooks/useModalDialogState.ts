import React from "react";

export interface ModalDialogState {
  visible: boolean;
  show: () => void;
  hide: () => void;
}

export default function useModalDialogState() {
  const [visible, setVisible] = React.useState(false);

  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  return {
    visible,
    show,
    hide,
  };
}
