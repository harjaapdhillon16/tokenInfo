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
	  {
        id: 4,
        title: "New York State Disclosure Form for Landlord and Tenant",
      },
	  {
        id: 5,
        title: "New York State Housing Discrimination Disclosure Form",
      },
    ],
	contacts:[]
  };

  handleUserUpdate = (user) => {

    this.setState({user})
  } 
  handleContactUpdates = (contacts) =>{
    this.setState({contacts})
  }

  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          onUserUpdate :this.handleUserUpdate,
          onUpdateContacts:this.handleContactUpdates
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Context;
