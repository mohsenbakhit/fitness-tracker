import { useEffect, useState } from "react";
import NewPlanCard from "../../../../components/NewPlanCard/NewPlanCard";
import { serverFetch, serverPost } from "../../../../utils/api";
import { useParams } from "react-router-dom";

const NewPlanPage = () => {
  const params = useParams();
  const token = JSON.parse(localStorage.getItem("trainer-token") || "{}");

  const [data, setData] = useState([]);

  const onLoad = async () => {
    const newData = await serverFetch("GET", "exercise-table");
    if (newData) setData(newData);
    console.log(newData);
  };

  useEffect(() => {
    onLoad();
  }, []);

  const handleSubmit = async (data) => {
    data.userid = params.clientId;
    data.tid = token.tid;

    const newData = await serverPost("POST", "create-exercise-plan", data);

  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        New Plan
      </h1>
      <NewPlanCard data={data} handleSubmit={handleSubmit} />
    </div>
  );
};

export default NewPlanPage;
