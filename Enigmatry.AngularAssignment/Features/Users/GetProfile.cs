using AutoMapper;
using Enigmatry.AngularAssignment.Api.Models.BlogPosts;
using Enigmatry.AngularAssignment.Api.Models.Users;
using JetBrains.Annotations;

namespace Enigmatry.AngularAssignment.Api.Features.Users;

public static class GetProfile
{
    public class Request 
    {
    }

    public class Response 
    {
        public Guid UserId { get; set; } = Guid.NewGuid();
        public string Name { get; set; } = String.Empty;
        public string Email { get; set; } = String.Empty;
    }

    [UsedImplicitly]
    public class MappingProfile : Profile
    {
        public MappingProfile() => CreateMap<User, Response>();
    }
}
