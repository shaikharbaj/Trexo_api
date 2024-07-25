export const AUTH_MS_PATTERN = {
  TCP: {
    veriryAccessToken: {
      role: 'veriryAccessToken',
      cmd: 'verify-access-token',
    },
    veriryPermission: {
      role: 'veriryPermission',
      cmd: 'verify-permission',
    },
    adminLogin: { role: 'adminLogin', cmd: 'admin-login' },
    buyerLogin: { role: "buyerLogin", cmd: "buyer_login" },
  },
  KAFKA: {
    veriryAccessToken: 'veriryAccessToken',
    veriryPermission: 'veriryPermission',
    adminLogin: 'adminLogin',
    buyerLogin:"buyerLogin"
  },
  REDIS: {},
  RABBITMQ: {},
};
