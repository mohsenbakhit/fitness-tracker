import { useState, setState, useEffect } from "react";
import LoginCard from "../../components/LoginCard/LoginCard";
import { serverPost } from "../../utils/api";
import { useNavigate } from "react-router-dom";
const TrainerLoginPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem("trainer-token");
    if (token) {
      console.log("trainer-token", token);
      navigate("/trainer-dashboard");
    }
  }, []);

  const handleSubmit = async (event) => {
    console.log(event);
    let result = await serverPost("POST", "trainer-login", event);
    console.log(result);

    if (result) {
      localStorage.setItem("trainer-token", JSON.stringify(result));
      navigate("/trainer-dashboard");
    } else {
      event.setError("Invalid Crednetials");
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Trainer Login
      </h1>
      <LoginCard
        handleSubmit={handleSubmit}
        registerHref="/trainer-register"
        trainerHref="/login"
        altHrefWord="User"
      />
    </div>
  );
};

export default TrainerLoginPage;
