import React, { Component } from "react";
const Context = React.createContext();
export class AppContext extends Component {
  state = {
    user: null,
    agent: null,
    formsTypes: [
      {
        id: 1,
        title: "REBNY COVID Liability Form",
        data: [
          {
            name: "",
            date: "",
            name_of_real_estate: "",
            real_estate_brockerage_company: "",
          },
        ],
      },
      {
        id: 2,
        title: "New York State Housing and Anti-Discrimination Disclosure",
        data: [
          {
            name_of_broker: "",
            name_of_real_estate_company: "",
            account_type: "",
            real_estate_brockerage_company: "",
            firstdate: "",
            lastdate: "",

          },
        ],
      },
      {
        id: 3,
        title: "REBNY COVID Health Screening Form",
        data: [
          {
            name: "",
            date: "",
            property_address: "",
            real_estate_name: "",
            name_of_brockerage_company: "",
          },
        ],
      },
      {
        id: 4,
        title: "New York State Disclosure Form for Buyer and Seller",
        data: [
          {
            name: "",
            real_estate_name: "",
            name_of_brokerage: "",
            mainOption: "",
            option: "",
            buyerDate: "",
            sellerCurrentDate: "",
            represent_Buyer: "",
            represent_Seller: "",
            signatureAs: ""
          },
        ],
      },
      {
        id: 5,
        title: "New York State Disclosure Form for Landlord and Tenant ",
        data: [
          {
            name: "",
            real_estate_name: "",
            name_of_brokerage: "",
            mainOption2: "",
            option2: "",
            landLordDate: "",
            sellerCurrentDate: "",
            represent_Landlord: "",
            represent_Seller: "",
            signatureAs: ""
          },
        ],
      },

    ],
    formItems: [],
    contacts: [],
  };

  handleUserUpdate = (user) => {
    this.setState({ user });
  };
  handleContactUpdates = (contacts) => {
    this.setState({ contacts });
  };
  handleContactDelete = (id) => {
    this.setState({
      contacts: this.state.contacts.filter((item) => item.id !== id && item),
    });
  };
  handleUpdate = (data) => {
    // this.setState({ data });

    this.setState({
      contacts: data,
    });
  };
  handleFormsUpdate = (formItems) => {
    this.setState({ formItems });
  };
  handleFormsDelete = (id) => {
    this.setState({
      formItems: this.state.formItems.filter((item) => item.id !== id && item),
    });
  };

  handleFormsItemUpdate = (formItems) => {
    this.setState({ formItems });
  };
  handleAgentUpdate = (agent) => this.setState({ agent });

  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          setUser: this.handleUserUpdate,
          onUpdateContacts: this.handleContactUpdates,
          onDeleteContact: this.handleContactDelete,
          onDeleteForm: this.handleFormsDelete,
          onEditContact: this.handleUpdate,
          onFormItemsUpdate: this.handleFormsUpdate,
          onFormItemUnitUpdate: this.handleFormsItemUpdate,
          setAgent: this.handleAgentUpdate,
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Context;
