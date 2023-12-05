import React, {useState, useEffect} from "react";
import NutritionPlan from "../../components/Plans/NutritionPlan";
import { serverPost } from "../../utils/api";
import ExercisePlan from "../../components/Plans/ExercisePlan";
const PlansPage = () => {
    const token = JSON.parse(localStorage.getItem("token")) || {};
    console.log(token);


    return (
        <div>
            <div>
                <div className="max-w-xs mx-auto">
                    <h2 className="text-xl mb-2 font-bold text-center">Your Nutrition Plan</h2>
                    <NutritionPlan token={token}/>
                </div>
                <div>
                    <h2 className="text-xl mb-2 font-bold text-center"> Your Exercise Plans</h2>
                    
                    <ExercisePlan token={token}/>
                </div>
            </div>
        </div>
    )
}

export default PlansPage;