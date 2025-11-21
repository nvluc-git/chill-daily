import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as renderId } from 'uuid'
import { PriorityTaskType, StatusTaskType, TasklyAppState, TaskType } from 'models/taskly'
import { prioSortMapping } from 'helpers/mapping'
import { getLocalStorage } from 'utils/localStorage'

const getTaskListLocal = getLocalStorage('taskList', [])
const getSavedTasksLocal = getLocalStorage('savedTasks', [])
const getIsFilterBar = getLocalStorage('filterBar',false)

const initialState: TasklyAppState = {
	savedTasks: getSavedTasksLocal,
	tasks: getTaskListLocal,
	filtered: null,
	sorted: null,
	isFilterBar: getIsFilterBar,
}

const tasklyApp = createSlice({
	name: 'tasklyApp',
	initialState,
	reducers: {
		addNewTask: (
			state,
			action: PayloadAction<{ title: string; priority: PriorityTaskType }>,
		) => {
			const { title, priority } = action.payload
			const newTask: TaskType = { id: renderId(), title, priority, status: 'Pending' }
			state.savedTasks.push(newTask)
			updateTasksFromSaved(state)
		},

		changeStatusTask: (
			state,
			action: PayloadAction<{ id: string; status: StatusTaskType }>,
		) => {
			const task = state.savedTasks.find((t) => t.id === action.payload.id)
			if (!task) return
			task.status = action.payload.status
			updateTasksFromSaved(state)
		},

		removeTask: (state, action: PayloadAction<string>) => {
			state.savedTasks = state.savedTasks.filter((task) => task.id !== action.payload)
			updateTasksFromSaved(state)
		},

		updateTaskPosition: (
			state,
			action: PayloadAction<{ activeId: string; overId: string }>,
		) => {
			const { activeId, overId } = action.payload

			const oldIndex = state.savedTasks.findIndex((task) => task.id === activeId)
			const newIndex = state.savedTasks.findIndex((task) => task.id === overId)

			if (oldIndex === -1 || newIndex === -1) return

			const [movedTask] = state.savedTasks.splice(oldIndex, 1)
			state.savedTasks.splice(newIndex, 0, movedTask)

			updateTasksFromSaved(state)
		},

		filterByStatus: (state, action: PayloadAction<StatusTaskType>) => {
			state.filtered = state.filtered === action.payload ? null : action.payload
			updateTasksFromSaved(state)
		},

		sortByPrio: (state, action: PayloadAction<number>) => {
			state.sorted = action.payload
			updateTasksFromSaved(state)
		},

		resetFilter: (state) => {
			state.filtered = null
			state.sorted = null
			updateTasksFromSaved(state)
		},
	},
})

const updateTasksFromSaved = (state: typeof initialState) => {
	state.tasks = state.filtered
		? state.savedTasks.filter((t) => t.status === state.filtered)
		: [...state.savedTasks]

	if (state.sorted !== null) {
		const order = state.sorted === 1 ? -1 : 1
		state.tasks.sort(
			(a, b) => order * (prioSortMapping[a.priority] - prioSortMapping[b.priority]),
		)
	}

	state.isFilterBar = state.savedTasks.length > 0
}

export const {
	addNewTask,
	changeStatusTask,
	removeTask,
	updateTaskPosition,
	filterByStatus,
	sortByPrio,
	resetFilter,
} = tasklyApp.actions
export default tasklyApp.reducer
