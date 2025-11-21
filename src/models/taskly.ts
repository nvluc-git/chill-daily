export type PriorityTaskType = 'Low' | 'Medium' | 'High'
export type StatusTaskType = 'Pending' | 'In Progress' | 'Completed'

export interface TaskType {
	id: string
	title: string
	priority: PriorityTaskType
	status: StatusTaskType
}

export interface TasklyAppState {
	savedTasks: Array<TaskType>
	filtered: StatusTaskType | null
	sorted: number | null
	tasks: Array<TaskType>
	isFilterBar: boolean
}