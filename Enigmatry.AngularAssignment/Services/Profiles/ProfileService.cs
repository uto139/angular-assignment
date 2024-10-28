using Enigmatry.AngularAssignment.Api.Features.Profiles;

namespace Enigmatry.AngularAssignment.Api.Services.Profiles;

public class ProfileService
{
    public async Task<GetProfile.Response> GetProfile()
    {
        return new GetProfile.Response()
        {
            UserId = Guid.NewGuid(),
            Email = "u.totovic@enigmatry.com",
            Name = "Uros Totovic",
        };
    }
}
