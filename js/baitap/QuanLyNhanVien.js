// Funtion contructor
function NhanVien(tkNV, tenNV, email, matKhau, date, luongCB, chucVu, gioLam) {
  (this.tkNV = tkNV),
    (this.tenNV = tenNV),
    (this.email = email),
    (this.matKhau = matKhau),
    (this.date = date),
    (this.luongCB = luongCB),
    (this.chucVu = chucVu),
    (this.gioLam = gioLam);
}

NhanVien.prototype.xepLoai = function () {
  if (this.gioLam >= 192) {
    return "Xuất sắc";
  }

  if (this.gioLam >= 176) {
    return "Giỏi";
  }
  if (this.gioLam >= 160) {
    return "Khá";
  }
  if (this.gioLam < 160 && this.gioLam > 0) {
    return "Trung bình";
  }
  return "";
};

NhanVien.prototype.tinhLuong = function () {
  if (this.chucVu == "Giám đốc") {
    return this.luongCB * 3;
  }
  if (this.chucVu == "Trưởng phòng") {
    return this.luongCB * 2;
  }
  if (this.chucVu == "Nhân viên") {
    return this.luongCB;
  }
  return 0;
};
