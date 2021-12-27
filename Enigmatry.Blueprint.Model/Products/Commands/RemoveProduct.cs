﻿using Enigmatry.BuildingBlocks.Core.Data;
using JetBrains.Annotations;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Enigmatry.Blueprint.Model.Products.Commands
{
    public static class RemoveProduct
    {
        [PublicAPI]
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }

        [UsedImplicitly]
        public class RequestHanlder : IRequestHandler<Command>
        {
            private readonly IRepository<Product> _repository;

            public RequestHanlder(IRepository<Product> repository)
            {
                _repository = repository;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var product = await _repository.FindByIdAsync(request.Id);

                if (product == null)
                {
                    throw new InvalidOperationException("Product could not be found");
                }

                _repository.Delete(product);

                return Unit.Task.Result;
            }
        }
    }
}