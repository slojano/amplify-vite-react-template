

import { a, defineData, type ClientSchema } from "@aws-amplify/backend";



const schema = a.schema({
  User: a
    .model({
      id: a.id(),

      username: a.string(),

      // relationship — a User has many Pins
      pins: a.hasMany("Pin", "userId"),
    })
    .authorization(allow => [allow.owner()]),

  Pin: a
    .model({
      id: a.id(),
      title: a.string(),
      description: a.string(),
      // location 
      location: a.string().required(),
      lat: a.float(),                   
      lng: a.float(), 
      // optional upload 
      upload: a.string(),

      // foreign key
      userId: a.id().required(),

      // relationship — Pin belongs to a User
      user: a.belongsTo("User", "userId"),
    })
    .authorization(allow => [
      allow.authenticated().to(['read']),
      allow.owner().to(['create', 'update', 'delete']), // owner can CRUD
      //allow.publicApiKey().to(["read"]),
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool", // logged-in users (create/update/delete)
    
   // apiKeyAuthorizationMode: {
    //  expiresInDays: 30, // sets how long the key stays valid
    //},
    
  },
});

