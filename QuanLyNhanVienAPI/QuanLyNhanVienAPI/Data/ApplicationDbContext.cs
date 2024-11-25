using Microsoft.EntityFrameworkCore;
using QuanLyNhanVienAPI.Models;

namespace QuanLyNhanVienAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<NguoiDung> NguoiDung { get; set; }
    }
}
