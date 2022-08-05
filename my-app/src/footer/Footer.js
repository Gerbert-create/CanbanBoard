import './footer.css'

function Footer (props) {

	// получение длины массива "Backlog" и "Finished", для определения количества назначенных и законченных задач
	const activeTasks = props.activeTasks.length
	const finishedTasks = props.finishedTasks.length

	return (
		<footer>
			<div className='footerBlock'>
				<div className='footerBlock__infoTasks'>
					{/* количество назначенных задач */}
					<span className="text indicators footerBlock__infoTasks__activeTasks">{`Active tasks: ${activeTasks}`}</span>
					{/* количество законченных задач */}
					<span className="text indicators footerBlock__infoTasks__finishedTasks">{`Finished tasks: ${finishedTasks}`}</span>
				</div>
				<span className="text footerBlock__author">Kanban board by Gerbert Bulgakov, 2022</span>
			</div>
		</footer>
	)
}

export default Footer