# OpenATS

### _High volume applicant tracking system_

[Website](https://openats.app)

OpenATS is an attempt to create a modern, ⚡ serverless ⚡, event driven implementation of your typical applicant tracking system.

I will be using the term 'funnel' instead of 'job'. The reason for this is that a 'job' does not have to be a solid title like '_Engineer_'. It could instead refer to a city in which a food delivery company might operate in and 'job' doesn't fit this use case.

> - We need more drivers in the Boston funnel for this week ✅
> - Let's send an email to everyone in the Miami 'Questionnaire' funnel ✅
> - The NYC funnel is pretty backed up, we should get more specialists working that ticket queue ✅
> - We cleared out the final review job and were able to get more drivers on the road! ❌

Overall, the premise is simple:

- There are funnels
- These funnels have stages _(Questionnaire, Interview, Hired, Rejected, etc.)_
- Applicants move through stages

#### Tech

We'll be using the [Serverless-NextJS component](https://github.com/serverless-nextjs/serverless-next.js) to have extremely fast API calls anywhere in the world with Lambda@Edge and DynamoDB global tables.

I tried to follow [Alex DeBrie's best practices](https://www.youtube.com/watch?v=DIQVJqiSUkE) because after all, he **literally** [wrote the book](https://www.dynamodbbook.com/) on it. Also, huge shoutout to Rick Houlihan and [his talk](https://www.youtube.com/watch?v=HaEPXoXVf2k&).

The DynamoDB access patterns are as follows:

**Primary Index - OpenATS**

- Get an applicant by their ID
- Get funnel info by funnel ID (_Description, salary, location, etc._)
- Get a funnel's stages by ID
  - SK: 'Begins with' = 'STAGE_TITLE#' (will be used to filter questions / rules for the stages later on)

**GSI: ApplicantsByFunnelByStage**

- Get all applicants in a funnel
- Get all applicants in a funnel in a specific stage
  - We can filter then here for applicant attributes

**GSI: AllByType**

- Get all records of a certain type
  - PK: Applicant || Stage || Funnel etc.

**GSI: AllApplicantsInASpecificStage**

- Get all applicants across all funnels in a specific stage
  - PK is a stage title: STAGE_TITLE#(title here)
  - SK is an ISO 8601 timestamp of their creation date. Set >= beginning of time to get all records lol
