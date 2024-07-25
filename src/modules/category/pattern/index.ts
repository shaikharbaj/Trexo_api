export const PRODUCT_MS_CATEGORY_PATTERN = {
  TCP: {
    fetchAllCategory: {
      role: 'fetchAllCategory',
      cmd: 'fetch-all-category'
    },
    fetchAllDeletedCategory: {
      role: 'fetchAllDeletedCategory',
      cmd: 'fetch-all-deleted-category'
    },
    fetchAllCategoryForDropdown: {
      role: 'fetchAllCategoryForDropdown',
      cmd: 'fetch-all-category-for-dropdown'
    },
    findCategoryById: {
      role: 'findCategoryById',
      cmd: 'find-category-by-id'
    },
    createCategory: {
      role: 'createCategory',
      cmd: 'create-category'
    },
    updateCategory: {
      role: 'updateCategory',
      cmd: 'update-category'
    },
    restoreCategory: {
      role: 'restoreCategory',
      cmd: "restore-category"
    },
    toggleCategoryVisibility: {
      role: 'toggleCategoryVisibility',
      cmd: 'toggle-category-visibility'
    },
    deleteCategory: {
      role: 'deleteCategory',
      cmd: 'delete-category'
    },

  },
  KAFKA: {
    fetchAllCategory: 'fetchAllCategory',
    fetchAllDeletedCategory: 'fetchAllDeletedCategory',
    fetchAllCategoryForDropdown: 'fetchAllCategoryForDropdown',
    findCategoryById: 'findCategoryById',
    createCategory: 'createCategory',
    updateCategory: 'updateCategory',
    restoreCategory: 'restoreCategory',
    toggleCategoryVisibility: 'toggleCategoryVisibility',
    deleteCategory: 'deleteCategory',
  },
  REDIS: [],
  RABBITMQ: [],
};
