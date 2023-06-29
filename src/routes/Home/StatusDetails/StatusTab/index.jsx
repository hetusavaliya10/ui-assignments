import React from "react";
import "./StatusTab.scss";
import { useAtom } from "jotai";
import { STATUS } from "../../../../Jotai/atomType";
export default function StatusTab() {
  const [status, setStatus] = useAtom(STATUS);

  const getActiveClass = (type) => {
    return status === type ? "active-button" : "";
  };

  const onStatus = (type) => {
    setStatus(type);
  };
  return (
    <div>
      <div className="status-tab-design">
        <button
          className={getActiveClass("available")}
          onClick={() => onStatus("available")}
        >
          Available
        </button>
        <button
          onClick={() => onStatus("pending")}
          className={getActiveClass("pending")}
        >
          Pending
        </button>
        <button
          onClick={() => onStatus("sold")}
          className={getActiveClass("sold")}
        >
          Sold
        </button>
      </div>
    </div>
  );
}
