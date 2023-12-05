import { serverPost } from "../../utils/api";

const GoalCard = (props) => {
  

  const token = JSON.parse(localStorage.getItem("token") || "{}");

  const deleteHandler = async () => {
    console.log(props.gid);
    const result = await serverPost("POST", "deleteGoal", {gid: props.gid});
    console.log("delete!", {});
    window.location.reload(false);
  }

  return (
    <div className="max-w-sm mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
        <div className="card-body">
          <h5 className="text-xl font-semibold mb-2">{props.category}</h5>
          <h6 className="text-sm text-gray-600 mb-2">{props.date}</h6>
          <p className="text-sm text-gray-700 mb-4">{props.weight}</p>
          <button onClick={deleteHandler} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 text-sm">
          Delete
        </button>
          
        </div>
      </div>
  );
};

export default GoalCard;
