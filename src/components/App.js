import React, {Component} from 'react'
import { connect } from 'react-redux'
import { listRepos } from '../store/store.js'
import Selector from './Selector'
import '../styles/App.css'

class App extends Component {
	constructor(props){
		super(props)

		this.state={
			repo:'octocat',
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
	}

	render (){
		let languages = ['Любой','Shell','HTML','CSS','JavaScript','Python','C','C++','C#','Java','PHP','Clojure','Ruby','Erlang','Scala','Haskell','Swift']
		let stars = [0,10,25,50,100,200,500,1000,2500,5000,10000]
		return (
			<main>
				<nav>
					<form onSubmit={this.handleRepos}>
						<label>Поиск<input placeholder="Поиск по имени/репозиторию" id="repo" type="text" onChange={this.dataToState}/></label>	
						<Selector id={"progLang"} name={"Язык"} onChange={this.dataToState}>
							{languages.map(language => {
								return(
									<Selector.Option key={languages.indexOf(language)} lang={language}/> 
								)
							})}
						</Selector>
						<Selector id={"stars"} name="Кол-во звёзд" onChange={this.dataToState}>
							{stars.map(star => {
								return(
									<Selector.Option key={stars.indexOf(star)} lang={star}/> 
								)
							})}
						</Selector>
						<input type="submit" value="Найти!"/>
					</form>
				</nav>
				<table>
					<tbody>
						{!this.props.repos.items
							?<tr><td>Список загружается...</td></tr>
							:this.props.repos['total_count'] === 0
								?<tr><td>По заданным параметрам ничего не найдено!</td></tr>
								:this.props.repos.items.map(repo => {
									return(
										<tr key={repo.id}>
											<td>{repo.description}</td>
											<td>{repo.name}</td>
											<td>[{repo.language?repo.language:'Любой'}]</td>
											<td><span>★</span>{repo.stargazers_count}</td>
										</tr>
									)
								})		
						}	
					</tbody>
				</table>
			</main>
		)
	}
}

const mapStateToProps = state => ({
	repos: state.repos
})

export default connect(mapStateToProps,{listRepos})(App)