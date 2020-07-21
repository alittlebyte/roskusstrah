import React, {Component} from 'react'
import { connect } from 'react-redux'
import { listRepos } from '../store/store.js'
import Selector from './Selector'

class App extends Component {
	constructor(props){
		super(props)

		this.state={
			name:'alittlebyte',
			progLang:'',
			spokenLang:'',
			stars:''
		}
	}

	dataToState = e => {
		if(e.target.id in this.state)
			this.setState({ [e.target.id]: e.target.value })
	}

	handleRepos = e => {
		e.preventDefault()
		this.props.listRepos(this.state)
	}

	componentDidMount(){
		this.props.listRepos(this.state)
	}

	render (){
		console.log(this.props)
		return (
			<div>
				<form className='search-bar' onSubmit={this.handleRepos}>
					<input placeholder="Поиск по имени пользователя" id="repo" type='text' onChange={this.dataToState}/>
					<input type="submit" value="Что-нибудь" />
				</form>
				<div>
					<h4>Список доступных репозиториев:</h4>
					<ul>
						{(this.props.errMessage)
							?(this.props.errMessage.status === 404)
								?<li>Такого пользователя не существует!</li>
								:<li>Ошибка {this.props.errMessage.status}: {this.props.errMessage.statusText}</li>
							:this.props.repos.map(repo => {
								return(
									<li key={repo.id}>
										<div>{repo.name}</div>
										<div>{repo.description}</div>
										<div>{repo.language}</div>
									</li>
								)
							})
						}
					</ul>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	repos: state.repos,
	errMessage: state.errMessage
})

export default connect(mapStateToProps,{listRepos})(App)