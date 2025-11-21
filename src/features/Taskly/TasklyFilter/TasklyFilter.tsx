import {
	ClearOutlined,
	TagOutlined,
	VerticalAlignBottomOutlined,
	VerticalAlignTopOutlined,
} from '@ant-design/icons'
import { Button, Flex, Select, Tag, Tooltip } from 'antd'
import clsx from 'clsx'
import { statusColorMapping } from 'helpers/mapping'
import { useAppSelector } from 'helpers/redux'
import { StatusTaskType } from 'models/taskly'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { RootState } from 'stores'
import { filterByStatus, resetFilter, sortByPrio } from 'stores/sliceReducers/taskly'
import { setLocalStorage } from 'utils/localStorage'

export const TasklyFilter = () => {
	const dispatch = useDispatch()
	const filtered = useAppSelector((store: RootState) => store.taskly.filtered)
	const sorted = useAppSelector((store: RootState) => store.taskly.sorted)
	const isShow = useAppSelector((store: RootState) => store.taskly.isFilterBar)

	const { t } = useTranslation('taskly')

	const handleSort = (value: number) => {
		dispatch(sortByPrio(value))
	}
	const handleFilter = (value: StatusTaskType) => {
		dispatch(filterByStatus(value))
	}
	const handleResetFilter = () => {
		dispatch(resetFilter())
	}

	useEffect(() => {
		setLocalStorage<boolean>('filterBar', isShow)
	}, [isShow])
	return (
		isShow && (
			<Flex justify="flex-start" align="center" gap={5}>
				<Tag
					color={filtered === 'Pending' ? statusColorMapping['Pending'] : '#EFEFEF'}
					className={clsx(
						'!px-1  !m-0 !text-[11px] !text-center border-none cursor-pointer',
						!(filtered === 'Pending') && '!text-black',
					)}
					onClick={() => {
						handleFilter('Pending')
					}}
				>
					<TagOutlined />
					<span>{t('pending')}</span>
				</Tag>
				<Tag
					color={
						filtered === 'In Progress' ? statusColorMapping['In Progress'] : '#EFEFEF'
					}
					className={clsx(
						'!px-1  !m-0 !text-[11px] !text-center border-none cursor-pointer',
						!(filtered === 'In Progress') && '!text-black',
					)}
					onClick={() => {
						handleFilter('In Progress')
					}}
				>
					<TagOutlined />
					<span>{t('in progress')}</span>
				</Tag>
				<Tag
					color={filtered === 'Completed' ? statusColorMapping['Completed'] : '#EFEFEF'}
					className={clsx(
						'!px-1  !m-0 !text-[11px] !text-center border-none cursor-pointer',
						!(filtered === 'Completed') && '!text-black',
					)}
					onClick={() => {
						handleFilter('Completed')
					}}
				>
					<TagOutlined />
					<span>{t('completed')}</span>
				</Tag>
				<Select
					size="small"
					value={sorted}
					style={{ width: 105 }}
					className="!m-0 !p-0"
					onChange={handleSort}
					options={[
						{
							value: 1,
							label: (
								<Flex
									justify="flex-start"
									align="center"
									gap={5}
									className="!text-[#E41749] !text-[11px]"
								>
									<VerticalAlignTopOutlined />
									<span>{t('highest')}</span>
								</Flex>
							),
						},
						{
							value: 2,
							label: (
								<Flex
									justify="flex-start"
									align="center"
									gap={5}
									className="!text-[#0F6292] !text-[11px]"
								>
									<VerticalAlignBottomOutlined />
									<span>{t('lowest')}</span>
								</Flex>
							),
						},
					]}
				/>
				<Tooltip color="rgba(68,71,90,0.5)" title={t('clear')} placement="rightBottom">
					<Button
						size="small"
						onClick={handleResetFilter}
						disabled={!filtered && !sorted}
					>
						<ClearOutlined />
					</Button>
				</Tooltip>
			</Flex>
		)
	)
}
