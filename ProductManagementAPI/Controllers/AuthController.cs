using Microsoft.AspNetCore.Mvc;
using ProductManagementAPI.Data;
using ProductManagementAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ProductManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AuthController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            try
            {
                Console.WriteLine($"Login attempt: {request.Username}");

                var user = await _context.Users
                    .FirstOrDefaultAsync(u => u.Username == request.Username);

                if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
                {
                    return Unauthorized(new { 
                        success = false, 
                        message = "Invalid username or password" 
                    });
                }

                // Simple success response
                return Ok(new 
                {
                    success = true,
                    message = "Login successful!",
                    user = new { 
                        id = user.Id, 
                        username = user.Username 
                    }
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { 
                    success = false, 
                    error = "Login failed", 
                    details = ex.Message 
                });
            }
        }

        [HttpGet("check")]
        public IActionResult CheckAuth()
        {
            return Ok(new { 
                success = true, 
                message = "Auth check endpoint working" 
            });
        }
    }

    public class LoginRequest
    {
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}