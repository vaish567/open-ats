### Services

These are the different services offerred by the API. I like to follow the one lambda per service rule, something like this:

- /applicants
- /funnels
- /search
- /stages

I find that breaking down Lambdas to the tiniest miniscule thing gets confusing really fast. Also, we can minimize cold starts by having one function doing a set group of actions which makes it more likely to be continuously invoked.
