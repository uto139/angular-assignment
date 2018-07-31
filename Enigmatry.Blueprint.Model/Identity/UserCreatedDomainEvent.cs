﻿using MediatR;

namespace Enigmatry.Blueprint.Model.Identity
{
    public class UserCreatedDomainEvent : INotification
    {
        public UserCreatedDomainEvent(string userName)
        {
            UserName = userName;
        }

        public string UserName { get; }
    }

    public class UserUpdatedDomainEvent : INotification
    {
        public UserUpdatedDomainEvent(string userName)
        {
            UserName = userName;
        }

        public string UserName { get; }
    }
}