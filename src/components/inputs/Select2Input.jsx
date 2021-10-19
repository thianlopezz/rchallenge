import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import TextInput from "./TextInput";
import LoadingSpinner from "../LoadingSpinner";

function Select2Input({
  label,
  id,
  name,
  inputText = "",
  type = "text",
  placeholder = "",
  pattern,
  onInputTextChange,
  onInputSelectChange,
  required = false,
  disabled = false,
  options,
  loading = false
}) {
  const [inputTextValue, setInputTextValue] = useState("");

  useEffect(() => {
    setInputTextValue(inputText);
  }, [inputText]);

  return (
    <>
      <div className="grid grid-flow-col grid-cols-12 gap-1">
        <div className="col-span-10">
          <TextInput
            id={id}
            name={name}
            label={label}
            value={inputTextValue}
            onChange={(e) => setInputTextValue(e.target.value)}
            required={required}
            disabled={disabled}
            type={type}
            pattern={pattern}
            placeholder={placeholder}
          />
        </div>
        <div className="col-span-2 self-end my-2">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <button
              type="button"
              onClick={() => onInputTextChange(inputTextValue)}
              className="w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:w-auto sm:text-sm"
            >
              Search
            </button>
          )}
        </div>
      </div>
      <div className="rounded py-1 px-2 bg-gray-200 border-blue-400 overflow-y-auto max-h-28">
        {options &&
          options.length > 0 &&
          options.map((option) => (
            <p key={option.value} className="my-1">
              <a
                className="cursor-pointer text-blue-500 underline"
                onClick={() => onInputSelectChange(option)}
              >
                {option.text}
              </a>
            </p>
          ))}
      </div>
    </>
  );
}

Select2Input.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  inputText: PropTypes.string,
  value: PropTypes.string,
  onInputTextChange: PropTypes.func.isRequired,
  pattern: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  onInputSelectChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object),  
  loading: PropTypes.bool
};

export default Select2Input;
