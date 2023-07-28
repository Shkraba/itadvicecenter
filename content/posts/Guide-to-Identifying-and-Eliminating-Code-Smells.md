---
title: "How to Identifying and Eliminating Code Smells in .NET"
description: "Identifying and Eliminating Code Smells in .NET C#"
date: 2023-07-28
image: "/images/posts/code-smells.png"
categories: [".NET"]
authors: ["Yurii Shkraba"]
tags: [".NET"]
draft: false
---

> Clean code is the foundation of a maintainable and efficient software project. However, over time, codebases can become cluttered with code smells, indicating potential design flaws and poor implementation choices. In this blog post, we will explore common code smells in .NET C# and provide practical examples and solutions to help you write cleaner and more maintainable code.

```bash
#!/bin/bash

# Push to projects directory with an absolute path
pushd ~/Documents/projects

# Run create-react-app in projects directory
yarn create react-app "$1"

# Move inside the new project folder with a relative path
pushd "$1"

# Open project in VS Code
code .

# Start server
yarn start
```

#### What are Code Smells?
Code smells are indicators of potential problems in software code. They are not bugs but rather signs that the code may be poorly structured or lack design elegance. These smells often make code harder to read, understand, and maintain.

#### Importance of Addressing Code Smells
Ignoring code smells can lead to technical debt, making future maintenance and enhancement more difficult and time-consuming. By identifying and resolving code smells, developers can ensure that the codebase remains clean, reducing the risk of introducing bugs and improving long-term maintainability.

#### How to Identify Code Smells
Code reviews, static analysis tools like (SonarQube, Checkmarx), and frequent refactoring can help identify code smells. It's essential to keep the SOLID principles and other best practices in mind while assessing the codebase.

#### Example:
Let's consider a new examples of code smell:

##### Long Method
```C#
public decimal CalculateProductPrice(Product product, Customer customer)
{
    decimal price = 0;

    if (product.Type == ProductType.Standard)
    {
        if (customer.IsPreferredCustomer)
        {
            price = product.Price * 0.95m;
        }
        else
        {
            price = product.Price;
        }
    }
    else if (product.Type == ProductType.Special)
    {
        if (customer.IsFavoriteCustomer)
        {
            if (product.StockCount > 100)
            {
                price = product.Price * 0.7m;
            }
            else
            {
                price = product.Price * 0.8m;
            }
        }
        else
        {
            price = product.Price * 1.1m;
        }
    }

    // More nested conditions...

    return price;
}

```
###### Resolution:
``` C#
public decimal CalculateProductPrice(Product product, Customer customer)
{
    if (product.Type == ProductType.Standard)
    {
        return CalculateStandardProductPrice(product, customer);
    }
    else if (product.Type == ProductType.Special)
    {
        return CalculateSpecialProductPrice(product, customer);
    }

    // Handle other product types...

    return 0;
}

private decimal CalculateStandardProductPrice(Product product, Customer customer)
{
    return customer.IsPreferredCustomer ? product.Price * 0.95m : product.Price;
}

private decimal CalculateSpecialProductPrice(Product product, Customer customer)
{
    if (customer.IsPreferredCustomer)
    {
        return product.StockCount > 100 ? product.Price * 0.7m : product.Price * 0.8m;
    }
    else
    {
        return product.Price * 1.1m;
    }
}
```

##### Long Parameter List:
``` C#
public void CreateOrder(string customerName, string address, string city, string postalCode, string country, DateTime orderDate, List<Product> products)
{
    // Creation logic
    // ...
}
```
###### Resolution:

``` C#
public class Order
{
    public string CustomerName { get; set; }
    public string Address { get; set; }
    public string City { get; set; }
    public string PostalCode { get; set; }
    public string Country { get; set; }
    public DateTime OrderDate { get; set; }
    public List<Product> Products { get; set; }
}

public void CreateOrder(Order order)
{
    // Creation logic
    // ...
}
```

##### Duplicated Code

``` C#

public double CalculateAreaOfRectangle(double width, double height)
{
    return width * height;
}

public double CalculateAreaOfSquare(double side)
{
    return side * side;
}
```

###### Resolution:
``` C#
public double CalculateArea(double dimension1, double dimension2 = 0)
{
    return dimension1 * (dimension2 == 0 ? dimension1 : dimension2);
}

```

##### A Huge Switch Block
In this example, we will refactor huge switch block in a C# application. The switch block contains multiple cases, making the code difficult to maintain and violating the Open/Closed Principle. To refactor the code, we will apply Behavioral Patterns, specifically the Strategy Pattern and Command Pattern, to achieve a more flexible and extensible design.

Consider an application that processes different types of requests
``` C#
public class RequestProcessor
{
    public void ProcessRequest(Request request)
    {
        switch (request.Type)
        {
            case RequestType.UserInteraction:
                // Handle user interaction
                break;
            case RequestType.ApiRequest:
                // Handle API request
                break;
            case RequestType.DataProcessing:
                // Handle data processing request
                break;
            // More cases for other request types...
            default:
                // Handle unknown request
                break;
        }
    }
}
```
We will start by implementing the Strategy Pattern to decouple the processing logic for each request type into separate classes.
``` C#

// Interface for request processing strategies
public interface IRequestStrategy
{
    void ProcessRequest(Request request);
}

// Concrete strategy classes for each request type
public class UserInteractionStrategy : IRequestStrategy
{
    public void ProcessRequest(Request request)
    {
        // Handle user interaction
    }
}

public class ApiRequestStrategy : IRequestStrategy
{
    public void ProcessRequest(Request request)
    {
        // Handle API request
    }
}

public class DataProcessingStrategy : IRequestStrategy
{
    public void ProcessRequest(Request request)
    {
        // Handle data processing request
    }
}
```

Next, we will implement the Command Pattern to encapsulate the request processing strategies.

``` C#
public class RequestProcessorCommand
{
    private readonly IRequestStrategy _strategy;

    public RequestProcessorCommand(IRequestStrategy strategy)
    {
        _strategy = strategy;
    }

    public void Execute(Request request)
    {
        _strategy.Process(request);
    }
}
```
Finally, we refactor the RequestProcessor class to utilize the Command Pattern and eliminate the huge switch block.

``` C#
public class RequestProcessor
{
    private readonly Dictionary<RequestType, IRequestStrategy> _strategyMap;

    public RequestProcessor()
    {
        // Initialize the strategy map with request types and corresponding strategies
        _strategyMap = new Dictionary<RequestType, IRequestStrategy>
        {
            { RequestType.UserInteraction, new UserInteractionStrategy() },
            { RequestType.ApiRequest, new ApiRequestStrategy() },
            { RequestType.DataProcessing, new DataProcessingStrategy() },
            // You can add other request types here
        };
    }

    public void ProcessRequest(Request request)
    {
        if (_strategyMap.TryGetValue(request.Type, out var strategy))
        {
            var command = new RequestProcessorCommand(strategy);
            command.Execute(request);
        }
        else
        {
            // Handle unknown request
        }
    }
}
```