import { useEffect, useState } from "react";
import { serverFetch, serverPost } from "../../utils/api";
import ClientCard from "../../components/ClientCard/ClientCard";
import { useNavigate } from "react-router-dom";

const TrainerPage = () => {
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("trainer-token")) || {};
  const [data, setData] = useState([]);

  console.log("token", token);

  const onLoad = async () => {
    const dummyData = await serverPost("POST", "get-clients", token);
    if (dummyData) {
      setData(dummyData);
      console.log(dummyData);
    }
    // todo: get client data
  };

  const logoutHandler = () => {
    localStorage.setItem("trainer-token", "");
    navigate("/trainer-login");
  };

  useEffect(() => {
    onLoad();
  }, []);

  return (
    <div>
      <button
        onClick={logoutHandler}
        class="bg-blue-500 hover:bg-blue-600 ml-8 text-white font-bold py-2 mt-8 px-4 rounded inline-block text-center mx-auto"
      >
        Logout
      </button>
      <h1 className="mt-8 text-3xl font-bold text-center">
        Welcome, {token.name}
      </h1>
      <h1 className="mt-8 text-3xl font-bold text-center">Clients</h1>
      {data.map((row) => {
        return (
          <ClientCard
            key={row[0]}
            name={row[1]}
            email={row[2]}
            location="location"
            to={`/trainer-dashboard/view/${row[0]}`}
          />
        );
      })}
    </div>
  );
};

export default TrainerPage;
