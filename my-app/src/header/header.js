import ProfileLogo from './profileLogo'
import './header.css'

function Header () {
	return (
		<header>
			<div className='headerBlock'>
	 		<h1 className='text headerBlock__title'>Awesome Kanban Board</h1>
				<ProfileLogo/>
			</div>
		</header>
	)
}

export default Header