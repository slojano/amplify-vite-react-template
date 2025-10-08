/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreatePinInput = {
  id?: string | null,
  address: string,
  lat: number,
  lng: number,
  createdAt?: string | null,
};

export type ModelPinConditionInput = {
  address?: ModelStringInput | null,
  lat?: ModelFloatInput | null,
  lng?: ModelFloatInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelPinConditionInput | null > | null,
  or?: Array< ModelPinConditionInput | null > | null,
  not?: ModelPinConditionInput | null,
  updatedAt?: ModelStringInput | null,
  owner?: ModelStringInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Pin = {
  __typename: "Pin",
  id: string,
  address: string,
  lat: number,
  lng: number,
  createdAt?: string | null,
  updatedAt: string,
  owner?: string | null,
};

export type UpdatePinInput = {
  id: string,
  address?: string | null,
  lat?: number | null,
  lng?: number | null,
  createdAt?: string | null,
};

export type DeletePinInput = {
  id: string,
};

export type ModelPinFilterInput = {
  id?: ModelIDInput | null,
  address?: ModelStringInput | null,
  lat?: ModelFloatInput | null,
  lng?: ModelFloatInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelPinFilterInput | null > | null,
  or?: Array< ModelPinFilterInput | null > | null,
  not?: ModelPinFilterInput | null,
  owner?: ModelStringInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelPinConnection = {
  __typename: "ModelPinConnection",
  items:  Array<Pin | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionPinFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  address?: ModelSubscriptionStringInput | null,
  lat?: ModelSubscriptionFloatInput | null,
  lng?: ModelSubscriptionFloatInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionPinFilterInput | null > | null,
  or?: Array< ModelSubscriptionPinFilterInput | null > | null,
  owner?: ModelStringInput | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type CreatePinMutationVariables = {
  input: CreatePinInput,
  condition?: ModelPinConditionInput | null,
};

export type CreatePinMutation = {
  createPin?:  {
    __typename: "Pin",
    id: string,
    address: string,
    lat: number,
    lng: number,
    createdAt?: string | null,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdatePinMutationVariables = {
  input: UpdatePinInput,
  condition?: ModelPinConditionInput | null,
};

export type UpdatePinMutation = {
  updatePin?:  {
    __typename: "Pin",
    id: string,
    address: string,
    lat: number,
    lng: number,
    createdAt?: string | null,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeletePinMutationVariables = {
  input: DeletePinInput,
  condition?: ModelPinConditionInput | null,
};

export type DeletePinMutation = {
  deletePin?:  {
    __typename: "Pin",
    id: string,
    address: string,
    lat: number,
    lng: number,
    createdAt?: string | null,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type GetPinQueryVariables = {
  id: string,
};

export type GetPinQuery = {
  getPin?:  {
    __typename: "Pin",
    id: string,
    address: string,
    lat: number,
    lng: number,
    createdAt?: string | null,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListPinsQueryVariables = {
  filter?: ModelPinFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPinsQuery = {
  listPins?:  {
    __typename: "ModelPinConnection",
    items:  Array< {
      __typename: "Pin",
      id: string,
      address: string,
      lat: number,
      lng: number,
      createdAt?: string | null,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreatePinSubscriptionVariables = {
  filter?: ModelSubscriptionPinFilterInput | null,
};

export type OnCreatePinSubscription = {
  onCreatePin?:  {
    __typename: "Pin",
    id: string,
    address: string,
    lat: number,
    lng: number,
    createdAt?: string | null,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdatePinSubscriptionVariables = {
  filter?: ModelSubscriptionPinFilterInput | null,
};

export type OnUpdatePinSubscription = {
  onUpdatePin?:  {
    __typename: "Pin",
    id: string,
    address: string,
    lat: number,
    lng: number,
    createdAt?: string | null,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeletePinSubscriptionVariables = {
  filter?: ModelSubscriptionPinFilterInput | null,
};

export type OnDeletePinSubscription = {
  onDeletePin?:  {
    __typename: "Pin",
    id: string,
    address: string,
    lat: number,
    lng: number,
    createdAt?: string | null,
    updatedAt: string,
    owner?: string | null,
  } | null,
};
