import React from "react";
import "./HeroBanner.scss";
import HeroImage from "../../../assets/imges/hero-banner.png";
import HeroLayerImage from "../../../assets/imges/home-layer.png";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { SEARCH } from "../../../Jotai/atomType";
export default function HeroBanner() {
  const navigate = useNavigate();
  const [searchValue] = useAtom(SEARCH);

  let classNameDisplay = searchValue
    ? "hero-banner-design hide"
    : "hero-banner-design show";
  return (
    <div>
      <div className={classNameDisplay}>
        <div className="w-full">
          <div className="container">
            <div className="grid">
              <div className="grid-items">
                <h1>
                  Find your <br /> perfect pet
                </h1>
                <span>
                  Search through thousands of pets for adoption all over the
                  <br /> India at one place and find your perfect match. <br />
                  Over a million dogs and cats have found a forever home with
                  us. <br />
                  Join us and be a part of their happy stories.
                </span>
                <button onClick={() => navigate("pet-list")}>
                  View all pets <i className="fas fa-chevron-right"></i>
                </button>
              </div>
              <div className="grid-items">
                <div className="image">
                  <img src={HeroImage} alt="HeroImage" className="main-image" />
                  <img
                    src={HeroLayerImage}
                    alt="HeroLayerImage"
                    className="vector"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
