/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getAgent = /* GraphQL */ `
  query GetAgent($id: ID!) {
    getAgent(id: $id) {
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
export const listAgents = /* GraphQL */ `
  query ListAgents(
    $filter: ModelAgentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAgents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
        brokerageName
        stateOfLicensure
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
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
      nextToken
    }
  }
`;
export const getFormEvent = /* GraphQL */ `
  query GetFormEvent($id: ID!) {
    getFormEvent(id: $id) {
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
export const listFormEvents = /* GraphQL */ `
  query ListFormEvents(
    $filter: ModelFormEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFormEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const formEventsByFormData = /* GraphQL */ `
  query FormEventsByFormData(
    $formDataId: ID
    $sortDirection: ModelSortDirection
    $filter: ModelFormEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    formEventsByFormData(
      formDataId: $formDataId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
