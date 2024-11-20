using QuanLyNhanVienAPI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Thêm logging
builder.Logging.AddConsole();

// Add services to the container.
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))
    )
);

// Thêm dịch vụ Controller
builder.Services.AddControllers();

// Add Swagger configuration
builder.Services.AddEndpointsApiExplorer(); // Enable API exploration
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "QuanLyNhanVienAPI",
        Version = "v1",
        Description = "API quản lý nhân viên",
        Contact = new OpenApiContact
        {
            Name = "Hỗ trợ",
            Email = "support@quanlynhanvien.com",
            Url = new Uri("https://example.com")
        }
    });
});

// Cấu hình CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins", policy =>
    {
        policy.WithOrigins("http://localhost:4200")  // Frontend URL
              .AllowAnyMethod()  // Cho phép tất cả các phương thức HTTP
              .AllowAnyHeader()  // Cho phép tất cả các header
              .AllowCredentials(); // Cho phép cookies nếu cần
    });
});

var app = builder.Build();

// Enable CORS middleware
app.UseCors("AllowSpecificOrigins"); // CORS phải được gọi trước UseRouting()

// Thêm middleware để xử lý lỗi toàn cục (Global Error Handling)
app.Use(async (context, next) =>
{
    try
    {
        await next(); // Tiếp tục middleware tiếp theo
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Lỗi hệ thống: {ex.Message}");
        context.Response.StatusCode = 500;
        await context.Response.WriteAsJsonAsync(new { message = "Có lỗi xảy ra. Vui lòng thử lại sau!" });
    }
});

// Enable middleware to serve generated Swagger as a JSON endpoint
app.UseSwagger();

// Enable middleware to serve Swagger-UI (HTML, JS, CSS, etc.)
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "QuanLyNhanVienAPI v1");
    c.RoutePrefix = "swagger"; // URL để truy cập Swagger
});

// Redirect HTTP -> HTTPS
app.UseHttpsRedirection();

// Map routes cho API
app.MapControllers();

// Chạy ứng dụng
app.Run();
