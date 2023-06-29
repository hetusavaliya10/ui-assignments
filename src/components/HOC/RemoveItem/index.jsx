import React, { useEffect, useState } from "react";
import "./RemoveItem.scss";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { useAtom } from "jotai";
import { PETLIST, PETLISTFILTER } from "../../../Jotai/atomType";
import { ApiDeleteNoAuth } from "../../../helpers/API/ApiData";
import { toast } from "react-hot-toast";

export default function RemoveItem({ deleteModal, setDeleteModal, item }) {
  const [modal, setModal] = useState(false);
  const [petList, setPetList] = useAtom(PETLIST);
  const [filterPetList, setFilterPetList] = useAtom(PETLISTFILTER);
  const [loader, setLoader] = useState(false);
  const ref = React.useRef();

  useOnClickOutside(ref, () => setDeleteModal(false));

  useEffect(() => {
    setModal(deleteModal);
  }, [deleteModal]);

  const onRemoveItem = () => {
    setLoader(true);
    ApiDeleteNoAuth("pet/" + item?.id)
      .then((res) => {
        setLoader(false);
        console.log(res);
        if (res.status === 200) {
          let data = [...petList];
          data = data.filter((item1) => item1.id !== item?.id);

          setPetList([...data]);
          let filterData = [...filterPetList];
          filterData = filterData.filter((item1) => item1.id !== item?.id);
          setFilterPetList([...filterData]);
          toast.success(`Pet ${item?.name} removed successfully`);
          setDeleteModal(false);
          return;
        } else {
          toast.error(
            `Something went wrong while removing peffffft ${item?.name}`
          );
          return;
        }
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
        toast.error(`Something went wrong while removing pet ${item?.name}`);
        return;
      });
  };

  return (
    <>
      <div
        className={
          modal ? "remove-modal-wrapper show" : "remove-modal-wrapper hide"
        }
      >
        <div className="modal-remove-content" ref={ref}>
          <div className="modal-remove-header">
            <div className="remove-items-text">
              <span>Remove Item</span>
              <p>
                Are you sure you want to remove <b>"{item?.name}"</b> from the
                list?
              </p>
            </div>
            <div className="modal-footer">
              <button
                className="outline-button"
                onClick={() => setDeleteModal(false)}
              >
                No
              </button>
              <button
                className="fill-button"
                disabled={loader}
                onClick={onRemoveItem}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
