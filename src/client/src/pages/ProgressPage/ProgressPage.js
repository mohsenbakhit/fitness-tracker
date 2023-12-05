import React, {useState, useEffect} from "react";
import { serverPost } from "../../utils/api";
import ProgressReportCard from "../../components/Progress/ProgressReportCard";

const ProgressPage = () => {
  const token = JSON.parse(localStorage.getItem("token") || "{}");
  console.log(token);
  const onLoad = async () => {
    const dummyData = await serverPost("POST", "progress-table", token);
    setData(dummyData);
    console.log(dummyData)
  };
  const [data, setData] = useState([]);
  useEffect(() => {
    onLoad();
  }, []);
    

    if (data === undefined) {
      return <div>Still Loading...</div>
    }

    return (
        <div>
      {data.map(row => 
        <ProgressReportCard key={row[0]} satisfaction={row[1]} date={row[2]}/>)}
    </div>
    )
}

export default ProgressPage;