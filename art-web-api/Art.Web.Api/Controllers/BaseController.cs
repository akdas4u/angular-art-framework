namespace Art.WebApi.Controllers
{
    using Art.Application.Filters;
    using Art.Application.Interfaces;
    using Art.Application.ViewModels;
    using Art.Domain.Models;
    using Art.Infra.CrossCutting.Core.Messages;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using System;
    using System.Net;

    [Produces("application/json")]
    [Route("[controller]")]
    [Authorize]
    public abstract class BaseController<TViewModel, TFilter, TEntity> : ControllerBase
        where TViewModel : BaseViewModel
        where TFilter : BaseFilter
        where TEntity : BaseEntity
    {
        public string ErrorCode;
        protected readonly IBaseAppService<TViewModel, TFilter, TEntity> appService;

        protected BaseController(IBaseAppService<TViewModel, TFilter, TEntity> appService)
        {
            this.appService = appService;
        }

        protected new IActionResult Response(
            object result = null,
            HttpStatusCode statusCode = HttpStatusCode.OK,
            string message = "")
        {
            var response = new ResponseViewModel()
            {
                Data = result,
                Message = message,
                Success = false
            };

            if (result != null)
            {
                // Handled Error
                if (result.GetType() == typeof(ArtException))
                {
                    response.Message = (result as ArtException).Message;

                    return new ObjectResult(response)
                    { StatusCode = (int)HttpStatusCode.BadRequest };
                }

                // Unhandled Error
                if (result is Exception)
                {
                    response.Message = Messages.InternalServerError;

                    return new ObjectResult(response)
                    { StatusCode = (int)HttpStatusCode.InternalServerError };
                }

                // Success
                if (result is ResponseViewModel)
                {
                    ((ResponseViewModel)result).Success = true;
                    return new ObjectResult(result)
                    { StatusCode = (int)statusCode };
                }
            }

            response.Success = true;

            return new ObjectResult(response)
            { StatusCode = (int)statusCode };
        }

        /// <summary>
        ///     Obtém o registro cujo ID (Primary Key) é o passado como parâmetro.
        /// </summary>
        [HttpGet("{id}")]
        public virtual IActionResult Get(int id)
        {
            try
            {
                var item = this.appService.GetById(id);
                return this.Response(item);
            }
            catch (ArtException emx)
            {
                return this.Response(emx);
            }
            catch (Exception ex)
            {
                return this.Response(ex);
            }
        }

        /// <summary>
        ///     Obtém todos os registros.
        /// </summary>
        [HttpGet]
        public virtual IActionResult Get(TFilter filter)
        {
            try
            {
                var results = this.appService.GetBy(filter);
                return this.Response(results);
            }
            catch (ArtException emx)
            {
                return this.Response(emx);
            }
            catch (Exception ex)
            {
                return this.Response(ex);
            }
        }

        /// <summary>
        ///     Obtém todos os registros.
        /// </summary>
        [HttpGet("all")]
        public virtual IActionResult Get()
        {
            try
            {
                var results = this.appService.GetAll();
                return this.Response(results);
            }
            catch (ArtException emx)
            {
                return this.Response(emx);
            }
            catch (Exception ex)
            {
                return this.Response(ex);
            }
        }

        [HttpPost]
        public virtual IActionResult Post([FromBody] TViewModel obj)
        {
            try
            {
                var _added = this.appService.Add(obj);
                return this.Response(_added, HttpStatusCode.Created, Messages.SaveSuccess);
            }
            catch (ArtException emx)
            {
                return this.Response(emx);
            }
            catch (Exception ex)
            {
                return this.Response(ex);
            }
        }

        [HttpPut]
        public virtual IActionResult Put([FromBody] TViewModel obj)
        {
            try
            {
                this.appService.Update(obj);
                return this.Response(obj, HttpStatusCode.OK, Messages.UpdateSuccess);
            }
            catch (ArtException emx)
            {
                return this.Response(emx);
            }
            catch (Exception ex)
            {
                return this.Response(ex);
            }
        }

        [HttpDelete("{id}")]
        public virtual IActionResult Delete(int id)
        {
            try
            {
                this.appService.Remove(id);
                return this.Response(id, HttpStatusCode.OK, Messages.DeleteSuccess);
            }
            catch (ArtException emx)
            {
                return this.Response(emx);
            }
            catch (Exception ex)
            {
                return this.Response(ex);
            }
        }
    }
}
