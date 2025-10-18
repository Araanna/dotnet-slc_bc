using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using ProductManagementAPI.Data;
using ProductManagementAPI.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// Swagger configuration
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "SLC Memorial Services API",
        Version = "v1",
        Description = "API for SLC Memorial Services - Supports both Admin and Landing Page"
    });
});

// CORS - allow all origins (for LAN/dev)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Database configuration
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
if (string.IsNullOrEmpty(connectionString))
{
    connectionString = "Server=localhost;Database=slc_landing_page;Uid=root;Pwd=;Port=3306;";
}

Console.WriteLine($"Database Connection: {connectionString}");

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString))
);

var app = builder.Build();

// Swagger middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "SLC Memorial Services API v1");
        c.RoutePrefix = "swagger";
    });
}

// Routing, CORS, Authorization
app.UseRouting();
app.UseCors("AllowAll");
app.UseAuthorization();
app.MapControllers();

// Test database connection
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    try
    {
        await dbContext.Database.EnsureCreatedAsync();
        var canConnect = await dbContext.Database.CanConnectAsync();
        Console.WriteLine($"Database Connection: {(canConnect ? "SUCCESS" : "FAILED")}");

        if (canConnect)
        {
            try
            {
                var contractsCount = dbContext.Contracts?.Count() ?? 0;
                Console.WriteLine($"Contracts in database: {contractsCount}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Contracts table issue: {ex.Message}");
            }

            try
            {
                var usersCount = dbContext.Users.Count();
                Console.WriteLine($"Users in database: {usersCount}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Users table issue: {ex.Message}");
            }
        }
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Database error: {ex.Message}");
        if (ex.InnerException != null)
        {
            Console.WriteLine($"Inner exception: {ex.InnerException.Message}");
        }
    }
}

Console.WriteLine("SLC Memorial Services API Started Successfully!");
Console.WriteLine("Swagger UI: http://<YOUR_LAN_IP>:5025/swagger");
Console.WriteLine("API Base: http://<YOUR_LAN_IP>:5025/api");
Console.WriteLine("CORS: Enabled for all origins");
Console.WriteLine("Database: slc_landing_page");

// Bind API to all network interfaces (LAN)
app.Urls.Add("http://0.0.0.0:5025");

app.Run();
