/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreatePin = /* GraphQL */ `subscription OnCreatePin($filter: ModelSubscriptionPinFilterInput) {
  onCreatePin(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreatePinSubscriptionVariables,
  APITypes.OnCreatePinSubscription
>;
export const onUpdatePin = /* GraphQL */ `subscription OnUpdatePin($filter: ModelSubscriptionPinFilterInput) {
  onUpdatePin(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdatePinSubscriptionVariables,
  APITypes.OnUpdatePinSubscription
>;
export const onDeletePin = /* GraphQL */ `subscription OnDeletePin($filter: ModelSubscriptionPinFilterInput) {
  onDeletePin(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeletePinSubscriptionVariables,
  APITypes.OnDeletePinSubscription
>;
