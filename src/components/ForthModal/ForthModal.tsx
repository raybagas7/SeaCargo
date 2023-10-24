import React from "react";
import Button from "../Button/Button";
import { useDark } from "@/store/dark/useDark";
import { useModal } from "@/store/modal/useModal";

interface ModalProps {
  confirm?: boolean;
  decline?: boolean;
  success?: boolean;
  stopPropagation?: boolean;
  component?: React.ReactNode;
  confirmAct?: () => void;
  declineAct?: () => void;
}

const ForthModal = ({
  confirm,
  decline,
  component,
  stopPropagation,
  confirmAct,
  declineAct,
}: ModalProps) => {
  const show4 = useModal.use.show4();
  const { hideModal4 } = useModal.getState();

  if (!show4) {
    return null;
  }

  const clickOutSide = (e: any) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={stopPropagation ? hideModal4 : () => {}}
      className="fixed top-0 z-[100] flex h-[100vh] w-[100vw] items-center justify-center bg-black/20 text-sm"
    >
      <div
        onClick={(e) => clickOutSide(e)}
        className={`animate-default_quantum_bouncing rounded-xl bg-transparent shadow-sm`}
      >
        {component && component}
        <div
          className={`${
            confirm || (decline && "mb-[2.5rem]")
          } flex justify-center gap-3`}
        >
          {confirm && (
            <div className="">
              <Button onClick={hideModal4} small secondary name="print-receipt">
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

export default ForthModal;
