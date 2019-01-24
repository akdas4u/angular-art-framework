namespace Monli.Domain.Core.Bus
{
    using System.Threading.Tasks;
    using Monli.Domain.Core.Commands;
    using Monli.Domain.Core.Events;

    public interface IMediatorHandler
    {
        Task SendCommand<T>(T command)
            where T : Command;

        Task RaiseEvent<T>(T @event)
            where T : Event;
    }
}