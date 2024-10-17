namespace Enigmatry.AngularAssignment.Api.Models.BlogPosts;

public class BlogPost
{
    public Guid Id { get; set; }
    public string Title { get; set; } = String.Empty;
    public string Text { get; set; } = String.Empty;

    public DateTimeOffset CreatedOn { get; } = DateTimeOffset.Now;

    public IEnumerable<BlogPostCategory> Categories { get; set; } = Enumerable.Empty<BlogPostCategory>();
}
