/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateAgent = /* GraphQL */ `
  subscription OnCreateAgent {
    onCreateAgent {
      id
      name
      email
      brokerageName
      stateOfLicensure
      teamID
      brokerageId
      leadingTeamId
      leadingBrokerageId
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateAgent = /* GraphQL */ `
  subscription OnUpdateAgent {
    onUpdateAgent {
      id
      name
      email
      brokerageName
      stateOfLicensure
      teamID
      brokerageId
      leadingTeamId
      leadingBrokerageId
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteAgent = /* GraphQL */ `
  subscription OnDeleteAgent {
    onDeleteAgent {
      id
      name
      email
      brokerageName
      stateOfLicensure
      teamID
      brokerageId
      leadingTeamId
      leadingBrokerageId
      createdAt
      updatedAt
    }
  }
`;
export const onCreateContact = /* GraphQL */ `
  subscription OnCreateContact {
    onCreateContact {
      id
      agentId
      name
      title
      email
      phoneNum
      companyName
      roleInCompany
      type
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateContact = /* GraphQL */ `
  subscription OnUpdateContact {
    onUpdateContact {
      id
      agentId
      name
      title
      email
      phoneNum
      companyName
      roleInCompany
      type
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteContact = /* GraphQL */ `
  subscription OnDeleteContact {
    onDeleteContact {
      id
      agentId
      name
      title
      email
      phoneNum
      companyName
      roleInCompany
      type
      createdAt
      updatedAt
    }
  }
`;
export const onCreateFormData = /* GraphQL */ `
  subscription OnCreateFormData {
    onCreateFormData {
      id
      senderId
      receiverId
      receiverName
      receiverEmail
      formName
      data
      numberOfSignees
      status
      emailStatus
      emailTimestamp
      signature
      signatureFont
      isSignatureTyped
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateFormData = /* GraphQL */ `
  subscription OnUpdateFormData {
    onUpdateFormData {
      id
      senderId
      receiverId
      receiverName
      receiverEmail
      formName
      data
      numberOfSignees
      status
      emailStatus
      emailTimestamp
      signature
      signatureFont
      isSignatureTyped
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteFormData = /* GraphQL */ `
  subscription OnDeleteFormData {
    onDeleteFormData {
      id
      senderId
      receiverId
      receiverName
      receiverEmail
      formName
      data
      numberOfSignees
      status
      emailStatus
      emailTimestamp
      signature
      signatureFont
      isSignatureTyped
      createdAt
      updatedAt
    }
  }
`;
export const onCreateFormEvent = /* GraphQL */ `
  subscription OnCreateFormEvent {
    onCreateFormEvent {
      id
      formDataId
      type
      subjects {
        name
        email
      }
      ip
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateFormEvent = /* GraphQL */ `
  subscription OnUpdateFormEvent {
    onUpdateFormEvent {
      id
      formDataId
      type
      subjects {
        name
        email
      }
      ip
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteFormEvent = /* GraphQL */ `
  subscription OnDeleteFormEvent {
    onDeleteFormEvent {
      id
      formDataId
      type
      subjects {
        name
        email
      }
      ip
      createdAt
      updatedAt
    }
  }
`;
export const onCreateTeam = /* GraphQL */ `
  subscription OnCreateTeam {
    onCreateTeam {
      id
      name
      isBrokerage
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTeam = /* GraphQL */ `
  subscription OnUpdateTeam {
    onUpdateTeam {
      id
      name
      isBrokerage
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTeam = /* GraphQL */ `
  subscription OnDeleteTeam {
    onDeleteTeam {
      id
      name
      isBrokerage
      createdAt
      updatedAt
    }
  }
`;
