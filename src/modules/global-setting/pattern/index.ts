export const MASTER_MS_GLOBAL_SETTING_PATTERN = {
  TCP: {
    fetchAllGlobalSetting: {
      role: 'fetchAllGlobalSetting',
      cmd: 'fetch-all-global-setting'
    },
    createGlobalSetting: {
      role: 'createGlobalSetting',
      cmd: 'create-global-setting'
    },
    deleteGlobalSetting: {
      role: 'deleteGlobalSetting',
      cmd: 'delete-global-setting'
    },

  },
  KAFKA: {
    fetchAllGlobalSetting: 'fetchAllGlobalSetting',
    createGlobalSetting: 'createGlobalSetting',
    deleteGlobalSetting: 'deleteGlobalSetting',
  },
  REDIS: [],
  RABBITMQ: [],
};
