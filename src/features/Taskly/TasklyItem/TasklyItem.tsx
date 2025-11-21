import { TaskType } from 'models/taskly'
import { Button, Flex, message, Popover, Tag } from 'antd'
import { HolderOutlined, MoreOutlined } from '@ant-design/icons'
import { changeStatusTask, removeTask } from 'stores/sliceReducers/taskly'
import { useAppDispatch } from 'helpers/redux'
import { priorityColorMapping, statusColorMapping } from 'helpers/mapping'
import { useSortable } from '@dnd-kit/sortable'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { getPrioStatusTransMap } from 'utils/taskly'

type TaskItemProps = TaskType
export const TasklyItem = ({ id, title, priority, status }: TaskItemProps) => {
	const { t } = useTranslation('taskly')
	const dispatch = useAppDispatch()

	const prioStatusTrans = getPrioStatusTransMap({ prio: priority, status })

	const { listeners, setNodeRef, transform, transition, attributes } = useSortable({
		id,
	})

	const dragStyle = useMemo(() => {
		if (!transform) return undefined
		return {
			transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
			transition,
		}
	}, [transform, transition])

	const deleteTask = () => {
		dispatch(removeTask(id))
		message.success(t('removeSuccess'))
	}

	return (
		<div key={id} ref={setNodeRef} style={dragStyle}>
			<Flex align="center" className="w-full" justify="center" gap={10}>
				<Button
					{...listeners}
					{...attributes}
					className="!cursor-grab !p-1"
					type="text"
					variant="solid"
				>
					<HolderOutlined />
				</Button>
				<div className="flex-1">
					<span
						className="font-semibold text-[14px] text-white cursor-default text-left"
						style={{ wordBreak: 'break-word' }}
					>
						{title}
					</span>
				</div>
				<Flex gap={10} align="center">
					<Tag
						color={statusColorMapping[status]}
						className="!px-1 !m-0 !text-[11px] !text-center border-none min-w-[86px]"
					>
						{t(prioStatusTrans.status)}
					</Tag>
					<Tag
						color={priorityColorMapping[priority]}
						className="!px-1 !m-0 !text-[11px] !text-center border-none min-w-[70px]"
					>
						{t(prioStatusTrans.prio)}
					</Tag>
				</Flex>
				<Popover
					trigger="click"
					placement="right"
					color="rgba(68,71,90,0.5)"
					content={
						<Flex justify="space-between" align="center" gap={15}>
							{status === 'Pending' && (
								<button
									className="lowercase text-white hover:text-blue-600 cursor-pointer"
									onClick={() =>
										dispatch(
											changeStatusTask({
												id,
												status: 'In Progress',
											}),
										)
									}
								>
									{t('activeBtn')}
								</button>
							)}
							{status === 'In Progress' && (
								<button
									className="lowercase text-white hover:text-green-500 cursor-pointer"
									onClick={() =>
										dispatch(
											changeStatusTask({
												id,
												status: 'Completed',
											}),
										)
									}
								>
									{t('completeBtn')}
								</button>
							)}

							{(status === 'Completed' || status === 'In Progress') && (
								<button
									className="lowercase text-white hover:text-gray-400 cursor-pointer"
									onClick={() =>
										dispatch(
											changeStatusTask({
												id,
												status: 'Pending',
											}),
										)
									}
								>
									{t('cancelBtn')}
								</button>
							)}
							<button
								className="lowercase text-white hover:text-red-500 cursor-pointer"
								onClick={deleteTask}
							>
								{t('removeBtn')}
							</button>
						</Flex>
					}
				>
					<Button
						size="small"
						type="text"
						variant="solid"
						className="!border-none !shadow-none !px-1"
					>
						<MoreOutlined className="text-[20px]" />
					</Button>
				</Popover>
			</Flex>
		</div>
	)
}
