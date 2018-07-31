﻿using Enigmatry.Blueprint.Model.Auditing;

namespace Enigmatry.Blueprint.Model.Identity
{
    public class UserCreatedDomainEvent : AuditableDomainEvent
    {
        public UserCreatedDomainEvent(string userName) : base("UserCreated")
        {
            UserName = userName;
        }

        public string UserName { get; }

        public override object AuditPayload => new {UserName};
    }
}