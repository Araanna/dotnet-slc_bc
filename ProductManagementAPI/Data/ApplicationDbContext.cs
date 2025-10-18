using Microsoft.EntityFrameworkCore;
using ProductManagementAPI.Models;

namespace ProductManagementAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Contract> Contracts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // User configuration - matches your exact database columns
            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("Users");
                entity.HasKey(e => e.Id);
                
                entity.Property(e => e.Id)
                    .HasColumnName("Id")
                    .ValueGeneratedOnAdd();
                    
                entity.Property(e => e.Username)
                    .HasColumnName("Username")
                    .IsRequired()
                    .HasMaxLength(50);
                    
                entity.Property(e => e.PasswordHash)
                    .HasColumnName("PasswordHash")
                    .IsRequired();
                    
                entity.Property(e => e.CreatedAt)
                    .HasColumnName("CreatedAt")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.HasIndex(e => e.Username).IsUnique();
            });

            // Contract configuration
            modelBuilder.Entity<Contract>(entity =>
            {
                entity.ToTable("Contracts");
                entity.HasKey(e => e.Id);
                
                entity.Property(e => e.Id)
                    .HasColumnName("Id")
                    .ValueGeneratedOnAdd();
                    
                entity.Property(e => e.Title)
                    .HasColumnName("Title")
                    .IsRequired()
                    .HasMaxLength(255);
                    
                entity.Property(e => e.Subtitle)
                    .HasColumnName("Subtitle")
                    .IsRequired()
                    .HasMaxLength(255);
                    
                entity.Property(e => e.Price)
                    .HasColumnName("Price")
                    .HasColumnType("DECIMAL(18,2)");
                    
                entity.Property(e => e.Description)
                    .HasColumnName("Description")
                    .IsRequired()
                    .HasColumnType("TEXT");
                    
                entity.Property(e => e.Features)
                    .HasColumnName("Features")
                    .HasColumnType("TEXT");
                    
                entity.Property(e => e.ImageAlt)
                    .HasColumnName("ImageAlt")
                    .HasMaxLength(255);
                    
                entity.Property(e => e.ImageData)
                    .HasColumnName("ImageData")
                    .HasColumnType("LONGTEXT");
                    
                entity.Property(e => e.ImageFileName)
                    .HasColumnName("ImageFileName")
                    .HasMaxLength(255);
                    
                entity.Property(e => e.ImageContentType)
                    .HasColumnName("ImageContentType")
                    .HasMaxLength(100);
                    
                entity.Property(e => e.CreatedAt)
                    .HasColumnName("CreatedAt")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.HasIndex(e => e.CreatedAt)
                    .HasDatabaseName("IX_Contracts_CreatedAt");
            });
        }
    }
}