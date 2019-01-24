namespace Art.Application.ViewModels
{
    using System;
    using System.ComponentModel;
    using System.ComponentModel.DataAnnotations;

    public abstract class BaseViewModel
    {
        /// <summary>
        ///     A identidade do registro.
        /// </summary>
        [Key]
        public int Id { get; set; }

        /// <summary>
        ///     Indica a data de criação do registro.
        /// </summary>
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:yyyy-MM-dd}")]
        [DataType(DataType.Date, ErrorMessage = "Formato de data inválido")]
        [DisplayName("Criado Em")]
        public DateTime CriadoEm { get; set; }

        /// <summary>
        ///     Indica se o registro está ativo.
        /// </summary>
        [DisplayName("Ativo")]
        public bool Ativo { get; set; }
    }
}
