namespace Art.Application.AutoMapper
{
    using global::AutoMapper;
    using Art.Application.ViewModels;
    using Art.Domain.Models;
    using System;

    public class ViewModelToDomainMappingProfile : Profile
    {
        public ViewModelToDomainMappingProfile()
        {
            this.CreateMap<UnidadeMedidaViewModel, UnidadeMedida>();
        }
    }
}
