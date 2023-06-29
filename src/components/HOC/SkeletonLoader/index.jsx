import React from "react";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "./SkeletonLoader.scss";

export default function SkeletonLoader() {
  return (
    <>
      <div className="grid">
        {Array(8)
          .fill("")
          .map(() => {
            return (
              <div className="grid-items">
                <SkeletonTheme color="#e1e1e1" highlightColor="#f2f2f2">
                  <Skeleton height={200} />
                  <Skeleton height={20} width={200} />
                  <Skeleton height={20} width={100} />
                </SkeletonTheme>
              </div>
            );
          })}
      </div>
    </>
  );
}
