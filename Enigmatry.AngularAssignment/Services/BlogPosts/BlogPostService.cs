using AutoMapper;
using Enigmatry.AngularAssignment.Api.Features.BlogPosts;
using Enigmatry.AngularAssignment.Api.Models.BlogPosts;

namespace Enigmatry.AngularAssignment.Api.Services.BlogPosts;
public class BlogPostService
{
    private readonly List<BlogPost> _blogPosts;
    private readonly IMapper _mapper;

    public BlogPostService(List<BlogPost> blogPosts, IMapper mapper)
    {
        _blogPosts = blogPosts;
        _mapper = mapper;
    }

    public Task<List<GetBlogPosts.Response>> GetAll()
    {
        var blogPosts = _mapper.Map<List<BlogPost>, List<GetBlogPosts.Response>>(_blogPosts).OrderByDescending(x => x.CreatedOn).ToList();
        return Task.FromResult(blogPosts);
    }

    public Task<List<GetBlogPosts.Response>> Search(string? keyword, BlogPostCategory? category)
    {
        var blogPosts = _blogPosts
            .QueryByKeyword(keyword)
            .QueryByCategory(category)
            .ToList();

        var result = _mapper.Map<List<BlogPost>, List<GetBlogPosts.Response>>(blogPosts);
        return Task.FromResult(result);
    }

    public Task CreateOrUpdate(BlogPost blogPost)
    {
        var existingPost = _blogPosts.SingleOrDefault(x => x.Id == blogPost.Id);
        if (existingPost != null)
        {
            existingPost.Title = blogPost.Title;
            existingPost.Text = blogPost.Text;
            existingPost.Categories = blogPost.Categories;
        }
        else
        {
            blogPost.Id = Guid.NewGuid();
            _blogPosts.Add(blogPost);
        }
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
}
