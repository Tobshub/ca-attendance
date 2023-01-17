import InputDropDown from "@ui/input-dropdown";
import csx from "@utils/csx";
import { trpc } from "@utils/trpc";
import React, { useEffect, useState } from "react";

export default function IndexPage() {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
  });
  const { data: users, isLoading } = trpc.users.filter.useQuery({
    // filter user list with the name that is being typed
    name: inputs.name,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let selection: CAWorkerRef | undefined = undefined;
    if (users) {
      selection = users.find(
        user => user.name.toLowerCase() === e.target.value.toLowerCase()
      );
    }
    setInputs(state => ({
      ...state,
      name: selection?.name ?? e.target.value,
      email: selection?.email ?? "",
    }));
  };

  const markPresent = trpc.attendance.markPresent.useMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (users) {
      const selection = users.find(
        user => user.email === inputs.email && user.name === inputs.name
      );
      if (selection) {
        markPresent.mutateAsync(selection).then(() => {
          console.log("marking present...");
        });
      }
    }
  };

  if (!users && !isLoading) {
    throw new Error("error getting users");
  }

  return (
    <div
      className={csx(
        "d-flex flex-column",
        "justify-content-center",
        "align-items-center"
      )}
    >
      <h1>Welcome To Church! Let's mark your attendance!</h1>
      <div>
        <ul>
          <h2>Steps: </h2>
          <li>Step 1: Choose a department you fall under</li>
          <li>
            Step 2: Fill in your full-name and confirm that your email
            address is correct
          </li>
          <li>
            Step 3: Click Mark me present and wait for it to complete
          </li>
          <li>Step 4: Enjoy the service!</li>
        </ul>
      </div>
      <form
        onSubmit={handleSubmit}
        style={{
          width: "min(95%, 400px)",
        }}
      >
        <fieldset>
          <InputDropDown
            label="Full-Name:"
            id="input-w-dropdown"
            inputValue={inputs.name}
            onChange={handleChange}
            options={users ?? []}
          />
          <div className="form-floating">
            <input
              type="text"
              className={csx("form-control ")}
              disabled={true}
              value={inputs.email}
            />
            <label>Email: </label>
          </div>
        </fieldset>
        <button
          disabled={inputs.email ? false : true}
          type="submit"
          className={csx("btn btn-outline-success btn-lg")}
        >
          Mark me present!
        </button>
      </form>
      {inputs.email ? (
        <span
          className="alert alert-info"
          style={{ width: "min(95%, 400px)" }}
        >
          If you this is not your email{" "}
          <strong>
            please contact a member of the technical department
          </strong>
        </span>
      ) : null}
    </div>
  );
}
