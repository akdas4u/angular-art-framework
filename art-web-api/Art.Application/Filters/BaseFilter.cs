namespace Art.Application.Filters
{
    using Art.Domain.Interfaces;

    public class BaseFilter : IFilter
    {
        public int? Id { get; set; }
        public bool? Ativo { get; set; }
        public int? PageNumber { get; set; }
        public int? PageSize { get; set; }
        public bool HasPagination { get; set; }
        public string SortBy { get; set; }
        public string SortDirection { get; set; }
    }
}
