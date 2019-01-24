namespace Monli.Domain.Core.Models
{
    using System;

    public class LogEntity
    {
        public LogEntity(DateTime createdDate)
        {
            this.CriadoEm = createdDate;
        }

        public LogEntity()
        {
            this.CriadoEm = DateTime.Now;
        }

        public int Id { get; protected set; }

        public DateTime CriadoEm { get; private set; }
    }
}
