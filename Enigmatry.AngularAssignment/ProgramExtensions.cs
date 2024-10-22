using Enigmatry.AngularAssignment.Api.Filters;
using Enigmatry.AngularAssignment.Api.Models.BlogPosts;

namespace Enigmatry.AngularAssignment.Api;

public static class ProgramExtensions
{
    public static void AddBlogPosts(this IServiceCollection services) => services.AddSingleton(SeedBlogPosts());

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

    private static List<BlogPost> SeedBlogPosts() =>
        new()
        {
            new BlogPost
            {
                Id = Guid.NewGuid(),
                Categories = new[] { BlogPostCategory.Marketing, BlogPostCategory.Service },
                Title = "Blog 3",
                Text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            },
            new BlogPost
            {
                Id = Guid.NewGuid(),
                Categories = new[] { BlogPostCategory.Service },
                Title = "Blog 2",
                Text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            },
            new BlogPost
            {
                Id = Guid.NewGuid(),
                Categories = new[] { BlogPostCategory.Sales, BlogPostCategory.Website },
                Title = "Blog 1",
                Text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            },
    };
};
