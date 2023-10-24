import { GiShipWreck } from "react-icons/gi";
import { BsFillBoxSeamFill } from "react-icons/bs";
import { FaShip, FaHourglassHalf } from "react-icons/fa";
import { FaHandHoldingDollar } from "react-icons/fa6";

interface IShippingStatus {
  delivered: boolean;
  paid: boolean;
  shipped: boolean;
  cancel: boolean;
}

const ShippingStatus = ({
  delivered,
  paid,
  shipped,
  cancel,
}: IShippingStatus) => {
  if (cancel) {
    return (
      <div className="flex max-w-[50%] items-center gap-1 text-xs">
        <div className="h-4 w-4 text-red-500">
          <GiShipWreck className="h-4 w-4" />
        </div>
        <p className="overflow-hidden text-ellipsis whitespace-nowrap text-center ">
          Cancel
        </p>
      </div>
    );
  } else if (delivered) {
    return (
      <div className="flex max-w-[50%] items-center gap-1 text-xs">
        <div className="h-4 w-4 text-green-500">
          <BsFillBoxSeamFill className="h-4 w-4" />
        </div>
        <p className="overflow-hidden text-ellipsis whitespace-nowrap text-center ">
          Delivered
        </p>
      </div>
    );
  } else if (shipped && paid) {
    return (
      <div className="flex max-w-[50%] items-center gap-1 text-xs">
        <div className="h-4 w-4 text-cyan-500">
          <FaShip className="h-4 w-4" />
        </div>
        <p className="overflow-hidden text-ellipsis whitespace-nowrap text-center ">
          Shipped
        </p>
      </div>
    );
  } else if (paid) {
    return (
      <div className="flex max-w-[50%] items-center gap-1 text-xs">
        <div className="h-4 w-4 text-yellow-500">
          <FaHourglassHalf className="h-4 w-4" />
        </div>
        <p className="overflow-hidden text-ellipsis whitespace-nowrap text-center ">
          Processing
        </p>
      </div>
    );
  } else {
    return (
      <div className="flex max-w-[50%] items-center gap-1 text-xs">
        <div className="h-4 w-4 text-yellow-500">
          <FaHandHoldingDollar className="h-4 w-4" />
        </div>
        <p className="overflow-hidden text-ellipsis whitespace-nowrap text-center ">
          Waiting For Payment
        </p>
      </div>
    );
  }
};

export default ShippingStatus;
