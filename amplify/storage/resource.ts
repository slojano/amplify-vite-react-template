import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'pinImgs',
  access: (allow) => ({
    'pin-images/{entity_id}/*': [
    allow.entity('identity').to(['read', 'write', 'delete']), // owner
    allow.guest.to(['read']),                      // everyone else can view
    ]

  })
});