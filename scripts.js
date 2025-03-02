document.addEventListener("DOMContentLoaded", () => {
    const danhSach = document.getElementById("danh-sach");
    const nhapCongViec = document.getElementById("nhap-cong-viec");
    const themCongViec = document.getElementById("them-cong-viec");
    const locButtons = document.querySelectorAll(".loc");
    const demCongViec = document.getElementById("dem-cong-viec");

    let congViec = JSON.parse(localStorage.getItem("congViec")) || [];
    let loc = "Tất cả";

    const luuDuLieu = () => localStorage.setItem("congViec", JSON.stringify(congViec));

    const capNhatSoLuong = () => {
        const chuaHoanThanh = congViec.filter(cv => !cv.hoanThanh).length;
        demCongViec.textContent = `${chuaHoanThanh} công việc còn lại`;
    };

    const hienThiCongViec = () => {
        danhSach.innerHTML = "";
        congViec.filter(cv => 
            loc === "Tất cả" || 
            (loc === "Chưa hoàn thành" && !cv.hoanThanh) || 
            (loc === "Hoàn thành" && cv.hoanThanh)
        ).forEach((cv, i) => {
            danhSach.innerHTML += `
                <li>
                    <input type="checkbox" ${cv.hoanThanh ? "checked" : ""} onchange="doiTrangThai(${i})">
                    <span>${cv.ten}</span>
                    <button onclick="suaCongViec(${i})">Sửa</button>
                    <button onclick="xoaCongViec(${i})">Xóa</button>
                </li>`;
        });
        capNhatSoLuong();
    };

    themCongViec.addEventListener("click", () => {
        const ten = nhapCongViec.value.trim();
        if (ten) {
            congViec.push({ ten, hoanThanh: false });
            nhapCongViec.value = "";
            luuDuLieu();
            hienThiCongViec();
        }
    });

    window.doiTrangThai = (i) => {
        congViec[i].hoanThanh = !congViec[i].hoanThanh;
        luuDuLieu();
        hienThiCongViec();
    };

    window.suaCongViec = (i) => {
        const tenMoi = prompt("Chỉnh sửa công việc:", congViec[i].ten);
        if (tenMoi !== null) {
            congViec[i].ten = tenMoi;
            luuDuLieu();
            hienThiCongViec();
        }
    };

    window.xoaCongViec = (i) => {
        congViec.splice(i, 1);
        luuDuLieu();
        hienThiCongViec();
    };

    locButtons.forEach(button => {
        button.addEventListener("click", () => {
            locButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            loc = button.dataset.filter;
            hienThiCongViec();
        });
    });

    hienThiCongViec();
});
