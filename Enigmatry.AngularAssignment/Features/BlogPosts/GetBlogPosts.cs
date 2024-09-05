using AutoMapper;
using Enigmatry.AngularAssignment.Api.Models;
using Enigmatry.AngularAssignment.Models;
using JetBrains.Annotations;
using static System.Runtime.InteropServices.JavaScript.JSType;
using String = System.String;

namespace Enigmatry.AngularAssignment.Api.Features.BlogPosts;

public static class GetBlogPosts
{
    [PublicAPI]
    public class Request
    {
        public Guid Id { get; set; }
    }

    [PublicAPI]
    public class Response
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = String.Empty;
        public string Text { get; set; } = String.Empty;

        public byte[] MainImage { get; set; }
        public List<byte[]> AttachmentImages { get; set; }
        public DateTimeOffset CreatedOn { get; } = DateTimeOffset.Now;

        public IEnumerable<BlogPostCategory> Categories { get; set; } = Enumerable.Empty<BlogPostCategory>();
    }

    [UsedImplicitly]
    public class MappingProfile : Profile
    {
        public MappingProfile() => CreateMap<BlogPost, Response>();
    }
}

