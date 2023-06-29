import React, { useEffect } from "react";
import HeroBanner from "./HeroBanner";
import StatusDetails from "./StatusDetails";

export default function Home() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <div>
      <HeroBanner />
      <StatusDetails />
    </div>
  );
}
