using Microsoft.EntityFrameworkCore;
using QuanLyNhanVienAPI.Data;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Thêm Logging
builder.Logging.ClearProviders();
builder.Logging.AddConsole();

// Cấu hình DbContext sử dụng MySQL
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))
    )
);

// Thêm các dịch vụ cơ bản
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// Cấu hình Swagger
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

// Cấu hình CORS (Cross-Origin Resource Sharing) cho phép frontend Angular kết nối
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:4200") // Địa chỉ frontend Angular
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

// Middleware xử lý lỗi toàn cục
app.Use(async (context, next) =>
{
    try
    {
        await next();
    }
    catch (Exception ex)
    {
        // Log lỗi chi tiết vào logger (nên sử dụng ILogger thay vì Console.WriteLine)
        var logger = app.Services.GetRequiredService<ILogger<Program>>();
        logger.LogError($"Lỗi hệ thống: {ex}");

        context.Response.StatusCode = 500;

        // Trả về thông báo lỗi dạng JSON
        await context.Response.WriteAsJsonAsync(new
        {
            Error = "Đã xảy ra lỗi hệ thống. Vui lòng thử lại sau.",
            Details = app.Environment.IsDevelopment() ? ex.Message : null // Chỉ trả về chi tiết lỗi trong môi trường phát triển
        });
    }
});

// Kích hoạt CORS
app.UseCors("AllowFrontend");

// Kích hoạt Swagger trong môi trường phát triển để dễ dàng kiểm tra API
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "QuanLyNhanVienAPI v1");
        c.RoutePrefix = "swagger"; // Định nghĩa URL để truy cập Swagger UI
    });
}

// Redirect HTTP -> HTTPS
app.UseHttpsRedirection();

// Map các route cho controller
app.MapControllers();

// Kiểm tra kết nối cơ sở dữ liệu khi ứng dụng khởi chạy
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<ApplicationDbContext>();

        // Kiểm tra kết nối và thực hiện migration nếu cần
        await context.Database.MigrateAsync(); // Ensure migrations are applied
        Console.WriteLine("Cơ sở dữ liệu đã kết nối thành công.");
    }
    catch (Exception ex)
    {
        // Xử lý khi kết nối cơ sở dữ liệu thất bại
        Console.WriteLine($"Lỗi khi kết nối cơ sở dữ liệu: {ex.Message}");
        throw;
    }
}

// Chạy ứng dụng
app.Run();
