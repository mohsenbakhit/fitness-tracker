import { useEffect, useState } from "react";
import { serverFetch, serverPost } from "../../../../utils/api";
import { useNavigate, useParams } from "react-router-dom";
import EditPlanCard from "../../../../components/EditPlanCard/EditPlanCard";

const EditPlanPage = () => {
  const params = useParams();
  const token = JSON.parse(localStorage.getItem("trainer-token") || "{}");
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [editData, setEditData] = useState({});
  const onLoad = async () => {
    const newData = await serverFetch("GET", "exercise-table");
    if (newData) setData(newData);
    const newEditData = await serverPost("POST", "get-exercise-plan-info", {epid: params.epid});
    if (newEditData) setEditData(newEditData);
  };

  useEffect(() => {
    onLoad();
  }, []);

  const handleSubmit = async (data) => {
    data.userid = params.clientId;
    data.tid = token.tid;

    console.log(data);
    const newData = await serverPost("POST", "edit-exercise-plan", data);
    navigate("./../..");
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Edit Plan
      </h1>
      {editData.eids && <EditPlanCard data={data} editData={editData} handleSubmit={handleSubmit} />}
    </div>
  );
};

export default EditPlanPage;
