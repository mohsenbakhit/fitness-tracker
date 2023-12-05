import { Link } from "react-router-dom";
import { serverPost } from "../../utils/api";

const ExercisePlanCard = (props) => {
  const deleteHandler = async () => {
    const result = await serverPost("POST", "delete-exercise-plan", {
      epid: props.epid,
    });
    window.location.reload(false);
  };

  return (
    <div className="max-w-sm mx-auto mt-8 p-4 bg-white rounded-lg shadow-lg border-4 border-black">
      <div className="card-body">
        <h5 className="text-xl font-semibold mb-2">{props.title}</h5>
        <button
          onClick={deleteHandler}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 text-sm"
        >
          Delete
        </button>
        <Link to={`./edit-plan/${props.epid}`}>
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 text-sm ml-4">
            Edit
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ExercisePlanCard;
