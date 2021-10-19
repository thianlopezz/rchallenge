import React from "react";
import PropTypes from "prop-types";

function TextInput({
  label,
  id,
  name,
  value = "",
  type = "text",
  placeholder = "",
  pattern,
  onChange,
  required = false,
  disabled = false
}) {
  return (
    <label className="block">
      <span className="text-gray-700">{label}</span>
      <input
        className="border-2 my-2 transition duration-500 placeholder-blue-400 focus:placeholder-transparent border-gray-400 w-full p-2 bg-transparent rounded-md focus:outline-none"
        placeholder={placeholder}
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        pattern={pattern}
        required={required}
        disabled={disabled}
      />
    </label>
  );
}

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  pattern: PropTypes.string,  
  required: PropTypes.bool,
  disabled: PropTypes.bool  
};

export default TextInput;
