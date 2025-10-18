using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using ProductManagementAPI.Data;
using ProductManagementAPI.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// Configure Swagger
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo 
    { 
        Title = "SLC Memorial Services API", 
        Version = "v1",
        Description = "API for SLC Memorial Services - Supports both Admin and Landing Page"
    });
});

// CORS Configuration - Allow ANY localhost port
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.WithOrigins(
                "http://localhost:3000",
                "http://localhost:5173", 
                "http://localhost:5174"
            )
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
        
        // Allow any localhost port for development
        policy.SetIsOriginAllowed(origin => 
        {
            if (string.IsNullOrWhiteSpace(origin)) return false;
            
            // Allow any localhost port
            if (origin.ToLower().StartsWith("http://localhost") || 
                origin.ToLower().StartsWith("https://localhost"))
            {
                return true;
            }
            
            // Allow any 127.0.0.1 port
            if (origin.ToLower().StartsWith("http://127.0.0.1") || 
                origin.ToLower().StartsWith("https://127.0.0.1"))
            {
                return true;
            }
            
            return false;
        });
    });
});

// Database Configuration
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
if (string.IsNullOrEmpty(connectionString))
{
    connectionString = "Server=localhost;Database=slc_landing_page;Uid=root;Pwd=;Port=3306;";
}

Console.WriteLine($"Database Connection: {connectionString}");

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c => 
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "SLC Memorial Services API v1");
        c.RoutePrefix = "swagger";
    });
}

// CRITICAL: CORS must come before Authorization and MapControllers
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
        // Ensure database is created and migrations are applied
        await dbContext.Database.EnsureCreatedAsync();
        var canConnect = await dbContext.Database.CanConnectAsync();
        Console.WriteLine($"Database Connection: {(canConnect ? "SUCCESS" : "FAILED")}");
        
        if (canConnect)
        {
            // Test Contracts table
            try
            {
                var contractsCount = dbContext.Contracts?.Count() ?? 0;
                Console.WriteLine($"Contracts in database: {contractsCount}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Contracts table issue: {ex.Message}");
            }
            
            // Test Users table
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
Console.WriteLine("Swagger UI: http://localhost:5025/swagger");
Console.WriteLine("API Base: http://localhost:5025/api");
Console.WriteLine("CORS: Enabled for ALL localhost ports");
Console.WriteLine("Your landing page can now use any port (5174, 5175, 3000, 3001, etc.)");
Console.WriteLine("Database: slc_landing_page");

app.Run();