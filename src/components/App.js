import React, {Component} from 'react'
import { connect } from 'react-redux'
import { listRepos } from '../store/store.js'
import Selector from './Selector'

class App extends Component {
	constructor(props){
		super(props)

		this.state={
			repo:'alittlebyte',
			progLang:'',
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
		this.setState({repo:''})
	}

	render (){
		console.log(this.state)
		let languages = ['none','JavaScript','Python','C++','C#','Java','PHP','Clojure','Ruby','Erlang','Scala','Haskell','Swift']
		return (
			<div>
				<form className='search-bar' onSubmit={this.handleRepos}>
					<input placeholder="Поиск по имени репозитория" id="repo" type="text" onChange={this.dataToState}/>
					<input type="submit" value="Найти это!"/>
				</form>
				<Selector id={"progLang"} onChange={this.dataToState}>
					{languages.map(language => {
						return(
							<Selector.Option lang={language}/> 
						)
					})}
				</Selector>
				<div>
					<h4>Список доступных репозиториев:</h4>
					<table>
						<tbody>
							{!this.props.repos.items
								?<tr><td>Список загружается...</td></tr>
								:this.props.repos['total_count'] === 0
									?<tr><td>По заданным параметрам ничего не найдено!</td></tr>
									:this.props.repos.items.map(repo => {
										return(
											<tr key={repo.id}>
												<td>{repo.name}</td>
												<td>{repo.description}</td>
												<td>{repo.language}</td>
												<td>{repo.stargazers_count}</td>
											</tr>
										)
									})		
							}	
						</tbody>
					</table>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	repos: state.repos
})

export default connect(mapStateToProps,{listRepos})(App)