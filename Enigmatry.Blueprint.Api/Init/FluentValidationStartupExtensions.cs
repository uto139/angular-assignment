﻿using Enigmatry.Blueprint.Api.Resources;
using Enigmatry.Blueprint.Infrastructure.Validation;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace Enigmatry.Blueprint.Api.Init
{
    public static class FluentValidationStartupExtensions
    {
        public static void AppConfigureFluentValidation(this IApplicationBuilder app)
        {
            ValidatorOptions.PropertyNameResolver = CamelCasePropertyNameResolver.ResolvePropertyName;
            ValidatorOptions.DisplayNameResolver =
                LocalizedDisplayNameResolver.ResolveDisplayName(Localization_SharedResource.ResourceManager);
        }

        public static void AppAddFluentValidationApiBehaviorOptions(this ApiBehaviorOptions options)
        {
            options.InvalidModelStateResponseFactory = context =>
                context.HttpContext.CreateValidationProblemDetailsResponse(context.ModelState);
        }

        public static IMvcBuilder AppAddFluentValidation(this IMvcBuilder mvcBuilder)
        {
            return mvcBuilder.AddFluentValidation(fv =>
            {
                // disables standard data annotations validation
                // https://fluentvalidation.net/aspnet.html#asp-net-core
                fv.RunDefaultMvcValidationAfterFluentValidationExecutes = false;
                fv.ImplicitlyValidateChildProperties = true;
                fv.RegisterValidatorsFromAssemblies(new[]
                {
                    AssemblyFinder.DomainAssembly, AssemblyFinder.ApiAssembly
                });
            });
        }
    }
}
