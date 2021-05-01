/* This example requires Tailwind CSS v2.0+ */
import {
  LightningBoltIcon,
  MailIcon,
  CodeIcon,
  FastForwardIcon,
} from "@heroicons/react/outline";

import SocialFooter from "./components/SocialFooter";
const features = [
  {
    name: "Open source",
    description:
      "Customize to your heart's content. Fork it, flip it and reverse it with an MIT license",
    icon: CodeIcon,
    link: "https://github.com/joswayski/OpenATS",
  },
  {
    name: "No servers to manage",
    description:
      "Worrying about servers is sooooo 5 years ago. We use the Serverless framework to deploy our Lambdas",
    icon: LightningBoltIcon,
  },
  {
    name: "Massive throughput",
    description:
      "Designed for the gig economy in mind. Hire more people without hiccups",
    icon: FastForwardIcon,
  },
  {
    name: "Developer experience",
    description:
      "N.E.R.D.T. stack (that's a thing right?) Node, Express, React, DynamoDB, TypeScript",
    icon: MailIcon,
  },
];

export default function Example() {
  return (
    <div>
      <div className="bg-gray-50 overflow-hidden">
        <div className="relative max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <svg
            className="absolute top-0 left-full transform -translate-x-1/2 -translate-y-3/4 lg:left-auto lg:right-full lg:translate-x-2/3 lg:translate-y-1/4"
            width={404}
            height={784}
            fill="none"
            viewBox="0 0 404 784"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="8b1b5f72-e944-4457-af67-0c6d15a99f38"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width={404}
              height={784}
              fill="url(#8b1b5f72-e944-4457-af67-0c6d15a99f38)"
            />
          </svg>

          <div className="relative lg:grid lg:grid-cols-3 lg:gap-x-8">
            <div className="lg:col-span-1">
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                High volume applicant tracking system.
              </h2>
            </div>
            <dl className="mt-10 space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 lg:mt-0 lg:col-span-2">
              {features.map((feature) => (
                <div key={feature.name}>
                  <dt>
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <feature.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="mt-5 text-lg leading-6 font-medium text-gray-900">
                      {feature.name}
                    </p>
                  </dt>
                  <dd className="mt-2 text-base text-gray-500">
                    {feature.description}
                  </dd>
                  {feature.link ? (
                    <dd className="mt-2 text-base text-gray-700">
                      <a
                        href={feature.link ? feature.link : null}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <button
                          type="button"
                          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          View on Github
                        </button>
                      </a>
                    </dd>
                  ) : null}
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
      <SocialFooter />
    </div>
  );
}
