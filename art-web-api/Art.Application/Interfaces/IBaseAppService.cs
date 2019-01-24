namespace Art.Application.Interfaces
{
    using Art.Application.Filters;
    using Art.Application.ViewModels;
    using Art.Domain.Models;
    using System;
    using System.Collections.Generic;

    public interface IBaseAppService<TViewModel, TFilter, TEntity> : IDisposable
        where TViewModel : BaseViewModel
        where TFilter : BaseFilter
        where TEntity : BaseEntity
    {
        /// <summary>
        ///     Obtém todos os registros.
        /// </summary>
        /// <returns>
        ///     Todos os registros do banco de dados.
        /// </returns>
        IEnumerable<TViewModel> GetAll();

        /// <summary>
        ///     Obtém o registro cujo ID é o passado como parâmetro.
        /// </summary>
        TViewModel GetById(int id);

        /// <summary>
        ///     Obtém os registros utilizando o filtro utilizado no parâmetro.
        /// </summary>
        IEnumerable<TViewModel> GetBy(TFilter filter);

        /// <summary>
        ///     Obtém os registros utilizando a expressão utilizada no parâmetro.
        /// </summary>
        IEnumerable<TViewModel> GetBy(Func<TEntity, bool> expression);

        // IEnumerable<TViewModel> GetBy(Expression<Func<TEntity, bool>> expression, IPager pager);

        /// <summary>
        ///     Salva o registro passado como parâmetro.
        /// </summary>
        TViewModel Add(TViewModel model, bool commit = true);

        /// <summary>
        ///     Atualiza o registro passado como parâmetro.
        /// </summary>
        void Update(TViewModel model, bool commit = true);

        /// <summary>
        ///     Remove o registro que possui o identificador passado no parâmetro.
        /// </summary>
        void Remove(int id, bool commit = true);
    }
}
