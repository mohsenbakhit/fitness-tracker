import React, { useState, useEffect} from "react";
import GoalCard from "../../components/GoalCard/GoalCard";
import FormGoalButton from "../../components/FormGoalButton/FormGoalButton";
import { serverPost} from "../../utils/api";

const HomePage = () => {
  const token = JSON.parse(localStorage.getItem("token") || "{}");

  console.log(token);

  const [goals, setGoals] = useState([
    {
      gid: 1,
      category: "w",
      weight: "23",
      date: "112312"
    },
    {
      gid: 2,
      category: "p",
      weight: "45",
      date: "12434"
    },
    {
      gid: 3,
      category: "w",
      weight: "64",
      date: "24324"
    },
    {
      gid: 4,
      category: "k",
      weight: "435",
      date: "24"
    },
    {
      gid: 5,
      category: "fdn",
      weight: "342345",
      date: "242043"
    }
  ]);

  
  const onLoad = async () => {
    const dummyData = await serverPost("POST", "goals-table", token);
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



  const addGoal = async (newGoal) => {
    // Check if the newGoal is already in the goals array
    if (!data.some((goal) => goal.gid === newGoal.gid)) {
    const value = await serverPost("POST", "addGoal", {token, newGoal});
    window.location.reload(false);

    if (value.success){
      setData((prevData) => [...prevData, newGoal]);
      } else {
        console.log("error in adding goal");
      }
    }
  };
  const closeForm = () => {
    // Define your logic for closing the form here
    console.log("Closing form");
  };


  // const addGoal = async (newGoal) => {
  //   // Check if the newGoal is already in the goals array
  //   if (!data.some((goal) => goal.gid === newGoal.gid)) {
  //     // Update the backend
  //     const success = await insert(newGoal.category, newGoal.weight, newGoal.din, 1); // Assuming userid is 1 for now

  //     // If the backend update is successful, update the frontend
  //     if (success) {
  //       setData((prevData) => [...prevData, newGoal]);
  //     }
  //   }
  // };

  return (
    <div>
      <div className="mt-8 text-3xl font-bold underline text-center">
        HOME PAGE
      </div>
      {/* FormGoalButton component with inline styles */}
      <div>
        <FormGoalButton onSubmit={addGoal}  closeFormGoalButton={closeForm} setGoals={setData}/>
      </div>

      <div className="mt-8 text-3xl font-bold underline text-center">
        Your current goals!
      </div>
      
      <div
      style={{
        marginTop: "20px",
        display: "flex",
        flexWrap: "wrap", 
        justifyContent: "center",
        width: "100%"
      }}
    >
      {/* Check if data is not null before mapping over it */}
      {data && data.map(row => (
        <div
          key={row[0]}
          style={{
            margin: "10px", // Adjusting the margin between the cards
            width: "calc(33.33% - 20px)", // Setting the width to fit 3 cards in a row with margins
            maxWidth: "500px", // Setting a maximum width for each card if needed
          }}
        >
          {/* Assuming ContentCard should be used here as well */}
          <GoalCard key={row[0]} gid={row[0]}category={row[1]} date={row[2]} weight={row[3]}to={null} />
        </div>
      ))}
    </div>
    </div>
  );
};

export default HomePage;



