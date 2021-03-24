import React, { Component } from 'react';
const Context = React.createContext();
export class AppContext extends Component {
	state = {

	};

	render() {
		return (
			<Context.Provider
				value={{
					...this.state,
            	}}>
				{this.props.children}
			</Context.Provider>
		);
	}
}

export default Context;
