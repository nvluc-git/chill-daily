import { Flex } from 'antd'

export const Logo = () => {
	return (
		<section id="logo-app">
			<Flex justify="flex-start" align="baseline" gap={20}>
				<div
					className="bg-center bg-cover w-14 h-16"
					style={{ backgroundImage: `url('/logo/duckWalk.gif')` }}
				></div>
				<div className="logoApp text-2xl">chill daily</div>
			</Flex>
		</section>
	)
}
