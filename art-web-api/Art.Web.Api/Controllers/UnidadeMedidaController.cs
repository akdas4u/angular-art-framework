namespace Art.WebApi.Controllers
{
    using Art.Application.Filters;
    using Art.Application.Interfaces;
    using Art.Application.ViewModels;
    using Art.Domain.Models;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;

    /// <summary>
    ///     Controller de UnidadeMedida.
    /// </summary>
    [Produces("application/json")]
    [Route("unidademedida")]
    public class UnidadeMedidaController : BaseController<UnidadeMedidaViewModel, UnidadeMedidaFilter, UnidadeMedida>
    {
        private new readonly IUnidadeMedidaAppService appService;
        private readonly ILogger logger;

        /// <summary>
        /// Initializes a new instance of the <see cref="UnidadeMedidaController"/> class.
        ///     Contrutor padrão do UnidadeMedidaController.
        /// </summary>
        /// <param name="appService">Application de serviço</param>
        /// <param name="loggerFactory">Factory de gerenciamento de logs</param>
        public UnidadeMedidaController(
            IUnidadeMedidaAppService appService,
            ILoggerFactory loggerFactory)
            : base(appService)
        {
            this.appService = appService;
            this.logger = loggerFactory.CreateLogger<UnidadeMedidaController>();
        }
    }
}
