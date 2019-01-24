namespace Art.Application.Services
{
    using global::AutoMapper;
    using global::AutoMapper.QueryableExtensions;
    using Art.Application.Filters;
    using Art.Application.Interfaces;
    using Art.Application.ViewModels;
    using Art.Domain.Interfaces;
    using Art.Domain.Models;
    using Art.Infra.CrossCutting.Core.Messages;
    using System;
    using System.Collections.Generic;
    using System.Linq;

    public abstract class BaseAppService<TViewModel, TFilter, TEntity> : IBaseAppService<TViewModel, TFilter, TEntity>
        where TViewModel : BaseViewModel
        where TFilter : BaseFilter
        where TEntity : BaseEntity
    {
        protected readonly IMapper mapper;
        protected readonly IUnitOfWork uow;
        protected readonly IBaseRepository<TEntity> repository;

        public BaseAppService(
            IUnitOfWork uow,
            IMapper mapper,
            IBaseRepository<TEntity> repository)
        {
            this.uow = uow;
            this.mapper = mapper;
            this.repository = repository;
        }

        /// <summary>
        ///     Obtém todos os registros.
        /// </summary>
        /// <returns>
        ///     Todos os registros do banco de dados.
        /// </returns>
        public virtual IEnumerable<TViewModel> GetAll()
        {
            var results = this.repository.GetAll();
            return results.ProjectTo<TViewModel>();
        }

        /// <summary>
        ///     Obtém o registro cujo ID é o passado como parâmetro.
        /// </summary>
        public virtual TViewModel GetById(int id)
        {
            var result = this.repository.GetBy(c => c.Id == id).FirstOrDefault();
            return this.mapper.Map<TViewModel>(result);
        }

        /// <summary>
        ///     Obtém os registros utilizando o filtro utilizado no parâmetro.
        /// </summary>
        public virtual IEnumerable<TViewModel> GetBy(TFilter filter)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        ///     Obtém os registros utilizando a expressão utilizada no parâmetro.
        /// </summary>
        public virtual IEnumerable<TViewModel> GetBy(Func<TEntity, bool> expression)
        {
            var results = this.repository.GetBy(expression).ToList();
            return this.mapper.Map<IEnumerable<TViewModel>>(results);
        }

        /// <summary>
        ///     Salva o registro passado como parâmetro.
        /// </summary>
        public virtual TViewModel Add(TViewModel model, bool commit = true)
        {
            var entity = this.mapper.Map<TEntity>(model);
            this.repository.Add(entity);

            this.Commit(commit);

            model.Id = entity.Id;

            return model;
        }

        /// <summary>
        ///     Atualiza o registro passado como parâmetro.
        /// </summary>
        public virtual void Update(TViewModel model, bool commit = true)
        {
            if (model.Id == 0)
            {
                throw new ArtException(Messages.NotFound);
            }

            var entity = this.mapper.Map<TEntity>(model);
            this.repository.Update(entity);
            this.Commit(commit);
        }

        /// <summary>
        ///     Remove o registro que possui o identificador passado no parâmetro.
        /// </summary>
        public virtual void Remove(int id, bool commit = true)
        {
            var entity = this.repository.GetById(id);
            if (entity == null)
            {
                throw new ArtException(Messages.NotFound);
            }

            this.repository.Remove(id);
            this.Commit(commit);
        }

        public virtual void Commit(bool commit)
        {
            if (commit)
            {
                this.uow.Commit();
            }
        }

        /// <summary>
        ///     Desaloca os recursos de Cidade Application Service usando o Garbage Collector.
        /// </summary>
        public virtual void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
