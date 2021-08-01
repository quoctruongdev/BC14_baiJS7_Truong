//DOM
document.getElementById("btnThem").addEventListener("click", subBTN);
document.getElementById("btnThemNV").addEventListener("click", themNV);
document.getElementById("btnReset").addEventListener("click", resetForm);
document
  .getElementById("tableDanhSach")
  .addEventListener("click", delegationTable);
document.getElementById("btnCapNhat").addEventListener("click", capNhatNV);
document.getElementById("btnTimNV").addEventListener("click", timNV);
var qlnv = new QuanLyNhanVien();
qlnv.khoiTao();
hienThi(qlnv.dsnv);

function subBTN() {
  editForm({});
  document.getElementById("tknv").disabled = false;
  document.getElementById("btnThemNV").disabled = false;
  document.getElementById("btnCapNhat").disabled = true;
  hiddenTB();
}

//Thêm nhân viên và hiển thị
function themNV() {
  var tkNV = document.getElementById("tknv").value;
  var tenNV = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var matKhau = document.getElementById("password").value;
  var date = document.getElementById("datepicker").value;
  var luongCB = +document.getElementById("luongCB").value;
  var chucVu = document.getElementById("chucvu").value;
  var gioLam = +document.getElementById("gioLam").value;

  var nhanVien = new NhanVien(
    tkNV,
    tenNV,
    email,
    matKhau,
    date,
    luongCB,
    chucVu,
    gioLam
  );
  var isValid = xacThucDuLieu(nhanVien);
  if (!isValid) {
    return;
  } else {
    hiddenTB();
  }
  qlnv.themNhanVien(nhanVien);
  hienThi(qlnv.dsnv);
  resetForm();
}

function hienThi(dsnv) {
  var tbody = document.getElementById("tableDanhSach");
  var html = "";

  for (var i = 0; i < dsnv.length; i += 1) {
    var nv = dsnv[i];

    html += `
        <tr>
            <td>${nv.tkNV}</td>
            <td>${nv.tenNV}</td>
            <td>${nv.email}</td>
            <td>${nv.date}</td>
            <td>${nv.chucVu}</td>
            <td>${nv.tinhLuong()}</td>
            <td>${nv.xepLoai()}</td>
            <td>
            <button class="btn btn-primary px-4 my-1" id="btnThem" data-action = "select" data-toggle="modal" data-target="#myModal" data-tkNV = "${
              nv.tkNV
            }">Edit</button>
           <button class = "btn btn-danger my-1" data-tkNV = "${
             nv.tkNV
           }" data-action = "update"> Delete </button> </td>

        </tr>
        `;
  }
  tbody.innerHTML = html;
}

// Xóa và update sinh viên

function delegationTable(event) {
  console.log(event.target);
  var tkNV = event.target.getAttribute("data-tkNV");
  var action = event.target.getAttribute("data-action");
  if (action === "select") {
    return chonNhanVien(tkNV);
  }
  if (action === "update") {
    return xoaNhanVien(tkNV);
  }
}
//Xóa
function xoaNhanVien(tkNV) {
  qlnv.xoaNhanVien(tkNV);
  hienThi(qlnv.dsnv);
}

//Chọn
function chonNhanVien(tkNV) {
  var nhanVien = qlnv.chonNhanVien(tkNV);

  document.getElementById("tknv").disabled = true;
  editForm(nhanVien);
  document.getElementById("btnThemNV").disabled = true;
  document.getElementById("btnCapNhat").disabled = false;
}

// Edit-form
function editForm(nhanVien) {
  document.getElementById("tknv").value = nhanVien.tkNV || "";
  document.getElementById("email").value = nhanVien.email || "";
  document.getElementById("name").value = nhanVien.tenNV || "";
  document.getElementById("password").value = nhanVien.matKhau || "";
  document.getElementById("datepicker").value = nhanVien.date || "";
  document.getElementById("luongCB").value = nhanVien.luongCB || "";
  document.getElementById("chucvu").value = nhanVien.chucVu || "";
  document.getElementById("gioLam").value = nhanVien.gioLam || "";
}

// Update
function capNhatNV() {
  var tkNV = document.getElementById("tknv").value;
  var tenNV = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var matKhau = document.getElementById("password").value;
  var date = document.getElementById("datepicker").value;
  var luongCB = +document.getElementById("luongCB").value;
  var chucVu = document.getElementById("chucvu").value;
  var gioLam = +document.getElementById("gioLam").value;

  var nhanVien = new NhanVien(
    tkNV,
    tenNV,
    email,
    matKhau,
    date,
    luongCB,
    chucVu,
    gioLam
  );

  var isValid = xacThucDuLieu(nhanVien);
  if (!isValid) {
    return;
  } else {
    hiddenTB();
  }
  qlnv.capNhatNhânVien(nhanVien);
  hienThi(qlnv.dsnv);
  resetForm();
}

//Reset form
function resetForm() {
  editForm({});
  document.getElementById("tknv").disabled = false;
  document.getElementById("btnThemNV").disabled = false;
  hiddenTB();
}

//Search
function timNV() {
  var search = document.getElementById("searchName").value;
  var newDSNV = qlnv.timKiemNhanVien(search);
  hienThi(newDSNV);
}

function xacThucDuLieu(nhanVien) {
  var validator = new Validator();
  var isValid = validator.taiKhoanNhanVien("tbTKNV", nhanVien.tkNV);
  isValid &= validator.tenNhanVien("tbTen", nhanVien.tenNV);
  isValid &= validator.email("tbEmail", nhanVien.email);
  isValid &= validator.passWord("tbMatKhau", nhanVien.matKhau);
  isValid & validator.ngayLam("tbNgay", nhanVien.date);
  isValid &= validator.luongCoBan("tbLuongCB", nhanVien.luongCB);
  isValid &= validator.chonChucVu("tbChucVu", nhanVien.chucVu);
  isValid &= validator.gioLamViec("tbGiolam", nhanVien.gioLam);

  if (!isValid) {
    for (var key in validator.errors) {
      if (validator.errors[key]) {
        document.getElementById(key).innerHTML = validator.errors[key];
        document.getElementById(key).style.display = "block";
      }
    }
    return false;
  }
  return true;
}

// Ẩn thông báo
function hiddenTB() {
  document.getElementById("tbTKNV").style.display = " none ";
  document.getElementById("tbTen").style.display = "none";
  document.getElementById("tbEmail").style.display = "none";
  document.getElementById("tbMatKhau").style.display = "none";
  document.getElementById("tbNgay").style.display = "none";
  document.getElementById("tbLuongCB").style.display = "none";
  document.getElementById("tbChucVu").style.display = "none";
  document.getElementById("tbGiolam").style.display = "none";
}
