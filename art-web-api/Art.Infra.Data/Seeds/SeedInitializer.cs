namespace Art.Infra.Data.Seeds
{
    public class SeedInitializer
    {
        private UnidadeMedidaInitializer unidademedidaInitializer;

        public SeedInitializer(UnidadeMedidaInitializer unidademedidaInitializer)
        {
            this.unidademedidaInitializer = unidademedidaInitializer;
        }

        public void Seed()
        {
            this.unidademedidaInitializer.Seed().Wait();
        }
    }
}
