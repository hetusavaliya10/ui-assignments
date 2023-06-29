import React from "react";
import StatusCard from "./StatusCard";
import "./StatusDetails.scss";
import StatusTab from "./StatusTab";
import { STATUS } from "../../../Jotai/atomType";
import { useAtom } from "jotai";
export default function StatusDetails() {
  const [status] = useAtom(STATUS);
  return (
    <div>
      <div className="states-details-all-content-alignment">
        <div className="container">
          <div className="section-title">
            <span>
              <i class="fa-solid fa-circle"></i>{" "}
              {status === "available"
                ? "Avilable"
                : status === "pending"
                ? "Pending"
                : "Sold"}
            </span>
            <h2>List of all pets {status} for adoption</h2>
          </div>
          <StatusTab />
          <StatusCard />
        </div>
      </div>
    </div>
  );
}
