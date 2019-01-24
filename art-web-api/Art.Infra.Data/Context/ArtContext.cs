namespace Art.Infra.Data.Context
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Configuration;
    using Art.Domain.Models;
    using Art.Infra.Data.Mappings;
    using System.IO;

    public class ArtContext : DbContext
    {
        public DbSet<UnidadeMedida> UnidadeMedidas { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new UnidadeMedidaMap());
            base.OnModelCreating(modelBuilder);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var config = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();

            optionsBuilder.UseSqlServer(config.GetConnectionString("ArtConnection"));
        }
    }
}
