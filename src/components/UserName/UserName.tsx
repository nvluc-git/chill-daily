import { useAppSelector } from 'helpers/redux'
import { RootState } from 'stores'

export const UserName = () => {
	const user = useAppSelector((store: RootState) => store.general.user)
	return (
		<section id="user-name" className="glowingText uppercase font-bold text-xl">
			{user}
		</section>
	)
}
