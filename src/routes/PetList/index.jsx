import React from "react";
import "./PetList.scss";
import StatusCard from "../Home/StatusDetails/StatusCard";
import StatusTab from "../Home/StatusDetails/StatusTab";
import { PETLISTFILTER, PETMODAL } from "../../Jotai/atomType";
import { useAtom } from "jotai";

export default function PetList() {
  const [, setShowModal] = useAtom(PETMODAL);
  const [petList] = useAtom(PETLISTFILTER);
  const showPetModal = () => {
    setShowModal(true);
  };
  return (
    <>
      <div className="container">
        <div className="status-tab">
          <StatusTab />
        </div>
        {petList?.length > 0 ? (
          <div className="add-pet-right-contnet-alignment">
            <button onClick={showPetModal}>Add Pet</button>
          </div>
        ) : null}

        <StatusCard />
      </div>
    </>
  );
}
