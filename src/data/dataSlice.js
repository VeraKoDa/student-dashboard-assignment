import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  studentdata: [],
};

const dataSlice = createSlice({
  name: "studentData",
  initialState,

  reducers: {
    dataAdded(state, action) {
      console.log(action.payload[0]);
      state.studentdata = [];
      action.payload.forEach((item) => {
        const studentData = {
          name: item[0],
          assignment: item[1],
          difficulty: item[2],
          fun: item[3],
        };
        state.studentdata.push(studentData);
      });
    },
    dataSort(state, action) {
      console.log(`in dataSort met state: ${state} en met action: ${action}`);
    },
  },
});
export const { dataAdded, dataSort } = dataSlice.actions;

export default dataSlice.reducer;
