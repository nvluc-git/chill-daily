import Logo from 'components/Logo'
import MenuBar from 'components/MenuBar'

export const Header = () => {
	return (
		<section id="header-app" className="absolute top-0 left-0 w-full">
			<div className="relative flex justify-between items-baseline mt-10 mx-20">
				<Logo />
				<MenuBar />
			</div>
		</section>
	)
}
