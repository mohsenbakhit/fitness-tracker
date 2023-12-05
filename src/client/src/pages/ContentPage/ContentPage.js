import React, { useEffect, useState } from "react";
import { serverFetch } from "../../utils/api";
import ContentCard from "../../components/ContentCard/ContentCard";


const ContentPage = () => {
  const [content] = useState([
    {
      cid: 1,
      category: "Nutrition",
      author: "A",
      url: "https://www.health.harvard.edu/topics/nutrition"
    },
    {
      cid: 2,
      category: "Exercise",
      author: "B",
      url: "https://www.health.harvard.edu/topics/exercise-and-fitness"
    },
    {
      cid: 3,
      category: "Nutrition",
      author: "C",
      url: "https://www.helpguide.org/articles/healthy-eating/healthy-eating.htm"
    },
    {
      cid: 4,
      category: "Exercise",
      author: "D",
      url: "https://www.helpguide.org/articles/healthy-living/the-mental-health-benefits-of-exercise.htm"
    },
    {
      cid: 5,
      category: "Nutrition",
      author: "E",
      url: "https://www.nytimes.com/spotlight/well-nutrition"
    }
  ]);

  const onLoad = async () => {
    const dummyData = await serverFetch("GET", "content-table");
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
      CONTENT PAGE
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
          <ContentCard key={row[0]} author={row[1]} url={row[2]} to={null} />
        </div>
      ))}
    </div>
  </div>
);
};
 export default ContentPage;


