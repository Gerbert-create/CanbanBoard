import Header from './header/header'
import './index.css'
import TasksBlock from './main/MoveTasksBlock'
import BacklogBlock from './main/TasksBlocks'
import '../src/main/main.css'
import './media.css'
import React from 'react'
import Footer from './footer/Footer'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

export default class App extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			backlogArray: [], // Массив заданий из блока "Backlog"
			readyArray: [], // Массив заданий из блока "Ready"
			inProgressArray: [], // Массив заданий из блока "in Progress"
			finishedArray: [] // Массив заданий из блока "Finished"
		}

		this.arrBacklogDelete = this.arrBacklogDelete.bind(this)
		this.arrReadyDelete = this.arrReadyDelete.bind(this)
		this.arrInProgressDelete = this.arrInProgressDelete.bind(this)
		this.pushNewTask = this.pushNewTask.bind(this)
		this.pushContent = this.pushContent.bind(this)
	}

	UNSAFE_componentWillMount() {
		// Передача данных из local storage в state при первоначальном рендеринге
		const savedBacklogValue = JSON.parse(localStorage.getItem('Backlog'))
		const savedReadyValue = JSON.parse(localStorage.getItem('Ready'))
		const savedInProgressValue = JSON.parse(localStorage.getItem('InProgress'))
		const savedFinishedValue = JSON.parse(localStorage.getItem('Finished'))

		if (savedBacklogValue !== null) {
			this.setState({ backlogArray: savedBacklogValue })
		}
		if (savedReadyValue !== null) {
			this.setState({ readyArray: savedReadyValue })
		}
		if (savedInProgressValue !== null) {
			this.setState({ inProgressArray: savedInProgressValue })
		}
		if (savedFinishedValue !== null) {
			this.setState({ finishedArray: savedFinishedValue })
		}
	}


	// Передача изменённых массивов, где произошло удаление элемента, в state. 
	// Массивы переданы от дочерних компонентов через функцию
	arrBacklogDelete(arr) {
		this.setState({ backlogArray: arr })
		localStorage.setItem('Backlog', JSON.stringify(arr))
	}

	arrReadyDelete(arr) {
		this.setState({ readyArray: arr })
		localStorage.setItem('Ready', JSON.stringify(arr))
	}

	arrInProgressDelete(arr) {
		this.setState({ inProgressArray: arr })
		localStorage.setItem('InProgress', JSON.stringify(arr))
	}

	// Передача массива с добавленым новым элементом в state 
	pushNewTask(arr) {
		this.setState({ backlogArray: arr })
	}

	// Передача массива с изменённым контентом в state 
	pushContent(arr) {
		this.setState({ backlogArray: arr })
	}

	render() {
		return (
			<BrowserRouter>
				<Header />
				<main>
					<Routes>
						<Route path='/' element={
							// Блоки с заданиями
							<div className='mainContent'>
								{/* Передаётся через прорс: 
								title - название блока, 
								taskName - название блока для ссылки (без пробелов), 
								delete - массив предыдущего блока (для того чтобы могли удалить из предыдущего блока эленмент, который был выбран через option), 
								array - массив данного блока (для того чтобы добавлять элемент, который был выбран через option ) 
								prevArray - массив предыдущего блока
								*/}
								<BacklogBlock title='Backlog' taskName='Backlog' array={this.state.backlogArray} funcPushTask={this.pushNewTask} />
								<BacklogBlock title='Ready' taskName='Ready' delete={this.arrBacklogDelete} array={this.state.readyArray} prevArray={this.state.backlogArray} />
								<BacklogBlock title='In Progress' taskName='InProgress' delete={this.arrReadyDelete} array={this.state.inProgressArray} prevArray={this.state.readyArray} />
								<BacklogBlock title='Finished' taskName='Finished' delete={this.arrInProgressDelete} array={this.state.finishedArray} prevArray={this.state.inProgressArray} />
							</div>
						} />


						{/* Путь к расширенному окну для каждого задания в каждом блоке */}

						{this.state.backlogArray.map((item, index) => {
							// Передаётся через прорс: 
							// title - название задания, 
							// content - контент,
							// taskName - название Блока задании,
							// ind - индекс выбранного задания и массив блока Backlog (это для того чтобы изменить контент выбранного элемента)
							// funcPush - функцию pushContent
							// arr - массив блока "Backlog"
							return (
								<Route path={`/task${item.task}/${index}`} element={<TasksBlock taskName="Backlog" ind={index} title={item.title} content={item.content} arr={this.state.backlogArray} funcPush={this.pushContent} />} />
							)
						})}

						{/* Передаётся через прорс: 
						taskName - название задания
						content - контент
						taskName - название блока задании  
						*/}
						{this.state.readyArray.map((item, index) => {
							return (
								<Route path={`/task${item.task}/${index}`} element={<TasksBlock taskName="Ready" title={item.title} content={item.content} />} />
							)
						})}

						{this.state.inProgressArray.map((item, index) => {
							return (
								<Route path={`/task${item.task}/${index}`} element={<TasksBlock taskName="InProgress" title={item.title} content={item.content} />} />
							)
						})}

						{this.state.finishedArray.map((item, index) => {
							return (
								<Route path={`/task${item.task}/${index}`} element={<TasksBlock taskName="Finished" title={item.title} content={item.content} />} />
							)
						})}

					</Routes>
				</main>

				{/* Передаётся через пропс: 
				activeTasks - массив блока "Backlog" 
				finishedTasks - массив блока "Finished" 
				*/}
				<Footer activeTasks={this.state.backlogArray} finishedTasks={this.state.finishedArray} />
			</BrowserRouter>
		);
	}
}
