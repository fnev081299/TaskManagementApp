using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using System.Collections.Generic;

public class FileUploadOperationFilter : IOperationFilter
{
    public void Apply(OpenApiOperation operation, OperationFilterContext context)
    {
        if (context.ApiDescription.RelativePath.Contains("profilePicture") &&
            (context.ApiDescription.HttpMethod.Equals("POST") || context.ApiDescription.HttpMethod.Equals("PUT")))
        {
            var fileUploadMime = new OpenApiMediaType
            {
                Schema = new OpenApiSchema
                {
                    Type = "object",
                    Properties =
                    {
                        ["profilePicture"] = new OpenApiSchema
                        {
                            Type = "string",
                            Format = "binary"
                        },
                        ["userId"] = new OpenApiSchema
                        {
                            Type = "integer",
                            Format = "int32"
                        }
                    },
                    Required = new HashSet<string> { "profilePicture", "userId" }
                }
            };

            operation.RequestBody = new OpenApiRequestBody
            {
                Content =
                {
                    ["multipart/form-data"] = fileUploadMime
                }
            };
        }
    }
}
