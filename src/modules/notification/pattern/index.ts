export const NOTIFICATION_MS_PATTERN: any = {
  TCP: {
    registerNotificationToken: {
      role: 'registerNotificationToken',
      cmd: 'register-notification-token',
    },
    sendPushNotification: {
      role: 'sendPushNotification',
      cmd: 'send-push-notification',
    },
    setUserNotificationPreference: {
      role: 'setUserNotificationPreference',
      cmd: 'set-user-notification-preference',
    },
    fetchUserNotificationPreference: {
      role: 'fetchUserNotificationPreference',
      cmd: 'fetch-user-notification-preference',
    },
    fetchNotificationEvent: {
      role: 'fetchNotificationEvent',
      cmd: 'fetch-notification-event',
    },
    sendUserNotificationTest: {
      role: 'sendUserNotificationTest',
      cmd: 'send-user-notification-test',
    },
    sendUserNotification: {
      role: 'sendUserNotification',
      cmd: 'send-user-notification',
    },
    sendEmailTemplate: {
      role: 'sendEmailTemplate',
      cmd: 'send-email-template',
    },
  },
  KAFKA: {
    registerNotificationToken: 'registerNotificationToken',
    sendPushNotification: 'sendPushNotification',
    setUserNotificationPreference: 'setUserNotificationPreference',
    fetchUserNotificationPreference: 'fetchUserNotificationPreference',
    fetchNotificationEvent: 'fetchNotificationEvent',
    sendUserNotificationTest: 'sendUserNotificationTest',
    sendUserNotification: 'sendUserNotification',
    sendEmailTemplate: 'sendEmailTemplate'
  },
  REDIS: [],
  RABBITMQ: [],
};
