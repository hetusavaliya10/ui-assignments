import React, { useEffect, useState } from "react";
import "./AddpetModal.scss";

import { useAtom } from "jotai";
import { toast } from "react-hot-toast";
import Input from "../Input";
import {
  PETEDITDATA,
  PETLIST,
  PETLISTFILTER,
  PETMODAL,
  STATUS,
} from "../../../Jotai/atomType";
import { ApiPostNoAuth, ApiPutNoAuth } from "../../../helpers/API/ApiData";
import { useNavigate } from "react-router-dom";

export default function AddpetModal() {
  const navigate = useNavigate();
  const [petModal, setPetModal] = useAtom(PETMODAL);
  const location = window.location.pathname;
  const [petList, setPetList] = useAtom(PETLIST);
  const [status, setStatus] = useAtom(STATUS);
  const [filterPetList, setFilterPetList] = useAtom(PETLISTFILTER);
  const [loader, setLoader] = useState(false);
  const [inpuValue, setInputValue] = useState({
    id: +new Date(),
    category: {
      id: +new Date() + 1,
      name: "",
    },
    name: "",
    photoUrls: [],
    tags: [
      {
        id: +new Date() + 2,
        name: "",
      },
      {
        id: +new Date() + 3,
        name: "",
      },
      {
        id: +new Date() + 3,
        name: "pet-care",
      },
    ],
    status: status,
  });
  const [inputValueEdit, setInputValueEdit] = useAtom(PETEDITDATA);

  useEffect(() => {
    setInputValue({ ...inpuValue, status: status });
  }, [status]);

  const [errors, setErrors] = useState({});
  const hideModal = () => {
    setPetModal(false);
    setInputValue({
      id: +new Date(),
      category: {
        id: +new Date() + 1,
        name: "",
      },
      name: "",
      photoUrls: [],
      tags: [
        {
          id: +new Date() + 2,
          name: "",
        },
        {
          id: +new Date() + 3,
          name: "",
        },
        {
          id: +new Date() + 3,
          name: "pet-care",
        },
      ],
      status: status,
    });
    setInputValueEdit();
  };

  useEffect(() => {
    if (inputValueEdit) {
      setInputValue(inputValueEdit);
    }
  }, [inputValueEdit]);

  const onhandleChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({ ...prev, [name]: value }));
    setErrors({ ...errors, [name]: "" });
  };

  const onhandleChangeCategory = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inpuValue,
      category: { ...inpuValue.category, name: value },
    });
    setErrors({ ...errors, [name]: "" });
  };

  const onhandleChangeTag = (e, index) => {
    const { name, value } = e.target;
    let tags = [...inpuValue.tags];
    tags[index] = { ...tags[index], name: value };
    setInputValue({ ...inpuValue, tags });
    setErrors({ ...errors, [name + index]: "" });
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const onUploadImage = async (e) => {
    const { files } = e.target;
    let inputFiles = [...files];
    let filesBase64 = [];
    for (let i = 0; i < inputFiles.length; i++) {
      filesBase64.push(await getBase64(inputFiles[i]));
    }

    let fileData = inpuValue?.photoUrls?.length
      ? [...inpuValue?.photoUrls, ...filesBase64]
      : [...filesBase64];
    setErrors({ ...errors, files: "" });
    if (fileData.length >= 3) {
      toast.error("You can upload maximum 3 images");
      return;
    }
    setInputValue({ ...inpuValue, photoUrls: fileData });
  };

  const onRemoveImage = (index) => {
    let fileData = [...inpuValue?.photoUrls];
    fileData.splice(index, 1);
    setInputValue({ ...inpuValue, photoUrls: fileData });
  };

  const ValidateFrom = () => {
    let isValid = true;
    let error = {};
    if (!inpuValue?.name?.trim()) {
      isValid = false;
      error.name = "Pet name is required";
    }
    if (!inpuValue?.category?.name?.trim()) {
      isValid = false;
      error.category = "Category is required";
    }
    if (!inpuValue?.tags[0]?.name?.trim()) {
      isValid = false;
      error.tag0 = "Tag is required";
    }
    if (!inpuValue?.tags[1]?.name?.trim()) {
      isValid = false;
      error.tag1 = "Tag is required";
    }
    if (!inpuValue?.status?.trim()) {
      isValid = false;
      error.status = "Status is required";
    }
    if (inpuValue?.photoUrls?.length === 0) {
      isValid = false;
      error.files = "Please upload at least one image";
    }

    setErrors(error);
    return isValid;
  };
  const createPet = async (payload) => {
    ApiPostNoAuth("pet", payload)
      .then((res) => {
        setLoader(false);
        if (res.status === 200) {
          if (status === payload?.status) {
            let data = petList?.length ? [payload, ...petList] : [];
            setPetList([...data]);
            let filterData = filterPetList?.length
              ? [payload, ...filterPetList]
              : [];
            filterData = filterData?.map((obj) => obj);
            setFilterPetList([...filterData]);
          } else {
            setStatus(payload?.status);
          }

          toast.success("Pet added successfully");
          hideModal();
          if (location === "/") {
            navigate("/pet-list");
          }
        } else {
          toast.error("Something went wrong while adding pet");
        }
      })
      .catch((err) => {
        setLoader(false);

        toast.error("Something went wrong while adding pet");
      });
  };

  const updatePet = async (payload) => {
    ApiPutNoAuth("pet", payload)
      .then((res) => {
        setLoader(false);

        if (res.status === 200) {
          if (status === payload?.status) {
            let data = [...petList];
            let index = data.findIndex((item) => item.id === payload.id);
            data[index] = payload;
            setPetList(data);
            let filterData = [...filterPetList];
            let filterIndex = filterData.findIndex(
              (item) => item.id === payload.id
            );
            filterData[filterIndex] = payload;
            setFilterPetList(filterData);
          } else {
            setStatus(payload?.status);
          }
          toast.success("Pet updated successfully");
          hideModal();
          if (location === "/") {
            navigate("/pet-list");
          }
        } else {
          toast.error("Something went wrong while updating pet");
        }
      })
      .catch((err) => {
        setLoader(false);

        toast.error("Something went wrong while updating pet");
      });
  };

  const onSubmit = async () => {
    if (ValidateFrom()) {
      setLoader(true);
      let payload = {
        ...inpuValue,
      };
      payload.name = payload.name.trim();
      payload.category.name = payload.category.name.trim();
      payload.tags[0].name = payload.tags[0].name.trim();
      payload.tags[1].name = payload.tags[1].name.trim();

      if (inputValueEdit) {
        updatePet(payload);
      } else {
        createPet(payload);
      }
    }
  };

  const className = petModal
    ? "add-pet-modal-wrapper show"
    : "add-pet-modal-wrapper hide";
  return (
    <>
      <div className={className}>
        <div className="modal-md">
          <div className="modal-header">
            <span>{inputValueEdit ? "Edit Pet" : "Add Pet"}</span>
            <i class="fa-solid fa-xmark" onClick={hideModal}></i>
          </div>
          <div className="modal-body">
            <div className="input">
              <Input
                label="Pet Name"
                placeholder="Pet Name"
                value={inpuValue?.name || ""}
                onChange={onhandleChange}
                name="name"
                errors={errors?.name}
                isRequired={true}
              />
              <Input
                label="Pet Category"
                placeholder="Pet Category"
                value={inpuValue?.category?.name}
                onChange={onhandleChangeCategory}
                name="name"
                errors={errors?.category}
                isRequired={true}
              />
            </div>
            <div className="input">
              <label>Tag</label>
              <div className="two-col-grid">
                <Input
                  placeholder="Tag 1"
                  value={inpuValue?.tags[0]?.name}
                  onChange={(e) => onhandleChangeTag(e, 0)}
                  name="name"
                  errors={errors?.tag0}
                />
                <Input
                  placeholder="Tag 2"
                  value={inpuValue?.tags[1]?.name}
                  onChange={(e) => onhandleChangeTag(e, 1)}
                  name="name"
                  errors={errors?.tag1}
                />
              </div>
            </div>
            <div className="status">
              <label>Status</label>
              <div className="radio-text-alignment">
                <div className="text-radio-design">
                  <input
                    type="radio"
                    checked={inpuValue?.status === "available"}
                    onChange={(e) => onhandleChange(e)}
                    name="status"
                    value="available"
                  />
                  <label>Avilable</label>
                </div>
                <div className="text-radio-design">
                  <input
                    type="radio"
                    checked={inpuValue?.status === "pending"}
                    onChange={(e) => onhandleChange(e)}
                    name="status"
                    value="pending"
                  />
                  <label>Pending</label>
                </div>
                <div className="text-radio-design">
                  <input
                    type="radio"
                    checked={inpuValue?.status === "sold"}
                    onChange={(e) => onhandleChange(e)}
                    name="status"
                    value="sold"
                  />
                  <label>Sold</label>
                </div>
              </div>
            </div>

            <div>
              <div className="file-upload">
                <input
                  type="file"
                  id="upload"
                  onChange={onUploadImage}
                  accept="image/*"
                  multiple
                />
                <label htmlFor="upload">
                  <i class="fa-solid fa-cloud-upload"></i>
                  <span>Upload Image</span>
                </label>
              </div>
              <span className="error">{errors?.files}</span>
            </div>
            <div className="image-show">
              {inpuValue?.photoUrls?.map((file, index) => {
                return (
                  <div className="image-style">
                    <img src={file} />
                    <div
                      className="close-icon"
                      onClick={() => onRemoveImage(index)}
                    >
                      <i class="fa-solid fa-xmark"></i>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="modal-footer">
            <button
              disabled={loader}
              className="fill-button"
              onClick={onSubmit}
            >
              {inputValueEdit ? "Update" : "Save"}
            </button>
            <button className="outline-button" onClick={hideModal}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
