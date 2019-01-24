namespace Art.Infra.Data.Repository
{
    using Art.Domain.Interfaces;
    using Art.Domain.Models;
    using Art.Infra.Data.Context;

    /// <summary>
    ///     Implementação da <see cref="IUnidadeMedidaRepository"/>.
    /// </summary>
    public class UnidadeMedidaRepository : BaseRepository<UnidadeMedida>, IUnidadeMedidaRepository
    {
        /// <summary>
        ///     Initializes a new instance of the <see cref="UnidadeMedidaRepository"/> class.
        ///     Construtor padrão de <see cref="UnidadeMedidaRepository"/>.
        /// </summary>
        /// <param name="context">
        ///     O contexto do repositório. Veja <see cref="ArtContext"/>.
        /// </param>
        public UnidadeMedidaRepository(ArtContext context)
            : base(context)
        {
        }
    }
}
