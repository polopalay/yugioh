const controllers = [
  {
    name: 'User',
    actions: [
      { name: 'GetAll', url: 'GetAll' },
      { name: 'GetAllTruongUser', url: 'GetAllTruongUser' },
      { name: 'Login', url: 'Login' },
      { name: 'UserInfo', url: 'UserInfo' },
      { name: 'Permission', url: 'Permission' },
      { name: 'ChangePassword', url: 'ChangePassword' },
      { name: 'ResetPassword', url: 'ResetPassword' },
      { name: 'GetAll', url: 'GetAll' },
      { name: 'Delete', url: 'Delete' },
    ],
  },
  {
    name: 'Role',
    actions: [
      { name: 'Update', url: 'Update' },
      { name: 'GetAll', url: 'GetAll' },
      { name: 'Create', url: 'Create' },
      { name: 'Delete', url: 'Delete' },
      { name: 'RolePermission', url: 'RolePermission' },
      { name: 'UpdateRolePermission', url: 'UpdateRolePermission' },
    ],
  },
  {
    name: 'Permission',
    actions: [
      { name: 'GetAll', url: '' },
      { name: 'Update', url: 'Update' },
      { name: 'UpdateMany', url: 'UpdateMany' },
      { name: 'Create', url: 'Create' },
      { name: 'Delete', url: 'Delete' },
    ],
  },
]
export default controllers
