using Enigmatry.AngularAssignment.Api.Models.BlogPosts;
using Enigmatry.AngularAssignment.Api.Services.BlogPosts;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mime;

namespace Enigmatry.AngularAssignment.Api.Features.BlogPosts
{
    [Produces(MediaTypeNames.Application.Json)]
    [Route("api/[controller]")]
    public class BlogPostsController : ControllerBase
    {
        private readonly ILogger<BlogPostsController> _logger;
        private readonly BlogPostService _blogService;

        public BlogPostsController(ILogger<BlogPostsController> logger, BlogPostService blogService)
        {
            _logger = logger;
            _blogService = blogService;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<List<GetBlogPosts.Response>>> GetAll()
        {
            var blogPosts = await _blogService.GetAll();
            return Ok(blogPosts);
        }

        [HttpGet("search")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<List<GetBlogPosts.Response>>> Search([FromQuery] string? keyword)
        {
            var blogPosts = await _blogService.Search(keyword);
            return Ok(blogPosts);
        }

        [HttpGet("get-by-id")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<GetBlogPosts.Response>> Get()
        {
            var blogPosts = await _blogService.GetAll();
            return Ok(blogPosts.FirstOrDefault());
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> CreateOrUpdate([FromBody] BlogPost blogPost)
        {
            if (blogPost == null)
            {
                return BadRequest();
            }

            await _blogService.CreateOrUpdate(blogPost);
            return CreatedAtAction(nameof(Get), new { id = blogPost.Id }, blogPost);
        }

        [HttpDelete("{id:guid}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> Delete(Guid id)
        {
            var blogPost = await _blogService.GetAll();
            if (blogPost.All(x => x.Id != id))
            {
                return NotFound();
            }

            await _blogService.Delete(id);
            return NoContent();
        }
    }
}
