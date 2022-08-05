import React from "react"
import './userNav.css'

function UserNav (props) {

	// передаём true через функцию полученной через пропс
	const Blur = () => {
		props.blur(true)
	}

	return (
		// вылезающая окно навигации при нажатие на стрелку 
		<div tabIndex={0} onBlur={Blur} className='userNav'>	
			<svg width="134" height="68" viewBox="0 0 134 68" fill="none" xmlns="http://www.w3.org/2000/svg">
				<rect y="8" width="134" height="60" rx="5" fill="white"/>
				<rect x="89.7782" width="11" height="11" transform="rotate(45 89.7782 0)" fill="white"/>
			</svg>

			<div className="userNav__options">
				<span className="text option">Profile</span>
				<span className="text option">Log Out</span>
			</div>
		</div>
		)
}
export default UserNav