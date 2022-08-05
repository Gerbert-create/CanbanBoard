import './MoveTasksBlock.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'

function TasksBlock(props) {

	// ведённый конент выбранного элемента
	const [content, setContent] = useState('')

	// массив "Backlog" получены через пропс
	const [backlogArray] = useState(props.arr)

	// индекс получены через пропс
	const i = props.ind

	// передача в state состояние контента при изменения в textarea
	function HandleChange(event) {
		setContent(event.target.value)
	}

	function HandleClick() {
		// сохранение и передача массива в App через полученной функции в пропсах, если состояния контента не равна пустой стракой
		if (content !== '') {
			// изменение контента выбранного элемента
			backlogArray[i].content = content
			localStorage.setItem('Backlog', JSON.stringify(backlogArray))
			props.funcPush(backlogArray)
		}
	}

	return (
		<div className='move-tasksBlock'>
			{/* название задачи */}
			<h2 className='text move-tasksBlock__title'>{props.title}</h2>

			{/* крест */}
			<div onClick={props.taskName === 'Backlog' ? HandleClick : null} className='move-tasksBlock__cross'>
				<Link to='/'>
					<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<line x1="1.35355" y1="0.646447" x2="24.3536" y2="23.6464" stroke="black" />
						<line y1="-0.5" x2="32.5269" y2="-0.5" transform="matrix(-0.707107 0.707107 0.707107 0.707107 24 1)" stroke="black" />
					</svg>
				</Link>
			</div>

			{/* поля ввода для контента */}
			<textarea onChange={props.taskName === 'Backlog' ? HandleChange : null} className='text move-tasksBlock__textarea' placeholder={props.content === '' ? 'This task has no description' : null} defaultValue={props.taskName === 'Backlog' ? content === '' ? null : props.content : null} disabled={props.taskName !== 'Backlog' ? true : false} style={props.taskName !== 'Backlog' ? { caretColor: 'transparent' } : null}>{props.content}</textarea>
		</div>
	)
}

export default TasksBlock