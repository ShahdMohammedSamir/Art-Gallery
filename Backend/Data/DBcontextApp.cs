using ArtGalleryFinal.Models;
using Microsoft.EntityFrameworkCore;

namespace ArtGalleryFinal.Data
{
    public class DBcontextApp:DbContext
    {
        public DBcontextApp(DbContextOptions<DBcontextApp> options) : base(options) { }

        public DbSet<Products> Products { get; set; }
        public DbSet<Users> Users { get; set; }

        public DbSet<Orders> Orders { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
           
            modelBuilder.Entity<Orders>()
                .HasOne(o => o.User)
                .WithMany(u => u.Orders)
                .HasForeignKey(o => o.UserId)
                .OnDelete(DeleteBehavior.Cascade);

           

            modelBuilder.Entity<Orders>()
                .HasOne(o => o.Product)
                .WithMany(p => p.Orders)
                .HasForeignKey(o => o.ProductId)
                .OnDelete(DeleteBehavior.Cascade);

            base.OnModelCreating(modelBuilder);
        }
    }
}
