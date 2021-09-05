/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createAgent = /* GraphQL */ `
  mutation CreateAgent(
    $input: CreateAgentInput!
    $condition: ModelAgentConditionInput
  ) {
    createAgent(input: $input, condition: $condition) {
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
export const updateAgent = /* GraphQL */ `
  mutation UpdateAgent(
    $input: UpdateAgentInput!
    $condition: ModelAgentConditionInput
  ) {
    updateAgent(input: $input, condition: $condition) {
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
export const deleteAgent = /* GraphQL */ `
  mutation DeleteAgent(
    $input: DeleteAgentInput!
    $condition: ModelAgentConditionInput
  ) {
    deleteAgent(input: $input, condition: $condition) {
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
export const createContact = /* GraphQL */ `
  mutation CreateContact(
    $input: CreateContactInput!
    $condition: ModelContactConditionInput
  ) {
    createContact(input: $input, condition: $condition) {
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
export const updateContact = /* GraphQL */ `
  mutation UpdateContact(
    $input: UpdateContactInput!
    $condition: ModelContactConditionInput
  ) {
    updateContact(input: $input, condition: $condition) {
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
export const deleteContact = /* GraphQL */ `
  mutation DeleteContact(
    $input: DeleteContactInput!
    $condition: ModelContactConditionInput
  ) {
    deleteContact(input: $input, condition: $condition) {
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
export const createFormData = /* GraphQL */ `
  mutation CreateFormData(
    $input: CreateFormDataInput!
    $condition: ModelFormDataConditionInput
  ) {
    createFormData(input: $input, condition: $condition) {
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
export const updateFormData = /* GraphQL */ `
  mutation UpdateFormData(
    $input: UpdateFormDataInput!
    $condition: ModelFormDataConditionInput
  ) {
    updateFormData(input: $input, condition: $condition) {
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
export const deleteFormData = /* GraphQL */ `
  mutation DeleteFormData(
    $input: DeleteFormDataInput!
    $condition: ModelFormDataConditionInput
  ) {
    deleteFormData(input: $input, condition: $condition) {
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
export const createFormEvent = /* GraphQL */ `
  mutation CreateFormEvent(
    $input: CreateFormEventInput!
    $condition: ModelFormEventConditionInput
  ) {
    createFormEvent(input: $input, condition: $condition) {
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
export const updateFormEvent = /* GraphQL */ `
  mutation UpdateFormEvent(
    $input: UpdateFormEventInput!
    $condition: ModelFormEventConditionInput
  ) {
    updateFormEvent(input: $input, condition: $condition) {
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
export const deleteFormEvent = /* GraphQL */ `
  mutation DeleteFormEvent(
    $input: DeleteFormEventInput!
    $condition: ModelFormEventConditionInput
  ) {
    deleteFormEvent(input: $input, condition: $condition) {
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
export const createTeam = /* GraphQL */ `
  mutation CreateTeam(
    $input: CreateTeamInput!
    $condition: ModelTeamConditionInput
  ) {
    createTeam(input: $input, condition: $condition) {
      id
      name
      isBrokerage
      createdAt
      updatedAt
    }
  }
`;
export const updateTeam = /* GraphQL */ `
  mutation UpdateTeam(
    $input: UpdateTeamInput!
    $condition: ModelTeamConditionInput
  ) {
    updateTeam(input: $input, condition: $condition) {
      id
      name
      isBrokerage
      createdAt
      updatedAt
    }
  }
`;
export const deleteTeam = /* GraphQL */ `
  mutation DeleteTeam(
    $input: DeleteTeamInput!
    $condition: ModelTeamConditionInput
  ) {
    deleteTeam(input: $input, condition: $condition) {
      id
      name
      isBrokerage
      createdAt
      updatedAt
    }
  }
`;
