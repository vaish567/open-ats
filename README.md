# OpenATS

### _High volume applicant tracking system_

[Website](https://openats.app)

[Roadmap](https://trello.com/b/iBMcfzJS/openats-kanban)

OpenATS is an attempt to create a modern, ⚡ serverless ⚡, event driven implementation of your typical applicant tracking system.

NOTE: I will be using the terms 'job(s)' and 'funnel' interchangeably. The reason for this is that a 'job' does not have to be a solid title like '_Engineer_'. It could instead refer to a city in which a food delivery company might operate in. For these cases, it is simply easier to refer to them as 'funnels'.

> - We need more drivers in the Boston funnel
> - Let's send an email to everyone in the Miami funnel for the new bonus
> - The NYC funnel is pretty backed up, we should get more specialists working that ticket queue

Overall, the premise is simple:

- There are jobs / funnels
- These jobs / funnels have stages _(Questionnaire, Interview, Hired, Rejected, etc.)_
- Applicants move through stages

#### Tech

A React frontend hosted on S3 + Cloudfront and a NodeJS backend running on AWS Lambda with the [Serverless framework](https://www.serverless.com/). As of 2021-05-02, I have not decided on a search engine, I am leaning towards [MeiliSearch](meilisearch.com). Ideally, a Lambda can pick up the DynamoDB streams and send it over to the EC2 instance running Meili. Elastic just seems too expensive :/
At the very basic level, this is what we are trying to build:

![Serverless 3 Tier Architecture - Ric Harvey - https://www.slideshare.net/AmazonWebServices/serverless-architecture-patterns-95098980](images/sls3tier.jpeg)

The DynamoDB access patterns are as follows:
