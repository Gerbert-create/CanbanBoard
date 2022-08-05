import React from 'react'
import { Link } from 'react-router-dom'
import './TasksBlock.css'

// стиль для кнопки в состояние active (для всех блоков кроме для блока 'Backlog')
const ActiveBtn = {
	display: 'none'
}

export default class BacklogBlock extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			text: 'Add card', // текст кнопки
			value: '', // ведённое значение
			disabled: false, // блокировка кнопки
			active: '',	// наименование класса на "active"
			click: false, // состояние клика остальных блоков
			backlogClick: false, // состояние клика блка "Backlog"
		}

		this.HandleChange = this.HandleChange.bind(this)
		this.HandleClick = this.HandleClick.bind(this)
		this.OptionClick = this.OptionClick.bind(this)
		this.onBlur = this.onBlur.bind(this)
	}

	// при ввода какого то значение, значение передаётся автоматический в состояние, снимается блокировка кнопки
	HandleChange(e) {
		this.setState({ value: e.target.value })
		this.setState({ disabled: false })
	}


	HandleClick() {
		// события клика только для блока "Backlog"
		if (this.props.taskName === 'Backlog') {
			if (this.state.backlogClick === true) {
				// если при клике состояние клика равен true, то возвращаем изначальный текст для кнопки, убираем состояние active для кнопки и возвращаем состояние клика на false
				this.setState({ text: 'Add card', active: '', backlogClick: false })

				// создаём новый объект с новыми данными
				const newTask = {
					task: this.props.taskName,
					title: this.state.value,
					content: ''
				}
				// передаём новый объект в массив через пропс
				this.props.array.push(newTask)
				// передаём новый объект из состоянии в функцию переданной через пропс
				this.props.funcPushTask(this.props.array)
				// сохраняем наш новый полученный массив
				localStorage.setItem(`${this.props.taskName}`, JSON.stringify(this.props.array))
				// вычищаем значение из состоянии
				this.setState({ value: '' })
			} else {
				// если при клике состояние клика равен false, то перезаписываем текст кнопки на "Submit", блокируем кнопку, перезаписываем состояние клика на true
				this.setState({ text: 'Submit', disabled: true, active: 'active', backlogClick: true })
			}
		} else {
			// для всех остальных блоков просто передаём состояние клика на true
			this.setState({ click: true })
		}
	}

	// события при выборе задании через option 
	OptionClick(event) {
		// ищем элемента, которого выбрали, по его наименовании
		const searchSelectObj = this.props.prevArray.find(item => item.title === event.target.value)
		// передаём объекту название текущего блока, которому мы хотим добавлять данный элемент
		searchSelectObj.task = this.props.taskName
		// передаём данный объект в массив текущего блока
		this.props.array.push(searchSelectObj)
		// сохраняем массив тякущего блока
		localStorage.setItem(`${this.props.taskName}`, JSON.stringify(this.props.array))
		// создаём новый массив с невыбранными элементами
		const cleanArray = this.props.prevArray.filter(item => item.title !== event.target.value)
		// передаём новый массив через функцию переданной через пропс
		this.props.delete(cleanArray)
		// меняем состояние клика на false
		this.setState({ click: false })
	}

	// потерия фокуса
	onBlur() {
		// только для блока "Backlog"
		if (this.props.taskName === 'Backlog') {
			if (this.state.value === '') {
				//если не было ничего введено, то возвращаем изначальный текст для кнопки, убираем блокировку кнопки, убираем состояние active для кнопки и возвращаем состояние клика на false
				this.setState({ text: 'Add card', disabled: false, active: '', backlogClick: false })
			}
			// для остальных блоков
		} else {
			// меняем состояние клика на false
			this.setState({ click: false })
		}
	}

	render() {

		return (
			<div className='tasksBlock'>
				<div className='tasksBlock__mainBlock'>
					<h5 className='text tasksBlock__mainBlock__title'>{this.props.title}</h5>

					<div className='tasksBlock__mainBlock__contentBlock'>

						{/* отображение всех заданий */}
						{this.props.array.map((item, index) => (
							<Link style={{ color: 'inherit', textDecoration: 'inherit' }} to={`/task${item.task}/${index}`}><div key={index} className='text item tasksBlock__mainBlock__tasks'>{item.title}</div></Link>
						))}

						{this.props.taskName === 'Backlog'
							// только для блока "Backlog"
							? this.state.backlogClick === true
								// появляется только при состояние клика true
								? <textarea autoFocus onBlur={this.onBlur} className='text item tasksBlock__mainBlock__textarea' cols='258px' rows='35px' type='text' onChange={this.HandleChange}></textarea>
								: null

							// для остальных блоков
							: this.state.click === true
								// появляется только при состояние клика true
								? <select className='text item tasksBlock__mainBlock__select' onBlur={this.onBlur} onChange={this.OptionClick}>
									<option value='' selected disabled></option>
									{/* отображение элементов предыдущего блока в option */}
									{this.props.prevArray.map((item, index) => (
										<option value={item.title} key={index}>{item.title}</option>
									))}
								</select>
								: null
						}

						<button disabled={this.state.disabled} className={`text tasksBlock__mainBlock__button ${this.state.active}`} onClick={this.HandleClick} style={this.state.click === true ? ActiveBtn : null || this.state.disabled === true ? { backgroundColor: 'rgba(0, 121, 191, 0.4)' } : null}>{this.state.text} </button>
					</div>
				</div>
			</div>
		)
	}
}
