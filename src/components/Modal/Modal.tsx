import React from "react";
import Button from "../Button/Button";
import { useDark } from "@/store/dark/useDark";
import { useModal } from "@/store/modal/useModal";

interface ModalProps {
  title?: string | React.ReactNode;
  titleIcon?: React.ReactNode;
  textMessage?: string | React.ReactNode;
  confirm?: boolean;
  decline?: boolean;
  animatePop?: boolean;
  success?: boolean;
  component?: React.ReactNode;
  confirmAct?: () => void;
  declineAct?: () => void;
}

const Modal = ({
  title,
  titleIcon,
  textMessage,
  confirm,
  decline,
  animatePop,
  component,
  confirmAct,
  declineAct,
}: ModalProps) => {
  const show = useModal.use.show();
  const dark = useDark.use.dark();
  const { hideModal } = useModal.getState();

  if (!show) {
    return null;
  }

  const clickOutSide = (e: any) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={hideModal}
      className="fixed top-0 z-50 flex h-[100vh] w-[100vw] items-center justify-center bg-black/20 text-sm"
    >
      <div
        onClick={(e) => clickOutSide(e)}
        className={`animate-default_quantum_bouncing rounded-xl bg-prim-libg shadow-sm dark:bg-prim-dkbg`}
      >
        {component && component}
        <div
          className={`${
            confirm || (decline && "mb-[2.5rem]")
          } flex justify-center gap-3`}
        >
          {confirm && (
            <div className="">
              <Button onClick={hideModal} small secondary name="print-receipt">
                Print
              </Button>
            </div>
          )}
          {decline && (
            <div className="">
              <Button secondary name="close-receipt">
                Close
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
