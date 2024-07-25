export const MASTER_MS_CONTACT_US_PATTERN = {
  TCP: {
    fetchAllContactUs: {
      role: 'fetchAllContactUs',
      cmd: 'fetch-all-contact-us'
    },
    findContactUsById: {
      role: 'findContactUsById',
      cmd: 'find-contact-us-by-id'
    },
    createContactUs: {
      role: 'createContactUs',
      cmd: 'create-contact-us'
    },
    deleteContactUs: {
      role: 'deleteContactUs',
      cmd: 'delete-contact-us'
    },
  },
  KAFKA: {
    fetchAllContactUs: 'fetchAllContactUs',
    findContactUsById: 'findContactUsById',
    createContactUs: 'createContactUs',
    deleteContactUs: 'deleteContactUs',
  },
  REDIS: [],
  RABBITMQ: [],
};
