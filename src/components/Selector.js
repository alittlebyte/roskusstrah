import React, { Component } from 'react'

export default class Selector extends Component{
	render(){
		return(
			<label>{this.props.name}<select id={this.props.id} onChange={this.props.onChange}>
				{this.props.children}
			</select></label>
		)
	}
}

Selector.Option = class Option extends Component{
	render(){
		return(
			<option value={this.props.lang}>{this.props.lang}</option>
		)
	}
}