/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createPin = /* GraphQL */ `mutation CreatePin(
  $input: CreatePinInput!
  $condition: ModelPinConditionInput
) {
  createPin(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreatePinMutationVariables,
  APITypes.CreatePinMutation
>;
export const updatePin = /* GraphQL */ `mutation UpdatePin(
  $input: UpdatePinInput!
  $condition: ModelPinConditionInput
) {
  updatePin(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdatePinMutationVariables,
  APITypes.UpdatePinMutation
>;
export const deletePin = /* GraphQL */ `mutation DeletePin(
  $input: DeletePinInput!
  $condition: ModelPinConditionInput
) {
  deletePin(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeletePinMutationVariables,
  APITypes.DeletePinMutation
>;
