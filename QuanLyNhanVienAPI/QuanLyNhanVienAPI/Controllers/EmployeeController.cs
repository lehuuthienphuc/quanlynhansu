using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuanLyNhanVienAPI.Data;
using QuanLyNhanVienAPI.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace QuanLyNhanVienAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeController : ControllerBase
    {

        private readonly ApplicationDbContext _context;

        public EmployeeController(ApplicationDbContext context) {
            _context = context;
        }
        // Lấy danh sách nhân viên
        [HttpGet]
        public IActionResult GetEmployees()
        {
            var employees = _context.NhanVien.ToListAsync().Result;
            return Ok(employees);
        }

        // Thêm mới nhân viên
        [HttpPost("addEmployee")]
        public async Task<IActionResult> AddEmployee([FromBody] NhanVien newEmployee)
        {
            try
            {
                // Validate dữ liệu
                if (newEmployee == null)
                {
                    return BadRequest(new { Message = "Dữ liệu không hợp lệ" });
                }

                // Kiểm tra email trùng
                if (await _context.NhanVien.AnyAsync(e => e.Email == newEmployee.Email))
                {
                    return Conflict(new { Message = "Email đã tồn tại" });
                }

                // Thêm vào DbContext
                await _context.NhanVien.AddAsync(newEmployee);

                // Lưu thay đổi vào database
                await _context.SaveChangesAsync();

                return Ok(new { Message = "Thêm nhân viên thành công", Data = newEmployee });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "Lỗi server: " + ex.Message });
            }
        }

        // Sửa
        // Xóa nhiều nhân viên theo ID
        [HttpDelete("batchDelete")]
        public async Task<IActionResult> BatchDeleteEmployees([FromBody] List<int> ids)
        {
            try
            {
                if (ids == null || !ids.Any())
                {
                    return BadRequest(new { Message = "Danh sách ID để xóa không hợp lệ." });
                }

                var employeesToDelete = await _context.NhanVien
                    .Where(e => ids.Contains(e.NhanVienId))
                    .ToListAsync();

                if (!employeesToDelete.Any())
                {
                    return NotFound(new { Message = "Không tìm thấy nhân viên nào phù hợp để xóa." });
                }

                _context.NhanVien.RemoveRange(employeesToDelete);
                await _context.SaveChangesAsync(); // Đảm bảo lưu thay đổi vào database

                return Ok(new
                {
                    Success = true,
                    Message = $"Đã xóa thành công {employeesToDelete.Count} nhân viên.",
                    DeletedIds = ids
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    Success = false,
                    Message = "Lỗi khi xóa nhân viên",
                    Error = ex.Message
                });
            }
        }


    }
}
