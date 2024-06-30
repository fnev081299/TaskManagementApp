import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import taskService from '../services/taskService';
import { Task } from '../interfaces/Task';

interface TasksState {
    tasks: Task[];
    loading: boolean;
    error: string | null;
}

const initialState: TasksState = {
    tasks: [],
    loading: false,
    error: null,
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        getTasksStart(state) {
            state.loading = true;
            state.error = null;
        },
        getTasksSuccess(state, action: PayloadAction<Task[]>) {
            state.loading = false;
            state.tasks = action.payload;
        },
        getTasksFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        addTask(state, action: PayloadAction<Task>) {
            state.tasks.push(action.payload);
        },
        updateTask(state, action: PayloadAction<Task>) {
            const index = state.tasks.findIndex(task => task.id === action.payload.id);
            if (index !== -1) {
                state.tasks[index] = action.payload;
            }
        },
        deleteTask(state, action: PayloadAction<number>) {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
        },
    },
});

export const {
    getTasksStart,
    getTasksSuccess,
    getTasksFailure,
    addTask,
    updateTask,
    deleteTask,
} = tasksSlice.actions;

export default tasksSlice.reducer;

export const fetchTasksByUserId = (userId: number): AppThunk => async dispatch => {
    try {
        dispatch(getTasksStart());
        const tasks = await taskService.getTasksByUserId(userId);
        dispatch(getTasksSuccess(tasks));
    } catch (error) {
        dispatch(getTasksFailure(error.message));
    }
};
