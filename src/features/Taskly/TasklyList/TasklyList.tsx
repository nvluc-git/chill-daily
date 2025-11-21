import { useAppDispatch, useAppSelector } from 'helpers/redux'
import { RootState } from 'stores'
import TasklyItem from '../TasklyItem'
import {
	closestCenter,
	DndContext,
	PointerSensor,
	useSensor,
	useSensors,
	DragEndEvent,
} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useCallback, useEffect, useMemo } from 'react'
import { updateTaskPosition } from 'stores/sliceReducers/taskly'
import { restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { Flex } from 'antd'
import { CoffeeOutlined, FrownOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { setLocalStorage } from 'utils/localStorage'
import { TaskType } from 'models/taskly'

export const TasklyList = () => {
	const dispatch = useAppDispatch()
	const taskList = useAppSelector((state: RootState) => state.taskly.tasks)
	const savedTasks = useAppSelector((state: RootState) => state.taskly.savedTasks)
	const taskIds = useMemo(() => taskList.map((task) => task.id), [taskList])

	const { t } = useTranslation('taskly')

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				delay: 200,
				tolerance: 10,
			},
		}),
	)

	const handleDragEnd = useCallback(
		(event: DragEndEvent) => {
			const { active, over } = event

			if (!over || active.id === over.id) return

			const activeId = String(active.id)
			const overId = String(over.id)

			dispatch(updateTaskPosition({ activeId, overId }))
		},
		[dispatch],
	)

	useEffect(() => {
		setLocalStorage<TaskType[]>('taskList', taskList)
		setLocalStorage<TaskType[]>('savedTasks', savedTasks)
	}, [taskList, savedTasks])

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragEnd={handleDragEnd}
			modifiers={[restrictToVerticalAxis, restrictToParentElement]}
		>
			<SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
				<Flex
					vertical
					gap={15}
					className="!mt-10 h-96 overflow-y-auto"
					style={{ scrollbarWidth: 'none' }}
				>
					{savedTasks.length <= 0 && (
						<Flex
							vertical
							align="center"
							justify="center"
							gap={15}
							className="text-[#F1FA8C] text-sm"
						>
							<CoffeeOutlined style={{ color: '#F1FA8C', fontSize: 100 }} />
							<div>{t('noTask')}</div>
							<div>{t('hint')}</div>
						</Flex>
					)}
					{savedTasks.length > 0 && taskList.length <= 0 && (
						<Flex
							vertical
							align="center"
							justify="center"
							gap={15}
							className="text-[#F1FA8C] text-sm"
						>
							<FrownOutlined style={{ color: '#F1FA8C', fontSize: 100 }} />
							<div>{t('matchingTask')}</div>
						</Flex>
					)}

					{taskList.map((task) => (
						<TasklyItem key={task.id} {...task} />
					))}
				</Flex>
			</SortableContext>
		</DndContext>
	)
}
