﻿using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using Enigmatry.Blueprint.Api.Models.Validation;
using FluentAssertions;
using FluentAssertions.Execution;
using FluentAssertions.Primitives;
using Newtonsoft.Json;

namespace Enigmatry.Blueprint.Api.Tests.Common
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

        private AndConstraint<HttpResponseAssertions> HaveStatusCode(HttpStatusCode expected, string because = "",
            params object[] becauseArgs)
        {
            AssertionScope assertion = Execute.Assertion;
            AssertionScope assertionScope = assertion.ForCondition(Subject.StatusCode == expected).BecauseOf(because, becauseArgs);
            string message = "Expected response to have HttpStatusCode {0}{reason}, but found {1}. Response: {2}";
            object[] failArgs = {
                expected,
                Subject.StatusCode,
                Subject.Content.ReadAsStringAsync().Result
            };
            assertionScope.FailWith(message, failArgs);
            return new AndConstraint<HttpResponseAssertions>(this);
        }

        public AndConstraint<HttpResponseAssertions> ContainValidationError(string fieldName, string expectedValidationMessage = "", string because = "", params object[] becauseArgs)
        {
            var responseContent = Subject.Content.ReadAsStringAsync().Result;
            ErrorModel error = null;
            try
            {
                ValidationErrorModel json = JsonConvert.DeserializeObject<ValidationErrorModel>(responseContent);
                error = string.IsNullOrEmpty(expectedValidationMessage) ? json.Errors.FirstOrDefault(e => e.Field == fieldName) : json.Errors.FirstOrDefault(e => e.Field == fieldName && e.ErrorMessage == expectedValidationMessage);
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception);
            }
            AssertionScope assertion = Execute.Assertion;
            AssertionScope assertionScope = assertion.ForCondition(error != null).BecauseOf(because, becauseArgs);
            string message;
            object[] failArgs;
            if (string.IsNullOrEmpty(expectedValidationMessage))
            {
                message = "Expected response to have validation message with key: {0}{reason}, but found {1}.";
                failArgs =new object[]
                {
                    fieldName,
                    responseContent
                };
            }
            else
            {
                message = "Expected response to have validation message with key: {0} and message: {1} {reason}, but found {2}.";
                failArgs = new object[]
                {
                    fieldName,
                    expectedValidationMessage,
                    responseContent
                };
            }

            assertionScope.FailWith(message, failArgs);
            return new AndConstraint<HttpResponseAssertions>(this);
        }
    }
}