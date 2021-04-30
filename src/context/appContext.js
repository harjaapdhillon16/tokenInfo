import React, { Component } from "react";
const Context = React.createContext();
export class AppContext extends Component {
  state = {
    user: null,

    formsTypes: [
      {
        id: 1,
        title: "REBNY COVID Liability Form",
        data:[
          {
            name:'',
            date:'',
            name_of_real_estate:'',
            real_estate_brockerage_company:''
          }
        ]
      },
      {
        id: 2,
        title: "New York Agency Disclosure Form for Buyer and Seller",
        data:[
          {
            name_of_broker:'',
            name_of_real_estate_company:'',
            account_type:'',
            real_estate_brockerage_company:'',
            firstdate:'',
            lastdate:''
          }
        ]
      },
      {
        id: 3,
        title: "REBNY COVID Health Screening Form",
        data:[
          {
            name:'',
            date:'',
            property_address:'',
            real_estate_name:'',
            name_of_brockerage_company:''
          }
        ]
      },
    ],
    contacts: [],
  };

  handleUserUpdate = (user) => {
    this.setState({ user });
  };
  handleContactUpdates = (contacts) => {
    this.setState({ contacts });
  };
  handleContactDelete = (id) => {
    
      this.setState({ contacts: this.state.contacts.filter( (item) =>  item.id !== id  && item  ) });
  };
  handleUpdate= (data) => {
    this.setState({data});

  }
  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          onUserUpdate: this.handleUserUpdate,
          onUpdateContacts: this.handleContactUpdates,
          onDeleteContact: this.handleContactDelete,
          onEditContact: this.handleUpdate,
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Context;
