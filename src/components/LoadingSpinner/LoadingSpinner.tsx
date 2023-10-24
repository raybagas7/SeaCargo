import React from "react";
import { GiShipWheel } from "react-icons/gi";

function LoadingSpinner() {
  return (
    <div className="h-screen w-full">
      <div className="flex h-full w-full items-center justify-center">
        <GiShipWheel className="h-10 w-10 animate-spin text-prim-light" />
      </div>
    </div>
  );
}

export default LoadingSpinner;
