import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  studentdata: [],
  status: "idle",
  columns: [],
  students: [],
  assignments: [],
  loggedIn: false,
  loggedInStudent: false,
};

const dataSlice = createSlice({
  name: "studentData",
  initialState,

  reducers: {
    dataAdded(state, action) {
      // first empty studentdata
      state.studentdata = [];
      // change status to loading
      state.status = "loading";
      // change states
      state.studentdata = action.payload.studentData;
      state.students = action.payload.students;
      state.assignments = action.payload.assignments;
      // change status
      state.status = "finished";
    },

    columnsAdded(state, action) {
      state.columns = [];
      state.columns = action.payload;
    },

    changeColumns(state, action) {
      state.columns[action.payload.id].checked = action.payload.idValue;
    },

    loggedInChanged(state, action) {
      state.loggedIn = action.payload.bool;
      state.loggedInStudent = action.payload.name;
    },
  },
});
export const {
  dataAdded,
  columnsAdded,
  changeColumns,
  dataSort,
  loggedInChanged,
  logOutClick,
} = dataSlice.actions;

export default dataSlice.reducer;
