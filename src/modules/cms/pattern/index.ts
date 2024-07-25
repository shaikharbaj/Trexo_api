export const CMS_MS_CMS_PATTERN = {
  TCP: {
    fetchAllCms: { role: "fetchAllCms", cmd: "fetch-all-cms" },
    fetchAllDeletedCms: {
      role: "fetchAllDeletedCms",
      cmd: "fetch-all-deleted-cms",
    },
    findCmsById: { role: "findCmsById", cmd: "find-cms-by-id" },
    createCms: { role: "createCms", cmd: "create-cms" },
    updateCms: { role: "updateCms", cmd: "update-cms" },
    deleteCms: { role: "deleteCms", cmd: "delete-cms" },
    restoreDeletedCms: {
      role: "restoreDeletedCms",
      cmd: "restore-deleted-cms",
    },
    toggleCmsVisibility: {
      role: "toggleCmsVisibility",
      cmd: "toggle-cms-visibility",
    },
  },
  KAFKA: {
    fetchAllCms: "fetchAllCms",
    fetchAllDeletedCms: "fetchAllDeletedCms",
    findCmsById: "findCmsById",
    createCms: "createCms",
    updateCms: "updateCms",
    deleteCms: "deleteCms",
    restoreDeletedCms: "restoreDeletedCms",
    toggleCmsVisibility: "toggleCmsVisibility",
  },
  REDIS: {},
  RABBITMQ: {},
};
