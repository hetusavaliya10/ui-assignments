import React, { useState } from "react";
import "./Searchbar.scss";
import { PETLIST, PETLISTFILTER, SEARCH } from "../../../../Jotai/atomType";
import { useAtom } from "jotai";
export default function Searchbar() {
  const [, setFilterPetList] = useAtom(PETLISTFILTER);
  const [petList] = useAtom(PETLIST);
  const [searchValue, setSearchValue] = useAtom(SEARCH);

  const onSearch = (e) => {
    let value = e.target.value;
    let filterData = petList.filter((item) => {
      return (
        item?.name?.toLowerCase().includes(value?.toLowerCase()) ||
        item?.category?.name?.toLowerCase().includes(value?.toLowerCase()) ||
        item?.tags?.some((tag) =>
          tag?.name?.toLowerCase().includes(value?.toLowerCase())
        ) ||
        item?.status?.toLowerCase().includes(value?.toLowerCase())
      );
    });
    setFilterPetList(filterData);
    setSearchValue(value);
  };

  return (
    <div>
      <div className="searchbar-design">
        <input
          type="text"
          placeholder="Search by name, category, tag, status...."
          value={searchValue}
          onChange={(e) => onSearch(e)}
        />
      </div>
    </div>
  );
}
