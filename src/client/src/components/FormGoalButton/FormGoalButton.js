import React from "react";
import  { useState } from "react";
import { v4 as uuidv4 } from "uuid";



const FormGoalButton = ({ closeFormGoalButton, onSubmit,  setGoals }) => {
  const [category, setCategory] = useState(""); // State for category input
  const [weight, setWeight] = useState(""); // State for weight input
  const [date, setDate] = useState(""); // State for date input

  const handleDateChange = (e) => {
    // Update the date state as the user types in the input field
    setDate(e.target.value);
  };

  const handleWeightChange = (e) => {
    // Update the date state as the user types in the input field
    setWeight(e.target.value);
  };

  const handleCategoryChange = (e) => {
    // Update the date state as the user types in the input field
    setCategory(e.target.value);
  };

  const formatDate = (inputDate) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const formattedDate = new Date(inputDate).toLocaleDateString(undefined, options);
    return formattedDate;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate the date format (DD-MMM-YYYY)
    const dateFormatRegex = /^(0[1-9]|[12][0-9]|3[01])-(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)-\d{4}$/i;

    if (!dateFormatRegex.test(date)) {
      window.alert("Invalid date format. Please use the format 'DD-MMM-YYYY' (e.g., 10-sep-2023).");
      return;
    }

    const formattedDate = formatDate(date);

    const newGoal = {
      gid: uuidv4(),
      category: category,
      weight: weight,
      date: formattedDate,
    };

    // Call the onSubmit prop, which is the addGoal function passed from the parent component
    onSubmit(newGoal);
    closeFormGoalButton();  // Close the modal after submitting the form
    setGoals((prevGoals) => [...prevGoals, newGoal]);
    window.alert("New goal created!");
  };

  return (
      <div className="max-w-sm mx-auto mt-8 p-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Create a New Goal</h2>
        <form onSubmit={handleSubmit}>
          
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600">Category:</label>
            <input
              type="text"
              name="category"
              className="mt-1 p-2 w-full border rounded"
              value={category}
              onChange={handleCategoryChange}
              placeholder="Enter a category (e.g. Power lifting)"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600">Weight:</label>
            <input
              type="text"
              name="weight"
              className="mt-1 p-2 w-full border rounded"
              value={weight}
              onChange={handleWeightChange}
              placeholder="Enter a number (e.g. 50)"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-600">Date:</label>
            <input
              type="text"
              name="date"
              className="mt-1 p-2 w-full border rounded"
              value={date}
              onChange={handleDateChange}
              placeholder="Enter a date (e.g. 10-sep-2023)"
              required
            />
          </div>
          <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
        </form>
      </div>
   
  );
};

export default FormGoalButton
;
