export const TAX_MASTER_MS_PATTERN: any = {
  TCP: {
    fetchAllTax: { role: 'fetchAllTax', cmd: 'fetch-all-tax' },
    fetchAllDeletedTax: {role: 'fetchAllDeletedTax', cmd: 'fetch-all-deleted-tax'},
    findTaxById: { role: 'findTaxById', cmd: 'find-tax-by-id' },
    createTax: { role: 'createTax', cmd: 'create-tax' },
    updateTax: { role: 'updateTax', cmd: 'update-tax' },
    deleteTax: { role: 'deleteTax', cmd: 'delete-tax' },
    toggleTaxVisibility: { role: 'toggleTaxVisibility', cmd: 'toggle-tax-visibility' },
    importTax: { role: 'importTax', cmd: 'import-tax' },
    restoreTax: { role: 'restoreTax', cmd: 'restore-tax' },
  },
  KAFKA: {
    fetchAllTax: 'fetchAllTax',
    fetchAllDeletedTax: 'fetchAllDeletedTax',
    findTaxById: 'findTaxById',
    createTax: 'createTax',
    updateTax: 'updateTax',
    deleteTax: 'deleteTax',
    restoreTax: 'restoreTax',
    toggleTaxVisibility: 'toggleTaxVisibility',
    importTax: 'importTax',
   
  },
  REDIS: [],
  RABBITMQ: [],
};
