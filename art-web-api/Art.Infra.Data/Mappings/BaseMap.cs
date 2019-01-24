namespace Art.Infra.Data.Mappings
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;
    using Art.Domain.Models;

    public class BaseMap<TEntity> : IEntityTypeConfiguration<TEntity>
        where TEntity : BaseEntity
    {
        public virtual void Configure(EntityTypeBuilder<TEntity> builder)
        {
            builder.Property(c => c.Id)
                .HasColumnName("Id")
                .UseSqlServerIdentityColumn();

            builder.Property(c => c.CriadoEm)
                .HasColumnName("CriadoEm")
                .HasDefaultValue();

            builder.Property(c => c.Ativo)
                .HasColumnName("Ativo")
                .HasDefaultValue(true);
        }
    }
}
