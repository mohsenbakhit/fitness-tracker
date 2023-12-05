import { useEffect, useState } from "react";
import { serverPost } from "../../utils/api";
import ExerciseCard from "./ExerciseCard";
const ExercisePlan = (token) => {
  const onLoad = async () => {
    const result = await serverPost("POST", "exerciseplan-table", token);
    setData(result);
  };

  const [data, setData] = useState();

  useEffect(() => {
    onLoad();
  }, []);

  if (data === undefined) {
    return <div>Still Loading ...</div>;
  }

  return (
    <div>
      {data.map((row) => {
          return <div className="card-body max-w-xs mx-auto mt-2 p-4 bg-white rounded-lg shadow-lg border-0">
            <h3 className="font-semibold  text-center mb-2">
              Exercise Plan {row[0][0]}
            </h3>
            <ExerciseCard exercise={row} />
          </div>
      })}
    </div>
  )
};

export default ExercisePlan;
