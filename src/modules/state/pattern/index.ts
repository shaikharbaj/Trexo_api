export const MASTER_MS_STATES_PATTERN = {
  TCP: {
    fetchAllState: { role: 'fetchAllState', cmd: 'fetch-all-state' },
    fetchAllStateForDropdown: {
      role: 'fetchAllStateForDropdown',
      cmd: 'fetch-all-state-for-dropdown',
    },
    fetchAllDeletedState: {
      role: 'fetchAllDeletedState',
      cmd: 'fetch-all-deleted-state',
    },
    findStateById: { role: 'findStateById', cmd: 'find-state-by-id' },
    createState: { role: 'createState', cmd: 'create-state' },
    updateState: { role: 'updateState', cmd: 'update-state' },
    deleteState: { role: 'deleteState', cmd: 'delete-state' },
    restoreDeletedState: {
      role: 'restoreDeletedState',
      cmd: 'restore-deleted-state',
    },
    toggleStateVisibility: {
      role: 'toggleStateVisibility',
      cmd: 'toggle-state-visibility',
    },
  },
  KAFKA: {
    fetchAllState: 'fetchAllState',
    fetchAllStateForDropdown: 'fetchAllStateForDropdown',
    fetchAllDeletedState: 'fetchAllDeletedState',
    findStateById: 'findStateById',
    createState: 'createState',
    updateState: 'updateState',
    deleteState: 'deleteState',
    restoreDeletedState: 'restoreDeletedState',
    toggleStateVisibility: 'toggleStateVisibility',
  },
  REDIS: {},
  RABBITMQ: {},
};
