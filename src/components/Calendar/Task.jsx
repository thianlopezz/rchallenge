import React from "react";
import PropTypes from "prop-types";

function Task({ description, onClick }) {
  return (
    <div
      className="mx-1 mt-1 mb-2 bg-yellow-300 rounded cursor-pointer border border-transparent shadow-sm text-base font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:w-auto sm:text-sm"
      onClick={onClick}
    >
      <p className="truncate overflow-ellipsis p-1 my-0">{description}</p>
    </div>
  );
}

Task.propTypes = {
  description: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

export default Task;
