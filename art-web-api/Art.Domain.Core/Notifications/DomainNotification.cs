namespace Monli.Domain.Core.Notifications
{
    using System;
    using Monli.Domain.Core.Events;

    public class DomainNotification : Event
    {
        public DomainNotification(string key, string value)
        {
            this.DomainNotificationId = Guid.NewGuid();
            this.Version = 1;
            this.Key = key;
            this.Value = value;
        }

        public Guid DomainNotificationId { get; private set; }

        public string Key { get; private set; }

        public string Value { get; private set; }

        public int Version { get; private set; }
    }
}