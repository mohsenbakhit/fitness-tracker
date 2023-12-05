
import React, { useState , useEffect} from "react";
import NotificationCard from "../../components/NotificationCard/NotificationCard";
import { serverPost } from "../../utils/api";


const NotificationsPage = () => {
  const token = JSON.parse(localStorage.getItem("token")) || {};

 
  const onLoad = async () => {
    
  const dummyData = await serverPost("POST", "notifications-table", token);
  if (dummyData){
   setData(dummyData);
  console.log(dummyData)
  } else {
    console.log("else");
  }
};

  useEffect(() => {
    onLoad();
  }, []);

  const [data, setData] = useState([]);

  

    return (
        <div>
          <div className="mt-8 text-3xl font-bold underline text-center">
            NOTIFICATIONS PAGE
          </div>


    <div>
      {data.map((card) => {
        console.log(card);
        return (
        
          <NotificationCard
            key={card[0]} 
            rid={card[0]} 
            title={card[2]}
            key1={token.name}
          />
        
      )})}
    </div>
  

        </div>
      );
    };
    
    export default NotificationsPage;
    
    
    
 
