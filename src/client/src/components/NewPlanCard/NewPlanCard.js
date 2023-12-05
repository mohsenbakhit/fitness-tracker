import React, { createRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ExerciseCheckBox from "../ExerciseCheckBox/ExerciseCheckBox";

const NewPlanCard = (props) => {
  const categoryRef = createRef();
  const [errorText, setErrorText] = useState("");
  const navigate = useNavigate();
  const exerciseMap = {};

  const exerciseListCB = (id, value) => {
    if (value) {
      exerciseMap[id] = true;
    } else {
      delete exerciseMap[id];
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (categoryRef.current.value == "") {
      setErrorText("Error: Category cannot be null.");
      return;
    }

    if (Object.keys(exerciseMap).length == 0) {
      setErrorText("Error: Must choose at least 1 exercise.");
      return;
    }

    props.handleSubmit({
      category: categoryRef.current.value,
      eids: Object.keys(exerciseMap),
    });
    navigate("./..");
  };

  return (
    <div className="w-80 px-0 pt-8 mx-auto">
      <div className="relative bg-white mx-auto text-center shadow-md p-8 text-lg">
        <input
          type="text"
          placeholder="category"
          ref={categoryRef}
          className="focus:outline-none bg-gray-200 w-full border-0 m-2 p-2 box-border text-sm"
        />
        <h5>Select Exercises:</h5>
        {props.data.map((element) => (
          <ExerciseCheckBox
            data={element}
            key={element[0]}
            cb={exerciseListCB}
          />
        ))}
        {errorText}
        <button
          onClick={handleSubmit}
          className="font-roboto uppercase focus:outline-none bg-green-500 w-full border-0  m-2 p-2 text-white text-sm cursor-pointer"
        >
          CREATE
        </button>
        Click{" "}
        <Link to="./.." className="text-green-500">
          Here
        </Link>{" "}
        To Cancel!
      </div>
    </div>
  );
};

export default NewPlanCard;
