using QuanLyNhanVienAPI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))
    )
);

builder.Services.AddControllers();

// Add Swagger configuration
builder.Services.AddEndpointsApiExplorer(); // Enable API exploration
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "QuanLyNhanVienAPI", Version = "v1" }); // API title and version
});

// Cấu hình CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins", policy =>
    {
        policy.WithOrigins("http://localhost:4200")  // Địa chỉ frontend của bạn (Angular, React...)
              .AllowAnyMethod()  // Cho phép tất cả các phương thức HTTP (GET, POST, PUT, DELETE, v.v.)
              .AllowAnyHeader(); // Cho phép tất cả các header
    });
});

var app = builder.Build();

// Enable middleware to serve generated Swagger as a JSON endpoint
app.UseSwagger(); // Enable Swagger generation

// Enable middleware to serve Swagger-UI (HTML, JS, CSS, etc.)
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "QuanLyNhanVienAPI v1");
    c.RoutePrefix = "swagger"; // By default, Swagger UI is available at /swagger
});

// Apply CORS middleware
app.UseCors("AllowSpecificOrigins"); // Đảm bảo middleware CORS được áp dụng

app.UseHttpsRedirection();

// Register routes
app.MapControllers();

app.Run();
