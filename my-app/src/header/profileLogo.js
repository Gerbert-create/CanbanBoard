import UserNav from './userNav'
import {useState} from 'react'
import './profileLogo.css'

function ProfileLogo() {

	const [click, setClick] = useState(false) // состояние клика на стрелку пользователя

	// при клике передаём противоположное состояние
	const HandleClick = () => {
		setClick(!click)
	}

	// функция, которая получает значение при потерия фокуса от UserNav
	const NavBlur = (value) => {
		if (value === true) {
			setClick(false)
		}
	}

	return (
		<div className='profileLogo'>
			<div className='profileLogo__userFoto'>
				<img src='../img/userFoto.png' alt='User Foto' width='26.2px' height='33.45px' />
			</div>

			{/* стрелка навигации полтзователя */}
			<div onClick={HandleClick} className='profileLogo__pointer'>
				<svg style={click === true ? {transform: 'rotate(180deg'} : null} width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M1.415 7.79001L6 3.20501L10.585 7.79001L12 6.37501L6 0.375008L0 6.37501L1.415 7.79001Z" fill="white"/>
				</svg>
			</div>

			{/* навигация, которая рендерится при клике со значением true */}
			{click === true 
				? <UserNav blur={NavBlur}/>
				: null
			}	
			
		</div>
	)
}

export default ProfileLogo

