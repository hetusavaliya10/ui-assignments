import React from "react";

export default function Input({
  type,
  label,
  placeholder,
  iconRight,
  value,
  name,
  onChange,
  onKeyDown,
  errors,
  isRemoveBottomMargin,
  onRightIconClick,
  isRequired,
}) {
  return (
    <>
      <div className={isRemoveBottomMargin ? "form" : "form form-bottom"}>
        <label>
          {label}
          {isRequired && <span className="required">*</span>}
        </label>
        <div className="form-input">
          <input
            type={type ? type : "text"}
            placeholder={placeholder ? placeholder : name}
            value={value}
            onChange={onChange}
            name={name}
            onKeyDown={onKeyDown}
            autoComplete="off"
          />

          {iconRight && (
            <div className="icon-right-alignment">
              <img
                onClick={() => {
                  onRightIconClick && onRightIconClick();
                }}
                src={iconRight}
                alt="iconRight"
              />
            </div>
          )}
        </div>
        {errors && <span className="error">{errors}</span>}
      </div>
    </>
  );
}
