using Enigmatry.AngularAssignment.Api.Filters;

namespace Enigmatry.AngularAssignment.Api;

public static class ProgramExtensions
{
    public static void AddSwagger(this IServiceCollection services)
    {
        services.AddSwaggerGen(options =>
        {
            options.CustomSchemaIds(type =>
            {
                if (type.IsNested)
                {
                    var outerClassName = type.DeclaringType.Name;
                    var nestedClassName = type.Name;
                    return $"{outerClassName}{nestedClassName}";
                }
                else
                {
                    return type.Name;
                }
            });

            options.SchemaFilter<EnumSchemaFilter>();

            options.CustomOperationIds(apiDesc =>
            {
                return $"{apiDesc.ActionDescriptor.RouteValues["controller"]}_{apiDesc.ActionDescriptor.RouteValues["action"]}";
            });
        });
    }
}
