const STATUS_ACCOUNT = {
    INACTIVE: 0, //Tài khoản bị vô hiệu hóa, không thể đăng nhập hoặc sử dụng dịch vụ.
    ACTIVE: 1,
    SUSPENDED: 2, //Tài khoản bị tạm khóa do vi phạm chính sách hoặc hoạt động bất thường.
    BANNED: 3, //Tài khoản bị cấm vĩnh viễn, không thể khôi phục.
    LOCKED: 4, //Tài khoản bị khóa tạm thời, thường do nhập sai mật khẩu nhiều lần.
};

export { STATUS_ACCOUNT };
