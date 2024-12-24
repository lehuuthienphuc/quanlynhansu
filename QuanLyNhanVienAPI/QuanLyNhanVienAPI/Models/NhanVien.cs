using System.ComponentModel.DataAnnotations;

namespace QuanLyNhanVienAPI.Models
{
    public class NhanVien
    {
        [Key]
        public int NhanVienId { get; set; }

        [Required]
        public string MaNhanVien { get; set; }

        [Required]
        [MaxLength(100)]
        public string HoTen { get; set; } = string.Empty;

        [Required]
        public DateTime NgaySinh { get; set; }

        //[Required]
        //public string DiaChi { get; set; }

        //[Required]
        //public string SoDienThoai { get; set; }

        [Required]
        public string Email { get; set; } = string.Empty ;

        public DateTime NgayVaoLam { get; set; }

        public string ViTri { get; set; }

        public string GioiTinh {  get; set; }

    }
}
