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
      { name: 'Update', url: 'UpdateWithTruong' },
      { name: 'Create', url: 'CreateWithTruong' },
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
      { name: 'CreateBySchool', url: 'CreateBySchool' },
      { name: 'UpdateBySchool', url: 'UpdateBySchool' },
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
  {
    name: 'Truong',
    actions: [
      { name: 'GetAll', url: '' },
      { name: 'Update', url: 'Update' },
      { name: 'Create', url: 'Create' },
      { name: 'Delete', url: 'Delete' },
    ],
  },
  {
    name: 'HeDaoTao',
    actions: [
      { name: 'GetAll', url: '' },
      { name: 'Update', url: 'Update' },
      { name: 'Create', url: 'Create' },
      { name: 'Delete', url: 'Delete' },
    ],
  },
  {
    name: 'HinhThucDaoTao',
    actions: [
      { name: 'GetAll', url: '' },
      { name: 'Update', url: 'Update' },
      { name: 'Create', url: 'Create' },
      { name: 'Delete', url: 'Delete' },
    ],
  },
  {
    name: 'MonThi',
    actions: [
      { name: 'GetAll', url: '' },
      { name: 'Update', url: 'Update' },
      { name: 'Create', url: 'Create' },
      { name: 'Delete', url: 'Delete' },
    ],
  },
  {
    name: 'Nam',
    actions: [
      { name: 'GetAll', url: '' },
      { name: 'Update', url: 'Update' },
      { name: 'Create', url: 'Create' },
      { name: 'Delete', url: 'Delete' },
    ],
  },
  {
    name: 'KhoaThi',
    actions: [
      { name: 'GetAll', url: '' },
      { name: 'Update', url: 'Update' },
      { name: 'Create', url: 'Create' },
      { name: 'Delete', url: 'Delete' },
      { name: 'GetByNam', url: 'GetByNam' },
    ],
  },
  {
    name: 'CauHinhBanChinh',
    actions: [
      { name: 'GetAll', url: '' },
      { name: 'Update', url: 'Update' },
      { name: 'Create', url: 'Create' },
      { name: 'Delete', url: 'Delete' },
      { name: 'GetByKhoaThi', url: 'GetByKhoaThi' },
      { name: 'UpdateMany', url: 'UpdateMany' },
    ],
  },
  {
    name: 'HoiDong',
    actions: [
      { name: 'GetAll', url: '' },
      { name: 'Update', url: 'Update' },
      { name: 'Create', url: 'Create' },
      { name: 'Delete', url: 'Delete' },
      { name: 'GetByKhoaThi', url: 'GetByKhoaThi' },
      { name: 'Import', url: 'Import' },
      { name: 'DeleteMany', url: 'DeleteMany' },
    ],
  },
  {
    name: 'DonViDangKyDuThi',
    actions: [
      { name: 'GetAll', url: '' },
      { name: 'Update', url: 'Update' },
      { name: 'Create', url: 'Create' },
      { name: 'Delete', url: 'Delete' },
      { name: 'GetByKhoaThi', url: 'GetByKhoaThi' },
      { name: 'Import', url: 'Import' },
      { name: 'DeleteMany', url: 'DeleteMany' },
    ],
  },
  {
    name: 'ImportVanBang',
    actions: [
      { name: 'GetAll', url: '' },
      { name: 'Update', url: 'Update' },
      { name: 'Create', url: 'Create' },
      { name: 'Delete', url: 'Delete' },
      { name: 'GetByKhoaThi', url: 'GetByKhoaThi' },
      { name: 'Import', url: 'Import' },
      { name: 'GetImportedByKhoaThiId', url: 'GetImportedByKhoaThiId' },
      { name: 'DeleteImport', url: 'DeleteImport' },
      { name: 'ChuyenChinhThuc', url: 'ChuyenChinhThuc' },
      { name: 'ChecKHaveInvalid', url: 'ChecKHaveInvalid' },
    ],
  },
  {
    name: 'DuyetVanBang',
    actions: [
      { name: 'GetAll', url: '' },
      { name: 'Update', url: 'Update' },
      { name: 'Create', url: 'Create' },
      { name: 'Delete', url: 'Delete' },
      { name: 'CreateWithFile', url: 'CreateWithFile' },
      { name: 'UpdateWithFile', url: 'UpdateWithFile' },
      { name: 'GetVanBangChoDuyetByKhoaThiId', url: 'GetVanBangChoDuyetByKhoaThiId' },
      { name: 'Duyet', url: 'Duyet' },
      { name: 'DuyetAll', url: 'DuyetAll' },
    ],
  },
  {
    name: 'PhanHoi',
    actions: [{ name: 'Create', url: 'Create' }],
  },
  {
    name: 'VanBang',
    actions: [{ name: 'GetVanBangDaDuyetByKhoaThiId', url: 'GetVanBangDaDuyetByKhoaThiId' }],
  },
  {
    name: 'XacMinhVanBang',
    actions: [
      { name: 'GetAll', url: '' },
      { name: 'Update', url: 'Update' },
      { name: 'Create', url: 'Create' },
      { name: 'Delete', url: 'Delete' },
      { name: 'GetXacMinhVanBang', url: 'GetXacMinhVanBang' },
      { name: 'GetRawXacMinhVanBang', url: 'GetRawXacMinhVanBang' },
      { name: 'CreateWithFile', url: 'CreateWithFile' },
      { name: 'CreatesWithFile', url: 'CreatesWithFile' },
    ],
  },
  {
    name: 'ChinhSuaVanBang',
    actions: [
      { name: 'GetAll', url: '' },
      { name: 'Update', url: 'Update' },
      { name: 'Create', url: 'Create' },
      { name: 'Delete', url: 'Delete' },
      { name: 'Delete', url: 'Delete' },
      { name: 'GetVanBangChinhSuaHistory', url: 'GetVanBangChinhSuaHistory' },
      { name: 'GetVanBangDaDuyetByKhoaThiId', url: 'GetVanBangDaDuyetByKhoaThiId' },
      { name: 'GetVanBangChinhSua', url: 'GetVanBangChinhSua' },
      { name: 'UpdateWithVanBang', url: 'UpdateWithVanBang' },
      { name: 'GetHistory', url: 'GetHistory' },
    ],
  },
  {
    name: 'CauHinhBanSao',
    actions: [
      { name: 'GetAll', url: '' },
      { name: 'Update', url: 'Update' },
      { name: 'Create', url: 'Create' },
      { name: 'Delete', url: 'Delete' },
      { name: 'GetAllCauHinh', url: 'GetAllCauHinh' },
      { name: 'UpdateMany', url: 'UpdateMany' },
    ],
  },
  {
    name: 'VanBangBanSao',
    actions: [
      { name: 'GetAll', url: '' },
      { name: 'Update', url: 'UpdateWithFile' },
      { name: 'Create', url: 'CreateWithFile' },
      { name: 'Delete', url: 'Delete' },
      { name: 'GetByVanBang', url: 'GetByVanBang' },
      { name: 'GetByState', url: 'GetByState' },
      { name: 'ChuyenNguoiDuyet', url: 'ChuyenNguoiDuyet' },
      { name: 'ChuyenNguoiDuyetMany', url: 'ChuyenNguoiDuyet' },
      { name: 'Duyet', url: 'Duyet' },
      { name: 'DuyetMany', url: 'Duyet' },
      { name: 'Huy', url: 'Huy' },
      { name: 'HuyMany', url: 'Huy' },
      { name: 'PhanHoi', url: 'PhanHoi' },
      { name: 'GetByDate', url: 'GetByDate' },
    ],
  },
  {
    name: 'ChungNhanTotNghiepTamThoi',
    actions: [
      { name: 'GetAll', url: 'Filter' },
      { name: 'Update', url: 'Update' },
      { name: 'Create', url: 'Create' },
      { name: 'Delete', url: 'Delete' },
    ],
  },
  {
    name: 'CapPhatVanBang',
    actions: [
      { name: 'GetVanBangDaDuyetByKhoaThiId', url: 'GetVanBangDaDuyetByKhoaThiId' },
      { name: 'UpdateWithFile', url: 'UpdateWithFile' },
      { name: 'Delete', url: 'Delete' },
    ],
  },
  {
    name: 'PhanQuyenCapPhat',
    actions: [{ name: 'Create', url: 'Create' }],
  },
  {
    name: 'TuHuy',
    actions: [
      { name: 'CountBanSaoByKhoaThi', url: 'CountBanSaoByKhoaThi' },
      { name: 'CountChuaDuyetByKhoaThi', url: 'CountChuaDuyetByKhoaThi' },
      { name: 'CountDaDuyetByKhoaThi', url: 'CountDaDuyetByKhoaThi' },
      { name: 'CountImportByKhoaThi', url: 'CountImportByKhoaThi' },
      { name: 'TuHuyByDaDuyet', url: 'TuHuyByDaDuyet' },
      { name: 'TuHuyByChoDuyet', url: 'TuHuyByChoDuyet' },
      { name: 'TuHuyByImport', url: 'TuHuyByImport' },
      { name: 'TuHuyByBanSao', url: 'TuHuyByBanSao' },
    ],
  },
  {
    name: 'Demo',
    actions: [
      { name: 'Get', url: 'DPF' },
      // { name: 'BanGiaoVanBangChiTiet', url: 'BanGiaoVanBangChiTiet' },
      // { name: 'ReportXepLoai', url: 'ReportXepLoai' },
      // { name: 'ReportNam', url: 'ReportNam' },
      // { name: 'TongSo', url: 'TongSo' },
    ],
  },
  {
    name: 'Report',
    actions: [
      { name: 'BanGiaoVanBang', url: 'BanGiaoVanBang' },
      { name: 'BanGiaoVanBangChiTiet', url: 'BanGiaoVanBangChiTiet' },
      { name: 'ReportXepLoai', url: 'ReportXepLoai' },
      { name: 'ReportNam', url: 'ReportNam' },
      { name: 'TongSo', url: 'TongSo' },
    ],
  },
]
export default controllers
