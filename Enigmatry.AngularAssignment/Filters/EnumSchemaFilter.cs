using Microsoft.OpenApi.Any;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace Enigmatry.AngularAssignment.Api.Filters;

public class EnumSchemaFilter : ISchemaFilter
{
    public void Apply(OpenApiSchema schema, SchemaFilterContext context)
    {
        var type = context.Type;

        // Check if the type is an enum
        if (type.IsEnum)
        {
            // Create a new OpenApiArray to hold the enum names
            var enumNames = new OpenApiArray();

            // Add each enum name to the OpenApiArray
            foreach (var name in type.GetEnumNames())
            {
                enumNames.Add(new OpenApiString(name));
            }

            // Add the x-enumNames extension to the schema
            schema.Extensions.Add("x-enumNames", enumNames);
        }
    }
}
