﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Enigmatry.Blueprint.Core.Data;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Enigmatry.Blueprint.Api.Filters
{
    public class TransactionFilterAttribute : ActionFilterAttribute
    {
        public override async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            ActionExecutedContext resultContext = await next(); 

            var unitOfWork = context.HttpContext.Resolve<IUnitOfWork>();

            if (resultContext.Exception == null &&
                context.HttpContext.Response.StatusCode >= 200 &&
                context.HttpContext.Response.StatusCode < 300)
                if (context.ModelState.IsValid)
                    await unitOfWork.SaveChangesAsync();
        }
    }
}