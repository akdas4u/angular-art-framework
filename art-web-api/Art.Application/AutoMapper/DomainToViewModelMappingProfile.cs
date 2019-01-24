namespace Art.Application.AutoMapper
{
    using global::AutoMapper;
    using Art.Application.ViewModels;
    using Art.Domain.Models;

    public class DomainToViewModelMappingProfile : Profile
    {
        public DomainToViewModelMappingProfile()
        {
            this.CreateMap<UnidadeMedida, UnidadeMedidaViewModel>().MaxDepth(1);
        }
    }
}
