import React from "react";
import { useDispatch } from "react-redux";
import logOutClick from "../data/dataSlice";

function LogOut() {
  const dispatch = useDispatch();
  console.log("in logOut");
  dispatch(logOutClick(false));
}

export default LogOut;
