namespace Art.Infra.Data.UoW
{
    using Art.Domain.Interfaces;
    using Art.Infra.Data.Context;
    using System.Threading.Tasks;

    public class UnitOfWork : IUnitOfWork
    {
        private readonly ArtContext context;

        public UnitOfWork(ArtContext context)
        {
            this.context = context;
        }

        public bool Commit()
        {
            var rowsAffected = this.context.SaveChanges();
            return rowsAffected > 0;
        }

        public async Task CommitAsync()
        {
            await this.context.SaveChangesAsync();
        }

        public void Dispose()
        {
            this.context.Dispose();
        }
    }
}
