import React, { useState } from "react";
import "./StatusCard.scss";
import StoreImage from "../../../../assets/imges/store-image.png";
import { useAtom } from "jotai";
import {
  PETEDITDATA,
  PETLISTFILTER,
  PETLOADER,
  PETMODAL,
} from "../../../../Jotai/atomType";
import { useCookies } from "react-cookie";
import RemoveItem from "../../../../components/HOC/RemoveItem";
import SkeletonLoader from "../../../../components/HOC/SkeletonLoader";
export default function StatusCard() {
  const [petList] = useAtom(PETLISTFILTER);
  const [loader] = useAtom(PETLOADER);
  const [cookies] = useCookies(["auth"]);
  const isAuthenticated = !!cookies["petcare-token"];
  const [, setShowModal] = useAtom(PETMODAL);
  const showPetModal = () => {
    setShowModal(true);
  };
  return (
    <div>
      <div className="all-states-card-alignment">
        {loader ? (
          <div className="skeleton-loader-content">
            <SkeletonLoader />
          </div>
        ) : petList?.length > 0 ? (
          <div className="grid">
            {petList?.map((item, index) => {
              return <PetItem key={index} index={index} item={item} />;
            })}
          </div>
        ) : (
          <div className="no-data-found">
            <div>
              <h3>No Data Found</h3>
              {isAuthenticated && (
                <>
                  <p>
                    Please add pet details by clicking on the add pet button in
                    the bottom.
                  </p>
                  <div className="button-center">
                    <button onClick={showPetModal}>Add Pet</button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const PetItem = ({ item, index }) => {
  const [, setPetDetails] = useAtom(PETEDITDATA);
  const [, setShowModal] = useAtom(PETMODAL);
  const [deleteModal, setDeleteModal] = useState(false);
  const [cookies] = useCookies(["auth"]);
  const isAuthenticated = !!cookies["petcare-token"];
  const showDeleteModal = () => {
    setDeleteModal(true);
  };

  const hideDeleteModal = () => {
    setDeleteModal(false);
  };

  const statusClass =
    item?.status === "available"
      ? "available"
      : item?.status === "pending"
      ? "pending"
      : "sold";

  const onEdit = () => {
    setPetDetails(item);
    setShowModal(true);
  };

  return (
    <>
      <div className="grid-items">
        <div className="card-image">
          {item?.photoUrls?.length > 0 &&
          item?.photoUrls[item?.photoUrls?.length - 1] !== "string" ? (
            <img
              src={item?.photoUrls[item?.photoUrls?.length - 1]}
              alt="StoreImage"
            />
          ) : (
            <img src={StoreImage} alt="StoreImage" />
          )}

          <div className="states-code">
            <span className={statusClass}>{item?.status}</span>
          </div>
        </div>
        <div className="card-details">
          <p>{item.name}</p>
          <small title={item?.category?.name}>
            Category : {item?.category?.name || "-"}
          </small>
          <div className="card-footer-alignment">
            <span
              title={
                item?.tags?.map((tag, index) => tag.name)?.join(", ") || "-"
              }
            >
              Tag :{" "}
              {item?.tags?.map((tag, index) => tag.name)?.join(", ") || "-"}
            </span>
            {isAuthenticated && (
              <div className="icons-alignment">
                <div onClick={onEdit}>
                  <i class="fa-solid fa-pen-to-square"></i>
                </div>
                <div onClick={() => setDeleteModal(true)}>
                  <i class="fa-solid fa-trash"></i>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <RemoveItem
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        item={item}
        index={index}
      />
    </>
  );
};
