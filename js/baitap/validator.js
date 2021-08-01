function Validator() {
  this.errors = {};
}

Validator.prototype.email = function (name, value) {
  if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(value)) {
    this.errors[name] = "Email phải đúng định dạng, không để trống";
    return false;
  }

  return true;
};

Validator.prototype.taiKhoanNhanVien = function (name, value) {
  if (!/^[a-z0-9._%+-]{4,6}$/.test(value)) {
    this.errors[name] = "Tài khoản bao gồm tối đa 4 - 6 ký số, không để trống";
    return false;
  }

  return true;
};
Validator.prototype.tenNhanVien = function (name, value) {
  if (!/^[a-zA-Z ][^\d]{1,}$/.test(value)) {
    this.errors[name] = "Tên nhân viên phải là chữ, không để trống";
    return false;
  }
  return true;
};

Validator.prototype.passWord = function (name, value) {
  if (!/^(?=.*[a-zA-z0-9])(?=.*[!@#$%^&*]).{6,10}$/.test(value)) {
    this.errors[name] =
      "Mật khẩu gồm 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt), không để trống";
    return false;
  }
  return true;
};

Validator.prototype.ngayLam = function (name, value) {
  if (
    !/^(?=\d{2}([-.,\/])\d{2}\1\d{4}$)(?:0[1-9]|1\d|[2][0-8]|29(?!.02.(?!(?!(?:[02468][1-35-79]|[13579][0-13-57-9])00)\d{2}(?:[02468][048]|[13579][26])))|30(?!.02)|31(?=.(?:0[13578]|10|12))).(?:0[1-9]|1[012]).\d{4}$/.test(
      value
    )
  ) {
    this.errors[name] =
      "Ngày làm việc phải có định dạng mm/dd/yyyy, không để trống";
    return false;
  }
  return true;
};
Validator.prototype.luongCoBan = function (name, value) {
  if (!/(^[1]{1}[0-9]{7}$)|(^[1-9]{1}[0-9]{6}$)|(^[2]{1}[0]{7}$)/.test(value)) {
    this.errors[name] =
      "Lương cơ bản phải từ 1 000 000 - 20 000 000, không được để trống";
    return false;
  }
  return true;
};

Validator.prototype.chonChucVu = function (name, value) {
  if (!value) {
    this.errors[name] =
      "Chức vụ phải chọn chức vụ hợp lệ (Giám đốc, Trưởng Phòng, Nhân Viên), không để trống";
    return false;
  }
  return true;
};

Validator.prototype.gioLamViec = function (name, value) {
  if (!/(^[1][0-9][0-9]$)|(^[8-9][0-9]$)|(^[2][0]{2}$)/.test(value)) {
    this.errors[name] =
      "Số giờ làm trong tháng từ 80 - 200 giờ, không để trống";
    return false;
  }
  return true;
};
