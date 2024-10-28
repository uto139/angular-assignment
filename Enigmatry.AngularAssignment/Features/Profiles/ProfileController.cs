using Enigmatry.AngularAssignment.Api.Services.Profiles;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mime;

namespace Enigmatry.AngularAssignment.Api.Features.Profiles;

[Produces(MediaTypeNames.Application.Json)]
[Route("api/[controller]")]
public class ProfileController : ControllerBase
{
    private readonly ProfileService _service;

    public ProfileController(ProfileService service)
    {
        _service = service;
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<GetProfile.Response>> GetProfile()
    {
        var response = await _service.GetProfile();
        return Ok(response);
    }
}
