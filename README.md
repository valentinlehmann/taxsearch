# TaxSearch

This project provides a web app interacting with a MeiliSearch instance to search for decisions made by the Federal Tax Court of Germany (Bundesfinanzhof).

## Deployment
To deploy the app, you can use the provided Dockerfile. The app is built using Next.js and is designed to run in a Docker container.
## Prerequisites
- Docker installed on your machine.
- A MeiliSearch instance with the data to query running and accessible.
- A MeiliSearch API key with read permissions for the "bfh" index.
- The following environment variables:
  - `NEXT_PUBLIC_MEILI_HOST`: The URL of your MeiliSearch instance.
  - `NEXT_PUBLIC_MEILI_API_KEY`: The API key for your MeiliSearch instance. WARNING: This key should have read permissions only. IT WILL BE EXPOSED IN THE BROWSER.