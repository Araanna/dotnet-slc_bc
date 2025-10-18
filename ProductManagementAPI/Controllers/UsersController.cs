using Microsoft.AspNetCore.Mvc;
using ProductManagementAPI.Data;
using ProductManagementAPI.Models;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;

namespace ProductManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UsersController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateUser([FromBody] CreateUserRequest request)
        {
            try
            {
                Console.WriteLine($"Creating user: {request.Username}");

                // Check if user already exists
                var existingUser = await _context.Users
                    .FirstOrDefaultAsync(u => u.Username == request.Username);

                if (existingUser != null)
                {
                    return BadRequest(new { 
                        success = false, 
                        message = "User already exists" 
                    });
                }

                // Create new user
                var user = new User
                {
                    Username = request.Username,
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
                    CreatedAt = DateTime.UtcNow
                };

                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                return Ok(new 
                {
                    success = true,
                    message = "User created successfully!",
                    user = new { 
                        id = user.Id, 
                        username = user.Username,
                        createdAt = user.CreatedAt
                    }
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { 
                    success = false, 
                    error = "Failed to create user", 
                    details = ex.Message 
                });
            }
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllUsers()
        {
            try
            {
                var users = await _context.Users
                    .Select(u => new { 
                        id = u.Id, 
                        username = u.Username, 
                        createdAt = u.CreatedAt 
                    })
                    .ToListAsync();

                return Ok(new 
                {
                    success = true,
                    totalUsers = users.Count,
                    users = users
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { 
                    success = false, 
                    error = "Failed to get users", 
                    details = ex.Message 
                });
            }
        }

        [HttpDelete("clear")]
        public async Task<IActionResult> ClearAllUsers()
        {
            try
            {
                var users = await _context.Users.ToListAsync();
                _context.Users.RemoveRange(users);
                await _context.SaveChangesAsync();

                return Ok(new { 
                    success = true, 
                    message = "All users cleared successfully" 
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { 
                    success = false, 
                    error = "Failed to clear users", 
                    details = ex.Message 
                });
            }
        }
    }

    public class CreateUserRequest
    {
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}