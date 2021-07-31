//DOM
document.getElementById("btnThem").addEventListener("click", subBTN);
document.getElementById("btnThemNV").addEventListener("click", themNV);
document.getElementById("btnReset").addEventListener("click", resetForm);
document
  .getElementById("tableDanhSach")
  .addEventListener("click", delegationTable);
document.getElementById("btnCapNhat").addEventListener("click", capNhatNV);
document.getElementById("btnTimNV").addEventListener("click", timNV);

var dsnv = JSON.parse(localStorage.getItem("dsnv")) || [];
function khoitao() {
  if (dsnv.length === 0) {
    return;
  }
  dsnv = dsnv.map(function (nv) {
    return new NhanVien(
      nv.tkNV,
      nv.tenNV,
      nv.email,
      nv.matKhau,
      nv.date,
      nv.luongCB,
      nv.chucVu,
      nv.gioLam
    );
  });
  hienThi(dsnv);
}
khoitao();

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
  dsnv.push(nhanVien);
  //Lưu danh sách sinh viên xuống localStorage
  localStorage.setItem("dsnv", JSON.stringify(dsnv));
  hienThi(dsnv);
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
            <button class="btn btn-primary" id="btnThem" data-action = "select" data-toggle="modal" data-target="#myModal" data-idNV = "${
              nv.tkNV
            }">Edit</button>
           <button class = "btn btn-danger" data-idNV = "${
             nv.tkNV
           }" data-action = "update"> Delete </button> </td>

        </tr>
        `;
  }
  tbody.innerHTML = html;
}

// Xóa sinh viên và update sinh viên
function delegationTable(event) {
  console.log(event.target);

  var idNV = event.target.getAttribute("data-idNV");
  var action = event.target.getAttribute("data-action");
  if (action === "select") {
    return chonNV(idNV);
  }
  if (action === "update") {
    return xoaNV(idNV);
  }
}
//Xóa
function xoaNV(idNV) {
  dsnv = dsnv.filter(function (value) {
    return value.tkNV != idNV;
  });
  localStorage.setItem("dsnv", JSON.stringify(dsnv));
  hienThi(dsnv);
}

function subBTN() {
  document.getElementById("btnThemNV").disabled = false;
  document.getElementById("tknv").disabled = false;
}

//Chọn
function chonNV(idNV) {
  var nhanVien = dsnv.find(function (value) {
    return value.tkNV == idNV;
  });
  document.getElementById("tknv").disabled = true;
  editForm(nhanVien);
  document.getElementById("btnThemNV").disabled = true;
}

// Update-form
function editForm(value) {
  document.getElementById("tknv").value = value.tkNV || "";
  document.getElementById("email").value = value.email || "";
  document.getElementById("name").value = value.tenNV || "";
  document.getElementById("password").value = value.matKhau || "";
  document.getElementById("datepicker").value = value.date || "";
  document.getElementById("luongCB").value = value.luongCB || "";
  document.getElementById("chucvu").value = value.chucVu || "";
  document.getElementById("gioLam").value = value.gioLam || "";
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

  dsnv = dsnv.map(function (nv) {
    if (nv.tkNV == tkNV) {
      return nhanVien;
    }
    return nv;
  });
  localStorage.setItem("dsnv", JSON.stringify(dsnv));

  hienThi(dsnv);
  resetForm();
}

//Reset form
function resetForm() {
  editForm({});
  document.getElementById("tknv").disabled = false;
  document.getElementById("btnThemNV").disabled = false;
}

//Search
function timNV() {
  var search = document.getElementById("searchName").value;
  var newDsnv = dsnv.filter(function (nv) {
    return (
      nv.xepLoai().toLowerCase().indexOf(search.trim().toLowerCase()) != -1
    );
  });
  hienThi(newDsnv);
}
