import React, { useState } from "react";
import csx from "@utils/csx";

interface InputDropDownProps {
  id: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputValue: string;
  options: CAWorkerRef[];
}

export default function InputDropDown(props: InputDropDownProps) {
  const [optionsVisibility, setOptionsVisibility] = useState(false);
  return (
    <div className="form-floating">
      <input
        autoComplete="off"
        type="text"
        list={props.id}
        className={csx("form-control")}
        onChange={props.onChange}
        value={props.inputValue}
        onFocus={() => setOptionsVisibility(true)}
        onBlur={() => setOptionsVisibility(false)}
      />
      <label>{props.label}</label>
      <datalist id={props.id}>
        {props.options.length
          ? props.options.map(option => (
              <option key={option.id} value={option.name}>
                {option.email}
              </option>
            ))
          : null}
      </datalist>
    </div>
  );
}
