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
    ));

// Thêm các dịch vụ cơ bản
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
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
        // Log lỗi chi tiết vào console (chỉ dùng trong môi trường phát triển)
        Console.WriteLine($"Chi tiết lỗi: {ex}");
        context.Response.StatusCode = 500;

        // Trả về thông báo lỗi dạng JSON
        await context.Response.WriteAsJsonAsync(new
        {
            Error = "Đã xảy ra lỗi hệ thống. Vui lòng thử lại sau.",
            Details = ex.Message // Thêm chi tiết lỗi để debug (chỉ nên sử dụng khi phát triển)
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
        await context.Database.EnsureCreatedAsync();
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
