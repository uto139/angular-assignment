namespace Enigmatry.AngularAssignment.Api.Models.BlogPosts;

public static class BlogPostsEnumerableExtensions
{
    public static IEnumerable<BlogPost> QueryByKeyword(this IEnumerable<BlogPost> query, string? keyword) =>
    !String.IsNullOrEmpty(keyword)
        ? query.Where(e => e.Title.Contains(keyword, StringComparison.OrdinalIgnoreCase) || e.Text.Contains(keyword,StringComparison.OrdinalIgnoreCase))
        : query;

    public static IEnumerable<BlogPost> QueryByCategory(this IEnumerable<BlogPost> query, BlogPostCategory? category) =>
    category != null
        ? query.Where(e => e.Categories.Contains((BlogPostCategory)category))
        : query;
}
