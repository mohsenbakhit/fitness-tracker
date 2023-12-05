import React, { createRef, useState } from "react";
import { Link } from "react-router-dom";

const RegisterCard = (props) => {
  const emailRef = createRef();
  const passwordRef = createRef();
  const nameRef = createRef();
  const cityRef = createRef();
  const countryRef = createRef();
  const postalRef = createRef();
  const freeUserRef = createRef();
  const [error, setError] = useState("");

  const onFormSubmit = (event) => {
    event.preventDefault();

    if (!nameRef.current.value) {
      setError("Name cannot be empty");
      return;
    }

    if (!emailRef.current.value) {
      setError("Email cannot be empty");
      return;
    }

    if (!passwordRef.current.value) {
      setError("Password cannot be empty");
      return;
    }

    if (!cityRef.current.value) {
      setError("City cannot be empty");
      return;
    }

    if (!countryRef.current.value) {
      setError("Country cannot be empty");
      return;
    }

    if (!postalRef.current.value) {
      setError("Postal code cannot be empty");
      return;
    }

    if (postalRef.current.value.length > 10) {
      setError("invalid postal code!");
      return;
    }

    setError("");

    props.handleSubmit({
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      city: cityRef.current.value,
      country: countryRef.current.value,
      postal: postalRef.current.value,
      freeUser: freeUserRef.current && freeUserRef.current.checked,
      setError
    });
  };

  return (
    <div className="w-80 px-0 pt-8 mx-auto">
      <div className="relative bg-white mx-auto text-center shadow-md p-8 text-lg">
        <h1 className="uppercase">Register</h1>
        <form onSubmit={onFormSubmit}>
          <input
            type="text"
            placeholder="full name"
            ref={nameRef}
            className="focus:outline-none bg-gray-200 w-full border-0 m-2 p-2 box-border text-sm"
          />
          <input
            type="text"
            placeholder="email"
            ref={emailRef}
            className="focus:outline-none bg-gray-200 w-full border-0 m-2 p-2 box-border text-sm"
          />
          <input
            type="password"
            placeholder="password"
            ref={passwordRef}
            className="focus:outline-none bg-gray-200 w-full border-0 m-2 p-2 box-border text-sm"
          />
          <input
            type="text"
            placeholder="city"
            ref={cityRef}
            className="focus:outline-none bg-gray-200 w-full border-0 m-2 p-2 box-border text-sm"
          />
          <input
            type="text"
            placeholder="country"
            ref={countryRef}
            className="focus:outline-none bg-gray-200 w-full border-0 m-2 p-2 box-border text-sm"
          />
          <input
            type="text"
            placeholder="postal code"
            ref={postalRef}
            className="focus:outline-none bg-gray-200 w-full border-0 m-2 p-2 box-border text-sm"
          />
          {!props.trainer && (
            <>
              <input type="checkbox" ref={freeUserRef} />
              <span>Free User?</span>
            </>
          )}
          <div className="text-red-300">{error}</div>
          <button className="font-roboto uppercase focus:outline-none bg-green-500 w-full border-0  m-2 p-2 text-white text-sm cursor-pointer">
            REGISTER
          </button>
          Click{" "}
          <Link to={props.registerHref} className="text-green-500">
            Here
          </Link>{" "}
          To Login!
        </form>
      </div>
    </div>
  );
};

export default RegisterCard;
