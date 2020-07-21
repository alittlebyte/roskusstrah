import React, { Component } from 'react';

export default class Selector extends Component{
	render(){
		return(
			<select className="selector" id={this.props.id} onChange={this.props.onChange}>
				{this.props.children}
			</select>
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