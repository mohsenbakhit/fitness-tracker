import { useState } from "react";

const ExerciseCheckBox = (props) => {
  const [active, setActive] = useState(props.defaultValue);

  const clickHandler = () => {
    setActive((state) => {
      if (props.cb) props.cb(props.data[0], !state);
      return !state;
    });
  };

  return (
    <>
      <button
        onClick={clickHandler}
        className={`w-full ${
          active ? "bg-green-500 hover:bg-green-600" : "hover:bg-gray-100"
        } transition-all duration-200 ease-in-out block py-4 px-2`}
      >
        {props.data[1]}
      </button>
    </>
  );
};

export default ExerciseCheckBox;
