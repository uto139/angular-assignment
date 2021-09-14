﻿using Enigmatry.Blueprint.Model.Products.Commands;
using Enigmatry.BuildingBlocks.AspNetCore;
using Enigmatry.BuildingBlocks.Core.Data;
using Enigmatry.BuildingBlocks.Core.Paging;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Net.Mime;
using System.Threading.Tasks;

namespace Enigmatry.Blueprint.Api.Features.Products
{
    [Produces(MediaTypeNames.Application.Json)]
    [Route("[controller]")]
    public class ProductsController : Controller
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMediator _mediator;

        public ProductsController(IUnitOfWork unitOfWork, IMediator mediator)
        {
            _unitOfWork = unitOfWork;
            _mediator = mediator;
        }

        /// <summary>
        ///     Gets listing of all available users
        /// </summary>
        /// <returns>List of products</returns>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<PagedResponse<GetProducts.Response.Item>>> Search([FromQuery] GetProducts.Request query)
        {
            var response = await _mediator.Send(query);
            return response.ToActionResult();
        }

        /// <summary>
        ///     Get product for given id
        /// </summary>
        /// <param name="id">Id</param>
        [HttpGet]
        [Route("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<GetProductDetails.Response>> Get(Guid id)
        {
            var response = await _mediator.Send(new GetProductDetails.Request { Id = id });
            return response.ToActionResult();
        }

        /// <summary>
        ///     Return true if product code is unique
        /// </summary>
        /// <param name="code">Code</param>
        [HttpGet]
        [Route("code-unique/{code}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<GetProductCodeUniquenes.Response>> IsCodeUnique(string code)
        {
            var response = await _mediator.Send(new GetProductCodeUniquenes.Request { Code = code });
            return response.ToActionResult();
        }

        /// <summary>
        ///  Creates or updates
        /// </summary>
        /// <param name="command">Product data</param>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ProductCreateOrUpdate.Result>> Post(ProductCreateOrUpdate.Command command)
        {
            var result = await _mediator.Send(command);
            await _unitOfWork.SaveChangesAsync();
            return result;
        }
    }
}