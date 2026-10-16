# Prosper SPA Demo

React + TypeScript single page app for testing Prosper placements and rewarded video across client-side route changes.

## Run in GitHub Codespaces

1. Push this repo to GitHub.
2. On the repo page: **Code > Codespaces > Create codespace on main**.
3. The container installs dependencies and runs `yarn start`. The app opens in a preview on port 3000.

To open it in a normal browser tab, go to the **Ports** panel and click the globe icon next to port 3000. Set the port visibility to **Public** if someone else needs to view it.

## Run locally

```
yarn install
yarn start
```

## Prosper script

`public/index.html` has a placeholder for the Prosper ad manager script. Add the correct site script there, otherwise `self.__VM` never loads and no ads or rewarded video will show.
