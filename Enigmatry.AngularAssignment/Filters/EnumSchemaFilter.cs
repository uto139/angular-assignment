using Microsoft.OpenApi.Any;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace Enigmatry.AngularAssignment.Api.Filters;

public class EnumSchemaFilter : ISchemaFilter
{
    public void Apply(OpenApiSchema schema, SchemaFilterContext context)
    {
        var type = context.Type;

        if (type.IsEnum)
        {
            var enumNames = new OpenApiArray();

            foreach (var name in type.GetEnumNames())
            {
                enumNames.Add(new OpenApiString(name));
            }
            schema.Extensions.Add("x-enumNames", enumNames);
        }
    }
}
