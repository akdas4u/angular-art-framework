namespace Art.Domain.Interfaces
{
    public interface IFilter
    {
        int? PageNumber { get; set; }
        int? PageSize { get; set; }
    }
}
