using Enigmatry.AngularAssignment.Api.Features.Users;

namespace Enigmatry.AngularAssignment.Api.Services.Users;

public class UserService
{
    public async Task<GetProfile.Response> GetProfile() 
    {
        return new GetProfile.Response();
    }
}
