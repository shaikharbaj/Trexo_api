export const USER_MS_ADMIN_PATTERN = {
  TCP: {
    fetchAllAdminUser: {
      role: "fetchAllAdminUser",
      cmd: "fetch-all-admin-user",
    },
    fetchAllDeletedAdminUser: {
      role: "fetchAllDeletedAdminUser",
      cmd: "fetch-all-deleted-admin-user",
    },
    fetchAllAdminUserForDropdown: {
      role: "fetchAllAdminUserForDropdown",
      cmd: "fetch-all-admin-user-for-dropdown",
    },
    findAdminUserById: {
      role: "findAdminUserById",
      cmd: "find-admin-user-by-id",
    },
    createAdminUser: { role: "createAdminUser", cmd: "create-admin-user" },
    toggleAdminUserVisibility: {
      role: "toggleAdminUserVisibility",
      cmd: "toggle-admin-user-visibility",
    },
    updateAdminUser: { role: "updateAdminUser", cmd: "update-admin-user" },
    deleteAdminUser: { role: "deleteAdminUser", cmd: "delete-admin-user" },
    restoreAdminUser: { role: "restoreAdminUser", cmd: "restore-admin-user" },
  },
  KAFKA: {
    fetchAllAdminUser: "fetchAllAdminUser",
    fetchAllDeletedAdminUser: "fetchAllDeletedAdminUser",
    fetchAllAdminUserForDropdown: "fetchAllAdminUserForDropdown",
    findAdminUserById: "findAdminUserById",
    createAdminUser: "createAdminUser",
    toggleAdminUserVisibility: "toggleAdminUserVisibility",
    updateAdminUser: "updateAdminUser",
    deleteAdminUser: "deleteAdminUser",
    restoreAdminUser: "restoreAdminUser",
  },
  REDIS: {},
  RABBITMQ: {},
};

export const USER_MS_PATTERN = {
  TCP: {
    registerBuyer: { role: "registerBuyer", cmd: "register-buyer" },
    loginBuyer: { role: "loginBuyer", cmd: "login-buyer" },
    sendBuyerRegisterOTP: {
      role: "sendBuyerRegisterOTP",
      cmd: "send-buyer-register-otp",
    },
    verifyBuyerRegisterOTP: {
      role: "verifyBuyerRegisterOTP",
      cmd: "verify-buyer-register-otp",
    },
  },
  KAFKA: {
    registerBuyer: "registerBuyer",
    loginBuyer: "loginBuyer",
    sendBuyerRegisterOTP: "sendBuyerRegisterOTP",
    verifyBuyerRegisterOTP: "verifyBuyerRegisterOTP",
  },
  REDIS: {},
  RABBITMQ: {},
};
