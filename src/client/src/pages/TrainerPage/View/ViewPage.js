import { Link, useParams } from "react-router-dom";
import ClientDetails from "../../../components/ClientDetails/ClientDetails";
import { serverPost } from "../../../utils/api";
import { useEffect, useState } from "react";
import ExercisePlanCard from "../../../components/ExercisePlanCard/ExercisePlanCard";

const TrainerViewPage = () => {
  const params = useParams();
  console.log(localStorage.getItem("trainer-token"));
  const token = JSON.parse(localStorage.getItem("trainer-token") || "{}");
  const id = params.clientId;

  console.log(token);
  const [planData, setPlanData] = useState([]);
  const [userData, setUserData] = useState([]);

  const onLoad = async () => {
    const newUserData = await serverPost("POST", "view-client-info", {
      userid: id,
    });
    if (newUserData) {
      setUserData(newUserData);
      console.log(newUserData);
    }

    const newPlanData = await serverPost("POST", "view-client-plans", {
      userid: id,
    });
    if (newPlanData) {
      setPlanData(newPlanData);
      console.log(newPlanData);
    }
  };

  useEffect(() => {
    onLoad();
  }, []);

  return (
    <div>
      <Link to="/trainer-dashboard">
        <button className="bg-blue-500 hover:bg-blue-600 ml-8 text-white font-bold py-2 mt-8 px-4 rounded inline-block text-center mx-auto">
          Back
        </button>
      </Link>

      {userData.length > 0 && (
        <>
          <h1 className="mt-8 text-3xl font-bold text-center">
            Client Information:
          </h1>
          <ClientDetails
            name={userData[0][1]}
            email={userData[0][2]}
            location={`Approx Location: ${userData[0][3]}, ${userData[0][4]}`}
          />
        </>
      )}

      <h1 className="mt-8 text-3xl font-bold text-center">
        Client Exercise Plans:
      </h1>
      <div className="flex justify-center items-center">
        <Link to={`./new-plan/`}>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 mt-8 px-4 rounded inline-block text-center mx-auto">
            NEW EXERCISE
          </button>
        </Link>
      </div>
      {planData.map(([epid, planType]) => (
        <ExercisePlanCard key={epid} epid={epid} title={planType} />
      ))}
    </div>
  );
};

export default TrainerViewPage;
