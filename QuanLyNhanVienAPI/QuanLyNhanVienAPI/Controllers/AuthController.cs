using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuanLyNhanVienAPI.Data;
using QuanLyNhanVienAPI.DTOs;
using QuanLyNhanVienAPI.Models;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Security.Cryptography;

namespace QuanLyNhanVienAPI.Controllers
{
    [ApiController]
    [Route("api/")]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AuthController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Login
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequestDto request)
        {
            try
            {
                // Kiểm tra null input
                if (string.IsNullOrWhiteSpace(request.email) || string.IsNullOrWhiteSpace(request.password))
                    return BadRequest(new { Message = "Email và mật khẩu không được để trống." });

                // Tìm người dùng
                var user = await _context.NguoiDung.FirstOrDefaultAsync(x => x.Email == request.email);

                if (user == null)
                    return Unauthorized(new { Message = "Tài khoản không tồn tại." });

                // Kiểm tra mật khẩu, giả sử mật khẩu đã được mã hóa trong cơ sở dữ liệu
                if (!VerifyPassword(request.password, user.MatKhau))
                    return Unauthorized(new { Message = "Tài khoản hoặc mật khẩu không đúng." });

                // Thành công
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
            catch (Exception ex)
            {
                Console.WriteLine($"Lỗi trong Login: {ex.Message}");
                return StatusCode(500, new { Message = "Đã xảy ra lỗi trên máy chủ." });
            }
        }

        // Đăng ký
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterRequestDto request)
        {
            // Kiểm tra email đã tồn tại
            var existingUser = await _context.NguoiDung
                .FirstOrDefaultAsync(x => x.Email == request.Email);

            if (existingUser != null)
                return BadRequest(new { Message = "Email đã tồn tại." });

            // Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
            string hashedPassword = HashPassword(request.MatKhau);

            // Tạo người dùng mới
            var newUser = new NguoiDung
            {
                HoTen = request.HoTen,
                Email = request.Email,
                MatKhau = hashedPassword, // Lưu mật khẩu đã mã hóa
                VaiTro = "User",
                NgayDangKy = DateTime.Now
            };

            _context.NguoiDung.Add(newUser);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Đăng ký thành công." });
        }

        // Quên mật khẩu
        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordRequestDto request)
        {
            // Tìm người dùng theo email
            var user = await _context.NguoiDung
                .FirstOrDefaultAsync(x => x.Email == request.Email);

            if (user == null)
                return BadRequest(new { Message = "Email không tồn tại." });

            // Mã hóa mật khẩu mới trước khi lưu
            string hashedNewPassword = HashPassword(request.NewPassword);
            user.MatKhau = hashedNewPassword; // Cập nhật mật khẩu đã mã hóa
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Mật khẩu đã được cập nhật." });
        }

        // Phương thức GET kiểm tra API (dùng để kiểm tra)
        [HttpGet("test-login")]
        public IActionResult TestLogin()
        {
            return Ok("API đang hoạt động. Hãy gửi POST request để đăng nhập.");
        }

        // Hàm mã hóa mật khẩu
        private string HashPassword(string password)
        {
            byte[] salt = new byte[16];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }
            string hashedPassword = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));
            return hashedPassword;
        }

        // Hàm kiểm tra mật khẩu
        private bool VerifyPassword(string enteredPassword, string storedPassword)
        {
            // Giả sử mật khẩu được lưu dạng đã mã hóa trong cơ sở dữ liệu
            return enteredPassword == storedPassword;  // Cần phải thay bằng phương thức so sánh mật khẩu mã hóa thực sự
        }
    }
}
