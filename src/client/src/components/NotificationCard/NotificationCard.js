import React, { useState } from 'react';
import { serverPost } from "../../utils/api";

const NotificationCard = (props) => {
  

  const token = JSON.parse(localStorage.getItem("token") || "{}");

  const deleteHandler = async () => {
    console.log(props.rid);
    const result = await serverPost("POST", "deleteNotification", {rid: props.rid});
    console.log("delete!", {});
    window.location.reload(false);
  }

 

  return (
    
      <div className="max-w-sm mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
        <div className="card-body">
          <h5 className="text-xl font-semibold mb-2">{props.title}</h5>
          <p className="text-sm text-gray-700 mb-4">Notification for: {props.key1}</p>
          <button onClick={deleteHandler} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 text-sm">
          Delete
        </button>
          
        </div>
      </div>
    
  );
};

export default NotificationCard;

