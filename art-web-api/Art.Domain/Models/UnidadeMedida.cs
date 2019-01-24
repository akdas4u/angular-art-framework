namespace Art.Domain.Models
{
    using System;

    /// <summary>
    ///     Entidade UnidadeMedida.
    /// </summary>
    public class UnidadeMedida : BaseEntity
    {
        #region Construtores

        /// <summary>
        ///     Initializes a new instance of the <see cref="UnidadeMedida"/> class.
        ///     Contrutor vazio utilizado pelo EntityFramework.
        /// </summary>
        public UnidadeMedida()
            : base()
        {
        }

        public UnidadeMedida(string descricao, string abreviacao)
        {
            this.Descricao = descricao.ToTitleCase();
            this.Abreviacao = abreviacao;
        }

        #endregion Construtores

        #region Propriedades

        /// <summary>
        ///     Descrição da unidade de medida.
        /// </summary>
        /// <example>
        ///     Quilos, Litros
        /// </example>
        public string Descricao { get; set; }

        /// <summary>
        ///     Abreviatura da unidade de medida
        /// </summary>
        /// <example>
        ///     KG, L
        /// </example>
        public string Abreviacao { get; set; }
       
        #endregion Propriedades
    }
}
