import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./header.scss";
import { useCookies } from "react-cookie";
import Searchbar from "./Searchbar";
import { autoLogoutHandler } from "../../../helpers/commonHelpers";
import { useAtom } from "jotai";
import {
  PETLIST,
  PETLISTFILTER,
  PETLOADER,
  PETMODAL,
  STATUS,
} from "../../../Jotai/atomType";
import { ApiGetNoAuth } from "../../../helpers/API/ApiData";
import AddpetModal from "../../HOC/AddpetModal";
export default function Header() {
  const navigate = useNavigate();
  const [status] = useAtom(STATUS);
  const [, setLoader] = useAtom(PETLOADER);
  const [, setPetList] = useAtom(PETLIST);
  const [, setFilterPetList] = useAtom(PETLISTFILTER);
  const [cookies] = useCookies(["auth"]);
  const isAuthenticated = !!cookies["petcare-token"];
  const [, setShowModal] = useAtom(PETMODAL);
  const showPetModal = () => {
    setShowModal(true);
  };

  useEffect(() => {
    setLoader(true);
    ApiGetNoAuth("pet/findByStatus?status=" + status).then((res) => {
      let data = res.data;

      data = data?.filter((item) => {
        return item.tags?.some((tag) => tag.name === "pet-care");
      });
      setPetList(data);
      setFilterPetList(data);
      setLoader(false);
    });
  }, [status]);

  return (
    <div>
      <header>
        <div className="container">
          <div className="header-alignment">
            <div className="logo" onClick={() => navigate("/")}>
              <span>PET CARE</span>
            </div>

            {isAuthenticated ? (
              <div className="button">
                <div className="search">
                  <Searchbar />
                </div>
                <div className="button-center">
                  <button onClick={showPetModal}>Add Pet</button>
                </div>
                <div
                  className="log-out"
                  title="log-out"
                  onClick={autoLogoutHandler}
                >
                  <i className="fas fa-sign-out-alt"></i>
                </div>
              </div>
            ) : (
              <div className="button">
                <div className="search">
                  <Searchbar />
                </div>
                <NavLink to="/login">
                  <button className="fill-button">Login</button>
                </NavLink>
                <NavLink to="/signup">
                  <button className="outline-button">Signup</button>
                </NavLink>
              </div>
            )}
          </div>
        </div>
        <AddpetModal />
      </header>
    </div>
  );
}
