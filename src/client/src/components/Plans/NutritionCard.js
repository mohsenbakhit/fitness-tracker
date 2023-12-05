import {React} from "react";

const NutritionCard = (nutriPlan) => {
    return (
        <div className="max-w-sm mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
        <div className="card-body">
          <h5 className="text-xl font-semibold mb-2">Calories: {nutriPlan.calories}</h5>
          <p className="text-sm text-gray-700 mb-4">Carbohydrates: {nutriPlan.carbs}g</p>
          <p className="text-sm text-gray-700 mb-4">Fats: {nutriPlan.fats}g</p>
          <p className="text-sm text-gray-700 mb-4">Protein: {nutriPlan.protein}g</p>
          
        </div>
      </div>
    )
}

export default NutritionCard;