import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { changeColumns } from "../data/dataSlice";

function FilterButtons(props) {
  const dispatch = useDispatch();
  const { columns } = useSelector((state) => state.data);

  const difChecked = columns[0].checked ? "checked" : "";
  const funChecked = columns[1].checked ? "checked" : "";

  const handleCheckboxChange = (change) => {
    const idValue = change.target.checked;
    const id = columns.findIndex((item) => item.name === change.target.id);
    dispatch(changeColumns({ id, idValue }));
  };

  useEffect(() => {}, [difChecked, funChecked]);

  return (
    <div className="filterButtons">
      <label for="difficulty" id="diflabel">
        <input
          id="difficulty"
          type="checkbox"
          name="difficulty"
          onChange={handleCheckboxChange}
          checked={difChecked}
        />{" "}
        Difficulty
      </label>

      <label for="fun" id="funlabel">
        <input
          id="fun"
          type="checkbox"
          name="fun"
          onChange={handleCheckboxChange}
          checked={funChecked}
        />{" "}
        Fun
      </label>
    </div>
  );
}

export default FilterButtons;
