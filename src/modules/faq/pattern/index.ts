export const CMS_MS_FAQ_PATTERN = {
  TCP: {
    fetchAllFaq: { role: 'fetchAllFaq', cmd: 'fetch-all-faq' },
    fetchAllDeletedFaq: {
      role: 'fetchAllDeletedFaq',
      cmd: 'fetch-all-deleted-faq',
    },
    findFaqById: { role: 'findFaqById', cmd: 'find-faq-by-id' },
    createFaq: { role: 'createFaq', cmd: 'create-faq' },
    toggleFaqVisibility: {
      role: 'toggleFaqVisibility',
      cmd: 'toggle-faq-visibility',
    },
    updateFaq: { role: 'updateFaq', cmd: 'update-faq' },
    deleteFaq: { role: 'deleteFaq', cmd: 'delete-faq' },
    restoreFaq: { role: 'restoreFaq', cmd: 'restore-faq' },
  },
  KAFKA: {
    fetchAllFaq: 'fetchAllFaq',
    fetchAllDeletedFaq: 'fetchAllDeletedFaq',
    findFaqById: 'findFaqById',
    createFaq: 'createFaq',
    toggleFaqVisibility: 'toggleFaqVisibility',
    updateFaq: 'updateFaq',
    deleteFaq: 'deleteFaq',
    restoreFaq: 'restoreFaq',
  },
  REDIS: {},
  RABBITMQ: {},
};
