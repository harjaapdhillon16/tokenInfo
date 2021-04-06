import React, { Component } from "react";
const Context = React.createContext();
export class AppContext extends Component {
  state = {
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

  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Context;
