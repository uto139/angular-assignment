﻿using Enigmatry.Blueprint.Infrastructure.MediatR;
using MediatR;
using MediatR.Pipeline;
using Microsoft.Extensions.DependencyInjection;

namespace Enigmatry.Blueprint.Api.Init
{
    public static class MediatRStartupExtensions
    {
        public static void AppAddMediatR(this IServiceCollection services)
        {
            services.AddScoped(typeof(IPipelineBehavior<,>), typeof(LoggingBehavior<,>));
            services.AddScoped(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));
            services.AddScoped(typeof(IRequestPreProcessor<>), typeof(SamplePreRequestBehavior<>));
            services.AddScoped(typeof(IRequestPostProcessor<,>), typeof(SamplePostRequestBehavior<,>));
            
            services.AddMediatR(
                AssemblyFinder.ApiAssembly,
                AssemblyFinder.DomainAssembly,
                AssemblyFinder.ApplicationServicesAssembly);
        }
    }
}