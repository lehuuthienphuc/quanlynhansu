using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuanLyNhanVienAPI.Data;
using QuanLyNhanVienAPI.DTOs;
using QuanLyNhanVienAPI.Models;


namespace QuanLyNhanVienAPI.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AuthController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequestDto request)
        {
            var user = await _context.NguoiDungs
                .FirstOrDefaultAsync(x => x.Email == request.Email);

            if (user == null)
                return Unauthorized(new { Message = "Tài khoản không tồn tại." });

            if (user.MatKhau != request.MatKhau)
                return Unauthorized(new { Message = "Tài khoản hoặc mật khẩu không đúng." });

            // Trả về thông tin người dùng khi đăng nhập thành công
            return Ok(new
            {
                Message = "Đăng nhập thành công.",
                User = new
                {
                    user.HoTen,
                    user.Email,
                    user.VaiTro
                }
            });
        }


        // Đăng ký
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterRequestDto request)
        {
            // Kiểm tra email đã tồn tại
            var existingUser = await _context.NguoiDungs
                .FirstOrDefaultAsync(x => x.Email == request.Email);

            if (existingUser != null)
                return BadRequest(new { Message = "Email đã tồn tại." });

            // Tạo người dùng mới
            var newUser = new NguoiDung
            {
                HoTen = request.HoTen,
                Email = request.Email,
                MatKhau = request.MatKhau, // Mật khẩu lưu trực tiếp
                VaiTro = "User",
                NgayDangKy = DateTime.Now
            };

            _context.NguoiDungs.Add(newUser);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Đăng ký thành công." });
        }

        // Quên mật khẩu
        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordRequestDto request)
        {
            // Tìm người dùng theo email
            var user = await _context.NguoiDungs
                .FirstOrDefaultAsync(x => x.Email == request.Email);

            if (user == null)
                return BadRequest(new { Message = "Email không tồn tại." });

            // Cập nhật mật khẩu mới
            user.MatKhau = request.NewPassword; // Lưu mật khẩu mới trực tiếp
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Mật khẩu đã được cập nhật." });
        }

        // Phương thức GET kiểm tra API (dùng để kiểm tra)
        [HttpGet("test-login")]
        public IActionResult TestLogin()
        {
            return Ok("API đang hoạt động. Hãy gửi POST request để đăng nhập.");
        }
    }
}
