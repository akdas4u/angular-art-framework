namespace Art.Infra.CrossCutting.IoC
{
    using global::AutoMapper;
    using Microsoft.AspNetCore.Http;
    using Microsoft.Extensions.DependencyInjection;
    using Art.Application.AutoMapper;
    using Art.Application.Interfaces;
    using Art.Application.Services;
    using Art.Domain.Interfaces;
    using Art.Infra.Data.Context;
    using Art.Infra.Data.Repository;
    using Art.Infra.Data.UoW;

    public class NativeInjectorBootStrapper
    {
        public static void RegisterServices(IServiceCollection services)
        {
            // ASP.NET HttpContext dependency
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            // ASP.NET Authorization Polices
            // services.AddSingleton<IAuthorizationHandler, ClaimsRequirementHandler>();

            #region Application

            services.AddSingleton(AutoMapperConfig.RegisterMappings().CreateMapper());

            services.AddScoped<IUnidadeMedidaAppService, UnidadeMedidaAppService>();

            #endregion Application

            #region Infra - Data
            
            services.AddScoped<IUnidadeMedidaRepository, UnidadeMedidaRepository>();

            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<ArtContext>();

            #endregion Infra - Data

            #region Infra - Identity Services

            // services.AddTransient<IEmailSender, AuthEmailMessageSender>();
            // services.AddTransient<ISmsSender, AuthSMSMessageSender>();

            #endregion Infra - Identity Services

            #region Infra - Identity

            // services.AddScoped<IUser, AspNetUser>();

            #endregion Infra - Identity
        }
    }
}
