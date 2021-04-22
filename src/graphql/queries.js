/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getContact = /* GraphQL */ `
  query GetContact($id: ID!) {
    getContact(id: $id) {
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
export const listContacts = /* GraphQL */ `
  query ListContacts(
    $filter: ModelContactFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listContacts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getFormData = /* GraphQL */ `
  query GetFormData($id: ID!) {
    getFormData(id: $id) {
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
export const listFormDatas = /* GraphQL */ `
  query ListFormDatas(
    $filter: ModelFormDataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFormDatas(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        senderId
        receiverId
        formName
        data
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const contactByAgent = /* GraphQL */ `
  query ContactByAgent(
    $agentId: ID
    $sortDirection: ModelSortDirection
    $filter: ModelContactFilterInput
    $limit: Int
    $nextToken: String
  ) {
    contactByAgent(
      agentId: $agentId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const formsByAgent = /* GraphQL */ `
  query FormsByAgent(
    $senderId: ID
    $sortDirection: ModelSortDirection
    $filter: ModelFormDataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    formsByAgent(
      senderId: $senderId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        senderId
        receiverId
        formName
        data
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
