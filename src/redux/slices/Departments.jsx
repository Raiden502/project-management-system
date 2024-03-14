import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    department_id:"",
    department_name:"",
    dept_list:[]
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
        },
        setList(state, action){
            const data =action.payload
            state.dept_list = data
        }
        
    }
})

export default slice.reducer;
export const {getDepartment,setDepartment, setList}= slice.actions;