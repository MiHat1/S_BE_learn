const congTy = {
  tenSep: "Anh Tùng",
  baoCao: function() {
    setTimeout(() => { // đổi function() thành arrow function 
      console.log("Sếp " + this.tenSep + " đang đợi báo cáo!");
    }, 1000);
  }
};

congTy.baoCao(); 