import React, {Component} from 'react'
import { connect } from 'react-redux'
import { listRepos } from '../store/store.js'

class App extends Component {
  handleRepos = e => {
    e.preventDefault()
    this.props.listRepos(document.querySelector('#repo').value)
  }

  componentDidMount(){
    this.props.listRepos()
  }

  render () {
    console.log(this.props)
    return (
      <div>
        <form className='search-bar' onSubmit={this.handleRepos}>
          <input placeholder="Enter a Github User's name" id="repo" type='text' />
          <input type="submit" value="QS!" />
        </form>
        <div className='repo-list'>
          <h4>List of available repositories:</h4>
          <p>(click on any repo to visit on GitHub)</p>
          <ul>
            <li>Qs</li>
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  repos: state.repos
})

export default connect(mapStateToProps,{listRepos})(App)