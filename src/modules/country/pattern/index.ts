export const MASTER_MS_COUNTRY_PATTERN = {
  TCP: {
    fetchAllCountry: { role: "fetchAllCountry", cmd: "fetch-all-country" },
    fetchAllCountryForDropdown: {
      role: "fetchAllCountryForDropdown",
      cmd: "fetch-all-country-for-dropdown",
    },
    fetchAllDeletedCountry: {
      role: "fetchAllDeletedCountry",
      cmd: "fetch-all-deleted-country",
    },
    findCountryById: { role: "findCountryById", cmd: "find-country-by-id" },
    createCountry: { role: "createCountry", cmd: "create-country" },
    updateCountry: { role: "updateCountry", cmd: "update-country" },
    deleteCountry: { role: "deleteCountry", cmd: "delete-country" },
    restoreCountry: { role: "restoreCountry", cmd: "restore-country" },
    toggleCountryVisibility: {
      role: "toggleCountryVisibility",
      cmd: "toggle-country-visibility",
    },
  },
  KAFKA: {
    fetchAllCountry: "fetchAllCountry",
    fetchAllCountryForDropdown: "fetchAllCountryForDropdown",
    fetchAllDeletedCountry: "fetchAllDeletedCountry",
    findCountryById: "findCountryById",
    createCountry: "createCountry",
    updateCountry: "updateCountry",
    deleteCountry: "deleteCountry",
    restoreCountry: "restoreCountry",
    toggleCountryVisibility: "toggleCountryVisibility",
  },
  REDIS: {},
  RABBITMQ: {},
};
