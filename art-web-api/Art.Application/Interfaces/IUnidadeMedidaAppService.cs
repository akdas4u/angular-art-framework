namespace Art.Application.Interfaces
{
    using Art.Application.Filters;
    using Art.Application.ViewModels;
    using Art.Domain.Models;

    /// <summary>
    ///     Interface de contrato de UnidadeMedida Application Service
    /// </summary>
    public interface IUnidadeMedidaAppService : IBaseAppService<UnidadeMedidaViewModel, UnidadeMedidaFilter, UnidadeMedida>
    {
    }
}
