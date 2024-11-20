using System.ComponentModel.DataAnnotations;

namespace QuanLyNhanVienAPI.Models
{
    public class NguoiDung
    {
        [Key]
        public int NguoiDungId { get; set; }

        [Required]
        [MaxLength(100)]
        public string HoTen { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string MatKhau { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string VaiTro { get; set; } = "User";

        [Required]
        public DateTime NgayDangKy { get; set; } = DateTime.Now;
    }
}
