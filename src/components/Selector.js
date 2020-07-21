import React, { Component } from 'react';

export default class Selector extends Component{
	render(){
		return(
			<select className="selector" onChange={this.props.onChange}>
				{this.props.children}
			</select>
		)
	}
}

Selector.Option = class Option extends Component{
	render(){
		return(
			<option value={this.props.value}>{this.props.text}</option>
		)
	}
}