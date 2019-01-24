namespace Art.Infra.Data.Seeds
{
    using Art.Domain.Models;
    using Art.Infra.Data.Context;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    public class UnidadeMedidaInitializer
    {
        private ArtContext context;
        private ICollection<UnidadeMedida> unidademedidas;

        public UnidadeMedidaInitializer(ArtContext context)
        {
            this.context = context;
        }

        public async Task Seed()
        {
            this.unidademedidas = this.Generate();

            var allUnidadeMedidas = this.context.UnidadeMedidas.ToList();
            foreach (var unidademedida in this.unidademedidas)
            {
                if (!allUnidadeMedidas.Any(c => c.Abreviacao.ToLowerCase() == unidademedida.Abreviacao.ToLowerCase()))
                {
                    this.context.Add(unidademedida);
                }
            }

            await this.context.SaveChangesAsync();
        }

        private ICollection<UnidadeMedida> Generate()
        {
            var unidademedidas = new List<UnidadeMedida>
            {
                new UnidadeMedida("Litro", "L"),
                new UnidadeMedida("Mililitro", "mL"),
                new UnidadeMedida("Quilograma", "Kg"),
                new UnidadeMedida("Miligrama", "mg"),
                new UnidadeMedida("Grama", "g"),
                new UnidadeMedida("Xícara de Chá", "xíc"),
                new UnidadeMedida("Xícara de Café", "xcf"),
                new UnidadeMedida("Colher de Sopa", "csp"),
                new UnidadeMedida("Colher de Chá", "cch"),
                new UnidadeMedida("Colher de Sobremesa", "csb"),
                new UnidadeMedida("Colher de Café", "ccf"),
                new UnidadeMedida("Unidade", "uni"),
                new UnidadeMedida("Copo", "cp"),
                new UnidadeMedida("Peça", "pç"),
                new UnidadeMedida("Pacote", "pc")
            };

            return unidademedidas.OrderBy(um => um.Descricao).ToList();
        }
    }
}
