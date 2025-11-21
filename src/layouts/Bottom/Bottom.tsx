import BgMusic from 'components/BgMusic'
import UserName from 'components/UserName'

export const Bottom = () => {
	return (
		<section id="bottom-app" className="absolute bottom-0 left-0 w-full">
			<div className="relative flex justify-between items-center mb-10 mx-20">
				<UserName />
				<BgMusic />
			</div>
		</section>
	)
}
