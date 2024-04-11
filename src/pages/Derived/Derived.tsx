import { useState } from "react";

export const Derived = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fullName, setFullName] = useState("");

  function handleFirstNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFirstName(e.target.value);
    setFullName(`${e.target.value} ${lastName}`);
  }

  function handleLastNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setLastName(e.target.value);
    setFullName(`${firstName} ${e.target.value}`);
  }

  return (
    <div className="mt-16 text-center">
      <label>
        First name:{" "}
        <input
          value={firstName}
          onChange={handleFirstNameChange}
          className="my-1 rounded-md border border-gray-300 p-1"
        />
      </label>
      <label>
        Last name:{" "}
        <input
          value={lastName}
          onChange={handleLastNameChange}
          className="my-1 rounded-md border border-gray-300 p-1"
        />
      </label>
      <p className="mt-4 text-2xl">
        Full Name: <b>{fullName}</b>
      </p>
    </div>
  );
};
