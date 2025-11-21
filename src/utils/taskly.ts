import translation from 'assets/langs/en/taskly.json'

const validTransTypes = [
	'low',
	'medium',
	'high',
	'highest',
	'lowest',
	'pending',
	'in progress',
	'completed',
] as const

type TransType = keyof typeof translation
type TransMapping = (typeof validTransTypes)[number]
type Target = {
	prio: string
	status: string
}

export const getPrioStatusTransMap = (target: Target) => {
	const { prio, status } = target
	const prioTrans: TransType = validTransTypes.includes(prio.toLocaleLowerCase() as TransMapping)
		? (prio.toLocaleLowerCase() as TransMapping)
		: 'loading'

	const statusTrans: TransType = validTransTypes.includes(
		status.toLocaleLowerCase() as TransMapping,
	)
		? (status.toLocaleLowerCase() as TransMapping)
		: 'loading'

	return {
		prio: prioTrans,
		status: statusTrans,
	}
}
