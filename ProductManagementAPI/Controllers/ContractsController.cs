using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductManagementAPI.Data;
using ProductManagementAPI.Models;
using System.Text.Json;

namespace ProductManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContractsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ContractsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/contracts
        [HttpGet]
        public async Task<ActionResult<ContractData>> GetContracts()
        {
            try
            {
                var contracts = await _context.Contracts
                    .OrderByDescending(c => c.CreatedAt)
                    .ToListAsync();

                return Ok(new ContractData { Contracts = contracts });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Failed to fetch contracts", details = ex.Message });
            }
        }

        // GET: api/contracts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Contract>> GetContract(int id)
        {
            try
            {
                var contract = await _context.Contracts.FindAsync(id);
                if (contract == null)
                    return NotFound(new { error = "Contract not found" });

                return Ok(contract);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Failed to fetch contract", details = ex.Message });
            }
        }

        // POST: api/contracts
        [HttpPost]
        public async Task<ActionResult<Contract>> CreateContract([FromForm] ContractCreateRequest request)
        {
            try
            {
                var contract = new Contract
                {
                    Title = request.Title,
                    Subtitle = request.Subtitle,
                    Price = request.Price,
                    Description = request.Description,
                    Features = ParseTextToFeatures(request.Features),
                    ImageAlt = request.ImageAlt,
                    CreatedAt = DateTime.UtcNow
                };

                // Handle image upload - convert to Base64
                if (request.ImageFile != null && request.ImageFile.Length > 0)
                {
                    using var memoryStream = new MemoryStream();
                    await request.ImageFile.CopyToAsync(memoryStream);
                    var imageBytes = memoryStream.ToArray();
                    
                    contract.ImageData = Convert.ToBase64String(imageBytes);
                    contract.ImageFileName = request.ImageFile.FileName;
                    contract.ImageContentType = request.ImageFile.ContentType;
                }

                _context.Contracts.Add(contract);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetContract), new { id = contract.Id }, contract);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Failed to create contract", details = ex.Message });
            }
        }

        // PUT: api/contracts/5
        [HttpPut("{id}")]
        public async Task<ActionResult<Contract>> UpdateContract(int id, [FromForm] ContractUpdateRequest request)
        {
            try
            {
                var contract = await _context.Contracts.FindAsync(id);
                if (contract == null)
                    return NotFound(new { error = "Contract not found" });

                // Update properties
                if (!string.IsNullOrEmpty(request.Title))
                    contract.Title = request.Title;

                if (!string.IsNullOrEmpty(request.Subtitle))
                    contract.Subtitle = request.Subtitle;

                if (request.Price.HasValue)
                    contract.Price = request.Price.Value;

                if (!string.IsNullOrEmpty(request.Description))
                    contract.Description = request.Description;

                if (request.Features != null)
                    contract.Features = ParseTextToFeatures(request.Features);

                if (!string.IsNullOrEmpty(request.ImageAlt))
                    contract.ImageAlt = request.ImageAlt;

                // Handle image update
                if (request.ImageFile != null && request.ImageFile.Length > 0)
                {
                    using var memoryStream = new MemoryStream();
                    await request.ImageFile.CopyToAsync(memoryStream);
                    var imageBytes = memoryStream.ToArray();
                    
                    contract.ImageData = Convert.ToBase64String(imageBytes);
                    contract.ImageFileName = request.ImageFile.FileName;
                    contract.ImageContentType = request.ImageFile.ContentType;
                }

                await _context.SaveChangesAsync();
                return Ok(contract);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Failed to update contract", details = ex.Message });
            }
        }

        // DELETE: api/contracts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContract(int id)
        {
            try
            {
                var contract = await _context.Contracts.FindAsync(id);
                if (contract == null)
                    return NotFound(new { error = "Contract not found" });

                _context.Contracts.Remove(contract);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Contract deleted successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Failed to delete contract", details = ex.Message });
            }
        }

        // GET: api/contracts/5/image - Get image as file
        [HttpGet("{id}/image")]
        public async Task<IActionResult> GetContractImage(int id)
        {
            try
            {
                var contract = await _context.Contracts.FindAsync(id);
                if (contract == null || string.IsNullOrEmpty(contract.ImageData))
                    return NotFound(new { error = "Image not found" });

                var imageBytes = Convert.FromBase64String(contract.ImageData);
                return File(imageBytes, contract.ImageContentType ?? "image/jpeg", contract.ImageFileName ?? "image.jpg");
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Failed to get image", details = ex.Message });
            }
        }

        // Helper method for features parsing
        private string ParseTextToFeatures(string featuresText)
        {
            if (string.IsNullOrEmpty(featuresText)) return "[]";

            var lines = featuresText.Split('\n');
            var features = new List<ContractFeature>();

            foreach (var line in lines)
            {
                var trimmedLine = line.Trim();
                if (string.IsNullOrEmpty(trimmedLine)) continue;

                // Detect indentation level (2 spaces per indent)
                var indentLevel = 0;
                var spaceMatch = System.Text.RegularExpressions.Regex.Match(line, @"^(\s+)");
                if (spaceMatch.Success)
                {
                    var spaces = spaceMatch.Groups[1].Value;
                    indentLevel = spaces.Length / 2;
                }

                features.Add(new ContractFeature
                {
                    Text = trimmedLine,
                    Indent = indentLevel
                });
            }

            return JsonSerializer.Serialize(features);
        }
    }

    public class ContractCreateRequest
    {
        public string Title { get; set; } = string.Empty;
        public string Subtitle { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string Description { get; set; } = string.Empty;
        public string? Features { get; set; }
        public string? ImageAlt { get; set; }
        public IFormFile? ImageFile { get; set; }
    }

    public class ContractUpdateRequest
    {
        public string? Title { get; set; }
        public string? Subtitle { get; set; }
        public decimal? Price { get; set; }
        public string? Description { get; set; }
        public string? Features { get; set; }
        public string? ImageAlt { get; set; }
        public IFormFile? ImageFile { get; set; }
    }
}