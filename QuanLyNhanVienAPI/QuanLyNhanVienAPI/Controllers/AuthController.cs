using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuanLyNhanVienAPI.Data;
using QuanLyNhanVienAPI.DTOs;
using QuanLyNhanVienAPI.Models;
using BCrypt.Net;
using System;

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
            // Kiểm tra xem người dùng có tồn tại không
            var user = await _context.NguoiDungs
                .FirstOrDefaultAsync(x => x.Email == request.Email);

            if (user == null)
                return Unauthorized(new { Message = "Tài khoản không tồn tại." });

            // So sánh mật khẩu người dùng nhập vào với mật khẩu lưu trong cơ sở dữ liệu
            if (user.MatKhau != request.MatKhau)
                return Unauthorized(new { Message = "Tài khoản hoặc mật khẩu không đúng." });

            // Thông báo thành công và trả về thông tin người dùng
            return Ok(new
            {
                Message = "Đăng nhập thành công.",
                User = new
                {
                    user.HoTen,
                    user.Email,
                    user.VaiTro,
                    LoginTime = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")
                }
            });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterRequestDto request)
        {
            var existingUser = await _context.NguoiDungs
                .FirstOrDefaultAsync(x => x.Email == request.Email);

            if (existingUser != null)
                return BadRequest(new { Message = "Email đã tồn tại." });

            var newUser = new NguoiDung
            {
                HoTen = request.HoTen,
                Email = request.Email,
                MatKhau = request.MatKhau, // Mật khẩu nên được mã hóa, nhưng ở đây dùng thẳng để đơn giản
                VaiTro = "User",
                NgayDangKy = DateTime.Now
            };

            _context.NguoiDungs.Add(newUser);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Đăng ký thành công." });
        }
        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordRequestDto request)
        {
            var user = await _context.NguoiDungs
                .FirstOrDefaultAsync(x => x.Email == request.Email);

            if (user == null)
                return BadRequest("Email không tồn tại.");

            // Cập nhật mật khẩu mới
            user.MatKhau = BCrypt.Net.BCrypt.HashPassword(request.NewPassword);
            await _context.SaveChangesAsync();

            return Ok("Mật khẩu đã được cập nhật.");
        }
    }
}
