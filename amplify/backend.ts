import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';

import { storage } from './storage/resource'; //cant find when i deploy

defineBackend({
  auth,
  data,

  storage
});
