using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;

namespace ProductManagementAPI.Models
{
    public class Contract
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        public string Title { get; set; } = string.Empty;

        [Required]
        [StringLength(255)]
        public string Subtitle { get; set; } = string.Empty;

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }

        [Required]
        public string Description { get; set; } = string.Empty;

        public string? Features { get; set; }

        [StringLength(255)]
        public string? ImageAlt { get; set; }

        [Column(TypeName = "LONGTEXT")]
        public string? ImageData { get; set; }

        [StringLength(255)]
        public string? ImageFileName { get; set; }

        [StringLength(100)]
        public string? ImageContentType { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public class ContractFeature
    {
        public string Text { get; set; } = string.Empty;
        public int Indent { get; set; }
    }

    public class ContractData
    {
        public List<Contract> Contracts { get; set; } = new();
    }
}