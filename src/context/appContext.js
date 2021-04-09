import React, { Component } from "react";
const Context = React.createContext();
export class AppContext extends Component {
  state = {
    user:null,

    formsTypes: [
      {
        id: 1,
        title: "REBNY COVID Liability Form",
      },
	  {
        id: 2,
        title: "REBNY COVID Health Screening Form",
      },
	  {
        id: 3,
        title: "New York Agency Disclosure Form for Buyer and Seller",
      },
    ],
	clients:[{
		id:"1",
		name:"Mila Kunas"
	},
	{
		id:"2",
		name:"Tom Cruise"
	},
	{
		id:"3",
		name:"Jack Ryan"
	},
	{
		id:"4",
		name:"George Clooney"
	},
	{
	id:"5",
	name:"Morgan Freeman"
}]
  };

  handleUserUpdate = (user) => {

    this.setState({user})
  } 

  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          onUserUpdate :this.handleUserUpdate
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Context;
