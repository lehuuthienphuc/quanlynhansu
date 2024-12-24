using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using QuanLyNhanVienAPI.Data;

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

// Cấu hình CORS (Cross-Origin Resource Sharing)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Tạo ứng dụng
var app = builder.Build();

// Middleware xử lý lỗi toàn cục
app.UseMiddleware<ErrorHandlerMiddleware>();

// Kích hoạt CORS
app.UseCors("AllowFrontend");

// Kích hoạt Swagger trong môi trường phát triển
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "QuanLyNhanVienAPI v1");
        c.RoutePrefix = "swagger";
    });
}

// Redirect HTTP -> HTTPS
app.UseHttpsRedirection();

// Map các route cho controller
app.MapControllers();

// Kiểm tra kết nối cơ sở dữ liệu
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<ApplicationDbContext>();
        await context.Database.MigrateAsync();
        Console.WriteLine("Cơ sở dữ liệu đã kết nối thành công.");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Lỗi khi kết nối cơ sở dữ liệu: {ex.Message}");
        throw;
    }
}

// Chạy ứng dụng
app.Run();

/// <summary>
/// Middleware xử lý lỗi toàn cục
/// </summary>
public class ErrorHandlerMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ErrorHandlerMiddleware> _logger;
    private readonly IWebHostEnvironment _env;

    public ErrorHandlerMiddleware(RequestDelegate next, ILogger<ErrorHandlerMiddleware> logger, IWebHostEnvironment env)
    {
        _next = next;
        _logger = logger;
        _env = env;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Lỗi hệ thống xảy ra.");
            context.Response.StatusCode = 500;
            await context.Response.WriteAsJsonAsync(new
            {
                Error = "Đã xảy ra lỗi hệ thống. Vui lòng thử lại sau.",
                Details = _env.IsDevelopment() ? ex.Message : null
            });
        }
    }
}
