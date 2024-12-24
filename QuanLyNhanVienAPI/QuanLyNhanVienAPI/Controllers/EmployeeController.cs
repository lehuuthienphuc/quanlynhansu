using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuanLyNhanVienAPI.Data;
using QuanLyNhanVienAPI.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.RegularExpressions;

namespace QuanLyNhanVienAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public EmployeeController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Lấy danh sách nhân viên
        [HttpGet]
        public IActionResult GetEmployees()
        {
            var employees = _context.NhanVien.ToListAsync().Result;
            return Ok(employees);
        }

        // Lấy thông tin nhân viên theo ID
        [HttpGet("findEmployee")]
        public IActionResult GetEmployee(int id)
        {
            var employee = _context.NhanVien.FirstOrDefaultAsync(e => e.NhanVienId == id).Result;
            if (employee == null)
            {
                return NotFound(new { Message = "Không tìm thấy nhân viên." });
            }
            return Ok(employee);
        }

        // Thêm mới nhân viên
        [HttpPost("addEmployee")]
        public async Task<IActionResult> AddEmployee([FromBody] NhanVien newEmployee)
        {
            try
            {
                if (newEmployee == null)
                {
                    return BadRequest(new { Message = "Dữ liệu không hợp lệ." });
                }

                // Kiểm tra email trùng
                if (await _context.NhanVien.AnyAsync(e => e.Email == newEmployee.Email))
                {
                    return Conflict(new { Message = "Email đã tồn tại." });
                }

                // Kiểm tra giới tính hợp lệ
                if (!IsValidGender(newEmployee.GioiTinh))
                {
                    return BadRequest(new { Message = "Giới tính chỉ có thể là 'Nam' hoặc 'Nữ'." });
                }

                await _context.NhanVien.AddAsync(newEmployee);
                await _context.SaveChangesAsync();

                return Ok(new { Message = "Thêm nhân viên thành công.", Data = newEmployee });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "Lỗi server: " + ex.Message });
            }
        }

        // Cập nhật thông tin nhân viên
        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateEmployee(int id, [FromBody] NhanVien updatedEmployee)
        {
            try
            {
                if (updatedEmployee == null || id <= 0)
                {
                    return BadRequest(new { Message = "Dữ liệu không hợp lệ." });
                }

                var existingEmployee = await _context.NhanVien.FindAsync(id);
                if (existingEmployee == null)
                {
                    return NotFound(new { Message = "Không tìm thấy nhân viên." });
                }

                // Kiểm tra thông tin bắt buộc
                if (string.IsNullOrEmpty(updatedEmployee.HoTen) ||
                    string.IsNullOrEmpty(updatedEmployee.Email) ||
                    updatedEmployee.NgaySinh == DateTime.MinValue ||
                    updatedEmployee.NgayVaoLam == DateTime.MinValue)
                {
                    return BadRequest(new { Message = "Thông tin nhân viên không đầy đủ." });
                }

                // Kiểm tra định dạng email
                if (!Regex.IsMatch(updatedEmployee.Email, @"^[^\s@]+@[^\s@]+\.[^\s@]+$"))
                {
                    return BadRequest(new { Message = "Định dạng email không hợp lệ." });
                }

                // Kiểm tra giới tính hợp lệ
                if (!IsValidGender(updatedEmployee.GioiTinh))
                {
                    return BadRequest(new { Message = "Giới tính chỉ có thể là 'Nam' hoặc 'Nữ'." });
                }

                // Cập nhật thông tin
                existingEmployee.HoTen = updatedEmployee.HoTen;
                existingEmployee.NgaySinh = updatedEmployee.NgaySinh;
                existingEmployee.Email = updatedEmployee.Email;
                existingEmployee.NgayVaoLam = updatedEmployee.NgayVaoLam;
                existingEmployee.ViTri = updatedEmployee.ViTri;
                existingEmployee.GioiTinh = updatedEmployee.GioiTinh;

                await _context.SaveChangesAsync();

                return Ok(new
                {
                    Message = "Cập nhật thành công.",
                    Data = new
                    {
                        existingEmployee.NhanVienId,
                        existingEmployee.HoTen,
                        existingEmployee.Email,
                        existingEmployee.ViTri,
                        existingEmployee.NgayVaoLam
                    }
                });
            }
            catch (DbUpdateException dbEx)
            {
                return StatusCode(500, new { Message = "Lỗi khi lưu dữ liệu vào cơ sở dữ liệu: " + dbEx.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "Lỗi server: " + ex.Message });
            }
        }

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
                await _context.SaveChangesAsync();

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
                    Message = "Lỗi khi xóa nhân viên.",
                    Error = ex.Message
                });
            }
        }

        // Kiểm tra giới tính hợp lệ
        private bool IsValidGender(string gender)
        {
            return gender == "Nam" || gender == "Nữ";
        }
    }
}
