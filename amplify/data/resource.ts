//import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/
/*
const schema = a.schema({
  Todo: a
    .model({
      content: a.string(),
      isDone: a.boolean().default(false),
    
    }).authorization(allow => [allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});



*/


/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>


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
    .authorization(allow => [allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool", // ensures user-based auth
  },
});
