import { Loading3QuartersOutlined, PlusSquareOutlined } from '@ant-design/icons'
import { PriorityTaskType } from 'models/taskly'
import { RootState } from 'stores/index'
import { Button, Flex, Form, FormProps, Input, InputRef, message, Select, Tooltip } from 'antd'
import { useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'helpers/redux'
import { addNewTask } from 'stores/sliceReducers/taskly'
import { useTranslation } from 'react-i18next'

type FieldType = {
	titleTask: string
	priorityTask: PriorityTaskType
}

export const TasklyAdd = () => {
	const dispatch = useAppDispatch()
	const taskList = useAppSelector((stores: RootState) => stores.taskly.tasks)
	const [addNewTaskForm] = Form.useForm()
	const { t } = useTranslation('taskly')

	const [isLoading, setIsLoading] = useState<boolean>(false)
	const inputTitleTask = useRef<InputRef>(null)

	const handleAddNewTask: FormProps<FieldType>['onFinish'] = (value) => {
		const { titleTask, priorityTask } = value
		const isTaskExists = taskList.some((task) => task.title === titleTask)
		setIsLoading(true)

		setTimeout(() => {
			if (isTaskExists) {
				message.warning(t('taskExists'))
				setIsLoading(false)
				inputTitleTask.current?.focus()
				return
			}
			dispatch(addNewTask({ title: titleTask, priority: priorityTask }))
			message.success(t('addSuccess'))
			setIsLoading(false)
			addNewTaskForm.setFieldsValue({ titleTask: '' })
			inputTitleTask.current?.focus()
		}, 800)
	}

	return (
		<Form
			form={addNewTaskForm}
			name="addNewTask"
			initialValues={{ priorityTask: 'Low' }}
			layout="vertical"
			autoComplete="off"
			onFinish={handleAddNewTask}
			preserve={false}
		>
			<Flex justify="space-between" align="flex-end" gap={10}>
				<Form.Item
					name="titleTask"
					validateFirst={true}
					rules={[
						{
							required: true,
							message: <span className="text-xs">{t('cannotBeBlank')}</span>,
						},
						{ min: 8, message: <span className="text-xs">{t('tooShort')}</span> },
						{ max: 50, message: <span className="text-xs">{t('tooLong')}</span> },
						{
							pattern: /^(?!\s*$).+/,
							message: <span className="text-xs">{t('onlyBlank')}</span>,
						},
					]}
					label={<span className="text-xs font-bold  text-[#FF79C6]">{t('title')}</span>}
					className="flex-1"
				>
					<Input
						placeholder={t('placeholder')}
						ref={inputTitleTask}
						readOnly={isLoading}
						className="text-sm"
					/>
				</Form.Item>

				<Form.Item
					name="priorityTask"
					label={<span className="text-xs text-[#FF79C6] font-bold">{t('prio')}</span>}
				>
					<Select size="middle" style={{ width: 120 }} aria-readonly={isLoading}>
						<Select.Option value="Low">
							<span className="text-sm">{t('low')}</span>
						</Select.Option>
						<Select.Option value="Medium">
							<span className="text-sm ">{t('medium')}</span>
						</Select.Option>
						<Select.Option value="High">
							<span className="text-sm">{t('high')}</span>
						</Select.Option>
					</Select>
				</Form.Item>
				<Form.Item label={null}>
					<Tooltip title={t('addBtn')} placement="rightBottom" color="rgba(68,71,90,0.5)">
						<Button
							type="default"
							htmlType="submit"
							size="middle"
							aria-readonly={isLoading}
							loading={false}
							className="!px-2 !border-none !shadow-none"
						>
							{isLoading ? <Loading3QuartersOutlined spin /> : <PlusSquareOutlined />}
						</Button>
					</Tooltip>
				</Form.Item>
			</Flex>
		</Form>
	)
}
