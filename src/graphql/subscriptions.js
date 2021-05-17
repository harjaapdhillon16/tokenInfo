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