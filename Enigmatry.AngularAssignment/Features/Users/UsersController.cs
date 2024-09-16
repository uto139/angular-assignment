﻿using Enigmatry.AngularAssignment.Api.Services.Users;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mime;

namespace Enigmatry.AngularAssignment.Api.Features.Users;

[Produces(MediaTypeNames.Application.Json)]
[Route("[controller]")]
public class UsersController : ControllerBase
{
    private readonly UserService _service;

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<GetProfile.Response>> GetProfile()
    {
        var response = await _service.GetProfile();
        return Ok(response);
    }
}
