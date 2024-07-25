export const MASTER_MS_SOCIAL_MEDIA_PATTERN = {
  TCP: {
    fetchAllSocialMedia: {
      role: 'fetchAllSocialMedia',
      cmd: 'fetch-all-social-media'
    },
    findSocialMediaById: {
      role: 'findSocialMediaById',
      cmd: 'find-social-media-by-id'
    },
    createSocialMedia: {
      role: 'createSocialMedia',
      cmd: 'create-social-media'
    },
    updateSocialMedia: {
      role: 'updateSocialMedia',
      cmd: 'update-social-media'
    },
    toggleSocialMediaVisibility: {
      role: 'toggleSocialMediaVisibility',
      cmd: 'toggle-social-media-visibility'
    },
    deleteSocialMedia: {
      role: 'deleteSocialMedia',
      cmd: 'delete-social-media'
    },

  },
  KAFKA: {
    fetchAllSocialMedia: 'fetchAllSocialMedia',
    findSocialMediaById: 'findSocialMediaById',
    createSocialMedia: 'createSocialMedia',
    updateSocialMedia: 'updateSocialMedia',
    toggleSocialMediaVisibility: 'toggleSocialMediaVisibility',
    deleteSocialMedia: 'deleteSocialMedia',
  },
  REDIS: [],
  RABBITMQ: [],
};
