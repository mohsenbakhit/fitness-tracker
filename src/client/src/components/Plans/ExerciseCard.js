import React from "react";

const ExerciseCard = (props) => {
  console.log(props.exercise);
    return (
        <div>
          {props.exercise.map(row => {
            return (
                <p className="text-s mb-2 text-gray-700">{row[2]}</p>
            )
          })}
        </div>
    )
}

export default ExerciseCard;