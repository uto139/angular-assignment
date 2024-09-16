namespace Enigmatry.AngularAssignment.Api.Models.Users;

public class User
{
    public Guid UserId { get; set; } = Guid.NewGuid();  
    public string Name { get; set; }
    public string Email { get; set; }
}
