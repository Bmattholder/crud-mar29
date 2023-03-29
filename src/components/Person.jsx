import React, { Fragment, useState } from "react";
import axios from "axios";

import "./Person.css";

function Person({ id, firstName, lastName, address, toggleHelper }) {
  const [editMode, setEditMode] = useState(false);
  const [editFormData, setEditFormData] = useState({
    praenomens: [firstName],
    cognomen: lastName,
    number: address.number,
    street: address.street,
    city: address.city,
    state: address.state,
    zip: address.zip,
  });

  const { praenomens, cognomen, number, street, city, state, zip } =
    editFormData;

  const resetEditFormData = () => {
    setEditFormData({
      praenomens: [firstName],
      cognomen: lastName,
      number: address.number,
      street: address.street,
      city: address.city,
      state: address.state,
      zip: address.zip,
    });
  };

  const editModeHelper = () => {
    setEditMode(!editMode);
    resetEditFormData();
  };

  const onChange = (e) => {
    if (e.target.name === "praenomens") {
      setEditFormData((p) => ({
        ...p,
        [e.target.name]: e.target.value.split(),
      }));
    } else {
      setEditFormData((p) => ({
        ...p,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const onSubmit = async (e, id) => {
    e.preventDefault();
    const res = await axios.patch(
      `http://localhost:8080/api/v1/people/${id}`,
      editFormData
    );
    console.log(res);
    editModeHelper();
    toggleHelper();
  };

  const onDelete = async (id) => {
    const res = await axios.delete(`http://localhost:8080/api/v1/people/${id}`);
    console.log(res);
    toggleHelper();
  };

  return (
    <div className="card">
      {!editMode ? (
        <Fragment>
          <h3>
            {id}: {firstName} {lastName}
          </h3>
          <p>
            {address.number} {address.street}
          </p>
          <p>
            {address.city} {address.state} {address.zip}
          </p>
          <button onClick={editModeHelper} className="btn">
            Edit
          </button>
          <button onClick={() => onDelete(id)} className="dngr">
            Delete
          </button>
        </Fragment>
      ) : (
        <form onSubmit={onSubmit}>
          <input
            type="text"
            className="edit-input"
            name="praenomens"
            id="praenomens"
            value={praenomens}
            onChange={onChange}
            placeholder="Praenomens"
            required
          />
          <input
            type="text"
            className="edit-input"
            name="cognomen"
            id="cognomen"
            value={cognomen}
            onChange={onChange}
            placeholder="Cognomen"
            required
          />
          <input
            type="text"
            className="edit-input"
            name="number"
            id="number"
            value={number}
            onChange={onChange}
            placeholder="Number"
            required
          />
          <input
            type="text"
            className="edit-input"
            name="street"
            id="street"
            value={street}
            onChange={onChange}
            placeholder="Street"
            required
          />
          <input
            type="text"
            className="edit-input"
            name="city"
            id="city"
            value={city}
            onChange={onChange}
            placeholder="City"
            required
          />
          <input
            type="text"
            className="edit-input"
            name="state"
            id="state"
            value={state}
            onChange={onChange}
            placeholder="State"
            required
          />
          <input
            type="text"
            className="edit-input"
            name="zip"
            id="zip"
            value={zip}
            onChange={onChange}
            placeholder="Zip"
            required
          />
          <div>
            <button onClick={(e) => onSubmit(e, id)} className="btn">
              Submit
            </button>
            <button onClick={editModeHelper} className="dngr">
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Person;
