import TasklyAdd from './TasklyAdd'
import TasklyFilter from './TasklyFilter'
import TasklyList from './TasklyList'

export const TasklyApp = () => {
	return (
		<section className="w-full h-full p-2">
			<TasklyAdd />
			<TasklyFilter />
			<TasklyList />
		</section>
	)
}
