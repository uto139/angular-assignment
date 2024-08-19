using Enigmatry.AngularAssignment.Models;
using System.Linq;

namespace Enigmatry.AngularAssignment.Api.Services;

public class BlogService
{
    private readonly List<BlogPost> _blogPosts;

    public BlogService(List<BlogPost> blogPosts)
    {
        _blogPosts = blogPosts;
    }

    public Task<List<BlogPost>> GetBlogPosts() => Task.FromResult(_blogPosts);

    public Task Create(BlogPost blogPost)
    {
        _blogPosts.Add(blogPost);
        return Task.CompletedTask;
    }

    public Task Delete(Guid blogPostId)
    {
        var blogPost = _blogPosts.SingleOrDefault(x => x.Id == blogPostId);
        if (blogPost != null)
        {
            _blogPosts.Remove(blogPost);
        }
        return Task.CompletedTask;
    }

    public Task Update(BlogPost blogPost)
    {
        var existingPost = _blogPosts.SingleOrDefault(x => x.Id == blogPost.Id);
        if (existingPost != null)
        {
            existingPost.Title = blogPost.Title;
            existingPost.Text = blogPost.Text;
            existingPost.Categories = blogPost.Categories;
        }
        return Task.CompletedTask;
    }
}
