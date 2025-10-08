/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getPin = /* GraphQL */ `query GetPin($id: ID!) {
  getPin(id: $id) {
    id
    address
    lat
    lng
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedQuery<APITypes.GetPinQueryVariables, APITypes.GetPinQuery>;
export const listPins = /* GraphQL */ `query ListPins($filter: ModelPinFilterInput, $limit: Int, $nextToken: String) {
  listPins(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      address
      lat
      lng
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListPinsQueryVariables, APITypes.ListPinsQuery>;
