namespace Monli.Domain.Core.Notifications
{
    using System.Collections.Generic;
    using System.Linq;
    using MediatR;

    public class DomainNotificationHandler : INotificationHandler<DomainNotification>
    {
        private List<DomainNotification> notifications;

        public DomainNotificationHandler()
        {
            this.notifications = new List<DomainNotification>();
        }

        public void Handle(DomainNotification message)
        {
            this.notifications.Add(message);
        }

        public virtual List<DomainNotification> GetNotifications()
        {
            return this.notifications;
        }

        public virtual bool HasNotifications()
        {
            return this.GetNotifications().Any();
        }

        public void Dispose()
        {
            this.notifications = new List<DomainNotification>();
        }
    }
}