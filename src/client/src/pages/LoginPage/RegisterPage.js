import React, { useState, useEffect } from "react";
import RegisterCard from "../../components/RegisterCard/RegisterCard";
import { serverPost } from "../../utils/api";
import { useNavigate } from "react-router-dom";
const RegisterPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("token", token);
      navigate("/");
    }
  }, []);

  const handleSubmit = async (event) => {
    const result = await serverPost("POST", "register", event);
    if (!result.error) {
      console.log("success: ", result);
      localStorage.setItem("token", JSON.stringify(result));
      navigate("/");
    } else {
      console.log(result.error);
    }
  };

  return (
    <div>
      <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        REGISTER
      </h1>
      <RegisterCard registerHref="/login" handleSubmit={handleSubmit} />
    </div>
  );
};

export default RegisterPage;
