# intercom

Utils for integrating [Intercom](https://www.intercom.com/) into web applications.

## Use

To use Intercom in a React application, use the provided `useIntercom` hook in some app root component to load and
initialize Intercom. Provide [settings](https://developers.intercom.com/installing-intercom/docs/javascript-api-attributes-objects)
containing user identification if/when inside a sign-in barrier.

```javascript
import { useIntercom } from '@wisersolutions/intercom'

export const AppRoot = ({ intercomId: appId, ...props }) => {
  useIntercom(appId)
  // or
  // useIntercom(appId, { user_id: '12345', email: 'john.doe@company.com', name: 'John Doe', created_at: 1575205778963 })
  
  // … (render the app)
}
```

To integrate Intercom into an app that's not using React, import just the loader code and load it.

```javascript
import { loadIntercom, startIntercom } from '@wisersolutions/intercom'

loadIntercom(appId).then(() => startIntercom(appId, { /* settings or user identity if needed */ }))
```

## Requirements

- React 17 (peer dependency): `"react": "^17.0.2"`

## Development

### Install

Install dependencies using:

```sh
npm install
```

### Develop

After you modify sources, run the following (or set up your IDE to do it for you):

- format the code using `npm run format`
- lint it using `npm run lint`

and fix the errors, if there are any.

### Publish

This package is configured to publish to GitHub Packages (`publishConfig.registry`). Ensure your `.npmrc` is set up with a GitHub token that has the appropriate scope.

Publishing is done in two steps:

1. Create a new version tag and push it to the repository:
    ```sh
    npm version <patch|minor|major>
    git push --follow-tags
    ```
1. Publish the new version as a package (build runs via `prepublishOnly`):
    ```sh
    npm publish
    ``` 
