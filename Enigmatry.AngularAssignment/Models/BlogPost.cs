using Enigmatry.AngularAssignment.Api.Models;

namespace Enigmatry.AngularAssignment.Models;

public class BlogPost
{
    public Guid Id { get; set; }
    public string Title { get; set; } = String.Empty;
    public string Text { get; set; } = String.Empty;

    public byte[] MainImage { get; set; }
    public List<byte[]> AttachmentImages { get; set; }
    public DateTimeOffset CreatedOn { get; } = DateTimeOffset.Now;

    public IEnumerable<BlogPostCategory> Categories { get; set; } = Enumerable.Empty<BlogPostCategory>();
}
