# Welcome to the Present Pal technical assessment

The aim of this exercise is for you to show us your working methods and technical skills.

## Scenario

Present Pal is launching a new product. This fantastic site displays a list of exciting blog post titles that a user can then choose to read.

The prototype "works" but is not well written nor does it look ready for market.

You have been asked to make changes to the project:

1. Update any code that you feel does not meet best practices
2. Ensure the unit tests continue to pass (these should not need modified)
3. Apply any styling you feel appropriate to the page

## Exercise
Please spend up to an hour on this, it is not intended to be the next twitter.
The main goal is for you to show us your technical skills along with your reasoning behind the choices you make. When this is submitted it will be a point of discussion in our technical chat with you so please make notes on development choices.

### Setup
1. Fork the repo
2. install the dependencies `yarn install` or `npm install`
3. Run the project `yarn start` or `npm start`
4. Run the unit tests `yarn test` or `npm test` this process will watch for changes and re-run tests

### Objectives

The production ready site should show a side-by-side view with the list of posts on the left and the post view on the right. The post view should load the title and body content of the post after a user clicks the "View" button.

The site should only show the list of posts after the user clicks "Fetch posts" so the call is not made repeatedly should the page be reloaded.

Style changes should be implemented to make the site look more presentable, with stylistic choice at the discretion of the developer. Style frameworks can be used but shouldn't be necessary.