/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createContact = /* GraphQL */ `
  mutation CreateContact(
    $input: CreateContactInput!
    $condition: ModelContactConditionInput
  ) {
    createContact(input: $input, condition: $condition) {
      id
      agentId
      name
      email
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
      email
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
      email
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
      formName
      data
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
      formName
      data
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
      formName
      data
      createdAt
      updatedAt
    }
  }
`;
