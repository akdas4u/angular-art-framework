namespace Monli.Domain.Core.Models
{
    using System;

    public abstract class BaseEntity
    {
        public BaseEntity()
        {
            this.SetarDataCriacao();
            this.SetarAtivo(true);
        }

        /// <summary>
        ///     A identidade da classe.
        /// </summary>
        public int Id { get; protected set; }

        /// <summary>
        ///     Data de criação do registro no banco de dados.
        /// </summary>
        public DateTime CriadoEm { get; protected set; }

        /// <summary>
        ///     Seta a Data de Criação do registro.
        /// </summary>
        public void SetarDataCriacao()
        {
            this.CriadoEm = DateTime.Now;
        }

        /// <summary>
        ///     Indicador se a entidade está ativo ou desativado.
        /// </summary>
        public bool Ativo { get; protected set; }

        /// <summary>
        ///     Seta o status de ativo do registro.
        /// </summary>
        public void SetarAtivo(bool ativo)
        {
            this.Ativo = ativo;
        }

        public override bool Equals(object obj)
        {
            var compareTo = obj as BaseEntity;

            if (ReferenceEquals(this, compareTo))
            {
                return true;
            }

            if (ReferenceEquals(null, compareTo))
            {
                return false;
            }

            return this.Id.Equals(compareTo.Id);
        }

        public static bool operator ==(BaseEntity a, BaseEntity b)
        {
            if (ReferenceEquals(a, null) && ReferenceEquals(b, null))
            {
                return true;
            }

            if (ReferenceEquals(a, null) || ReferenceEquals(b, null))
            {
                return false;
            }

            return a.Equals(b);
        }

        public static bool operator !=(BaseEntity a, BaseEntity b)
        {
            return !(a == b);
        }

        public override int GetHashCode()
        {
            return (this.GetType().GetHashCode() * 907) + this.Id.GetHashCode();
        }

        public override string ToString()
        {
            return this.GetType().Name + " [Id=" + this.Id + "]";
        }
    }
}
