import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    department_id:"",
    department_name:""
};

const slice=createSlice({
    name:'department',
    initialState,
    reducers:{
        getDepartment(state,action){
            const {name,department_id}=action.payload
            state.department_id=department_id
            state.department_name=name
        },
        setDepartment(state,action){
            const {department_id, name}=action.payload
            state.department_id=department_id
            state.department_name=name
        }
    }
})

export default slice.reducer;
export const {getDepartment,setDepartment}= slice.actions;