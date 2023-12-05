import React, { createRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ExerciseCheckBox from "../ExerciseCheckBox/ExerciseCheckBox";

const EditPlanCard = (props) => {
  const categoryRef = createRef();
  const [errorText, setErrorText] = useState("");
  const exerciseMap = {};
  const params = useParams();

  console.log(props.editData.eids);

  for (const eid of props.editData.eids) exerciseMap[eid] = true;

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
      epid: params.epid,
      category: categoryRef.current.value,
      eids: Object.keys(exerciseMap),
    });
  };

  return (
    <div className="w-80 px-0 pt-8 mx-auto">
      <div className="relative bg-white mx-auto text-center shadow-md p-8 text-lg">
        <input
          type="text"
          placeholder="category"
          ref={categoryRef}
          defaultValue={props.editData.category}
          className="focus:outline-none bg-gray-200 w-full border-0 m-2 p-2 box-border text-sm"
        />
        <h5>Select Exercises:</h5>
        {props.data.map((element) => (
          <ExerciseCheckBox
            data={element}
            key={element[0]}
            cb={exerciseListCB}
            defaultValue={exerciseMap[element[0]] || false}
          />
        ))}
        {errorText}
        <button
          onClick={handleSubmit}
          className="font-roboto uppercase focus:outline-none bg-green-500 w-full border-0  m-2 p-2 text-white text-sm cursor-pointer"
        >
          EDIT
        </button>
        Click{" "}
        <Link to="./../.." className="text-green-500">
          Here
        </Link>{" "}
        To Cancel!
      </div>
    </div>
  );
};

export default EditPlanCard;
