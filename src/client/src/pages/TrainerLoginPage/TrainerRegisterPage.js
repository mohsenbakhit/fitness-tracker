import React, { useState, useEffect } from "react";
import RegisterCard from "../../components/RegisterCard/RegisterCard";
import { serverPost } from "../../utils/api";
import { useNavigate } from "react-router-dom";
const TrainerRegisterPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("token", token);
      navigate("/");
    }
  }, []);

  const handleSubmit = async (data) => {
    console.log(data);
    const result = await serverPost("POST", "trainer-register", data);

    if (!result) {
      console.log("unable to register");
      return;
    }

    if (result.error) {
      console.log(result.error);
      data.setError(result.error);
      return;
    }

    if (result) {
      let loginRes = await serverPost("POST", "trainer-login", data);

      if (loginRes) {
        localStorage.setItem("trainer-token", JSON.stringify(loginRes));
        navigate("/trainer-dashboard");
      } else {
        console.log("unable to login after registration");
      }
    } else {
      console.log("An error occured.");
    }
  };

  return (
    <div>
      <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        TRAINER REGISTER
      </h1>
      <RegisterCard
        registerHref="/trainer-login"
        trainer="true"
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default TrainerRegisterPage;
