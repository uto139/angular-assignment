﻿using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using Enigmatry.Blueprint.Api.Models;
using FluentAssertions;
using FluentAssertions.Execution;
using FluentAssertions.Primitives;
using Microsoft.EntityFrameworkCore.Internal;
using Newtonsoft.Json;

namespace Enigmatry.Blueprint.Api.Tests
{
    public class HttpResponseAssertions: ReferenceTypeAssertions<HttpResponseMessage, HttpResponseAssertions>
    {
        protected override string Identifier => "HttpResponse";

        public HttpResponseAssertions(HttpResponseMessage value)
        {
            Subject = value;
        }

        public AndConstraint<HttpResponseAssertions> BeBadRequest(string because = "",
            params object[] becauseArgs)
        {
            return HaveStatusCode(HttpStatusCode.BadRequest, because, becauseArgs);
        }

        public AndConstraint<HttpResponseAssertions> HaveStatusCode(HttpStatusCode expected, string because = "",
            params object[] becauseArgs)
        {
            AssertionScope assertion = Execute.Assertion;
            AssertionScope assertionScope = assertion.ForCondition(Subject.StatusCode == expected).BecauseOf(because, becauseArgs);
            string message = "Expected response to have HttpStatusCode {0}{reason}, but found {1}.";
            object[] failArgs = {
                expected,
                Subject.StatusCode
            };
            assertionScope.FailWith(message, failArgs);
            return new AndConstraint<HttpResponseAssertions>(this);
        }

        public AndConstraint<HttpResponseAssertions> ContainValidationErrorForField(string expectedKey, string expectedMessage = "", string because = "", params object[] becauseArgs)
        {
            var responseContent = Subject.Content.ReadAsStringAsync().Result;
            ErrorModel error = null;
            try
            {
                ValidationErrorModel json = JsonConvert.DeserializeObject<ValidationErrorModel>(responseContent);
                error = string.IsNullOrEmpty(expectedMessage) ? json.Errors.FirstOrDefault(e => e.Key == expectedKey) : json.Errors.FirstOrDefault(e => e.Key == expectedKey && e.ErrorMessage == expectedMessage);
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception);
            }
            AssertionScope assertion = Execute.Assertion;
            AssertionScope assertionScope = assertion.ForCondition(error != null).BecauseOf(because, becauseArgs);
            string message;
            object[] failArgs;
            if (string.IsNullOrEmpty(expectedMessage))
            {
                message = "Expected response to have validation message with key: {0}{reason}, but found {1}.";
                failArgs =new object[]
                {
                    expectedKey,
                    responseContent
                };
            }
            else
            {
                message = "Expected response to have validation message with key: {0} and message: {1} {reason}, but found {2}.";
                failArgs = new object[]
                {
                    expectedKey,
                    expectedMessage,
                    responseContent
                };
            }

            assertionScope.FailWith(message, failArgs);
            return new AndConstraint<HttpResponseAssertions>(this);
        }
    }
}