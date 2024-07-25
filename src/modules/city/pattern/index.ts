export const MASTER_MS_CITY_PATTERN = {
  TCP: {
    fetchAllCity: { role: 'fetchAllCity', cmd: 'fetch-all-city' },
    fetchAllCityForDropdown: {
      role: 'fetchAllCityForDropdown',
      cmd: 'fetch-all-city-for-dropdown',
    },
    fetchAllDeletedCity: {
      role: 'fetchAllDeletedCity',
      cmd: 'fetch-all-deleted-city',
    },
    findCityById: { role: 'findCityById', cmd: 'find-city-by-id' },
    createCity: { role: 'createCity', cmd: 'create-city' },
    updateCity: { role: 'updateCity', cmd: 'update-city' },
    deleteCity: { role: 'deleteCity', cmd: 'delete-city' },
    restoreDeletedCity: {
      role: 'restoreDeletedCity',
      cmd: 'restore-deleted-city',
    },
    toggleCityVisibility: {
      role: 'toggleCityVisibility',
      cmd: 'toggle-city-visibility',
    },
  },
  KAFKA: {
    fetchAllCity: 'fetchAllCity',
    fetchAllCityForDropdown: 'fetchAllCityForDropdown',
    fetchAllDeletedCity: 'fetchAllDeletedCity',
    findCityById: 'findCityById',
    createCity: 'createCity',
    updateCity: 'updateCity',
    deleteCity: 'deleteCity',
    restoreDeletedCity: 'restoreDeletedCity',
    toggleCityVisibility: 'toggleCityVisibility',
  },
  REDIS: {},
  RABBITMQ: {},
};
