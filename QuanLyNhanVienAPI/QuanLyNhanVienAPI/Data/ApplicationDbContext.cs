using Microsoft.EntityFrameworkCore;
using QuanLyNhanVienAPI.Models;

namespace QuanLyNhanVienAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        // Định nghĩa DbSet cho NguoiDung
        public DbSet<NguoiDung> NguoiDungs { get; set; }

        // Phương thức này được gọi khi xây dựng mô hình dữ liệu
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Ánh xạ tên bảng trong cơ sở dữ liệu
            modelBuilder.Entity<NguoiDung>()
                .ToTable("nguoidung");  // Sử dụng tên bảng chính xác trong cơ sở dữ liệu
        }
    }
}
