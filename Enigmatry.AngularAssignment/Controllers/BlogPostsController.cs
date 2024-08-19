using Enigmatry.AngularAssignment.Api.Services;
using Enigmatry.AngularAssignment.Models;
using Microsoft.AspNetCore.Mvc;

namespace Enigmatry.AngularAssignment.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BlogPostsController : ControllerBase
    {
        private readonly ILogger<BlogPostsController> _logger;
        private readonly BlogService _blogService;

        public BlogPostsController(ILogger<BlogPostsController> logger, BlogService blogService)
        {
            _logger = logger;
            _blogService = blogService;
        }

        [HttpGet]
        [ProducesResponseType(typeof(List<BlogPost>), StatusCodes.Status200OK)]
        public async Task<ActionResult<List<BlogPost>>> Get()
        {
            var blogPosts = await _blogService.GetBlogPosts();
            return Ok(blogPosts);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Create([FromBody] BlogPost blogPost)
        {
            if (blogPost == null)
            {
                return BadRequest();
            }

            await _blogService.Create(blogPost);
            return CreatedAtAction(nameof(Get), new { id = blogPost.Id }, blogPost);
        }

        [HttpPut("{id:guid}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Update(Guid id, [FromBody] BlogPost blogPost)
        {
            if (id != blogPost.Id)
            {
                return BadRequest("ID mismatch");
            }

            await _blogService.Update(blogPost);
            return NoContent();
        }

        [HttpDelete("{id:guid}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> Delete(Guid id)
        {
            var blogPost = await _blogService.GetBlogPosts();
            if (blogPost.All(x => x.Id != id))
            {
                return NotFound();
            }

            await _blogService.Delete(id);
            return NoContent();
        }
    }
}
