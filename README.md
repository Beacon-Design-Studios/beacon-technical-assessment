# Technical Challenge: Taco Assembly
### `Beacon Design x Seroclinix | Development`

First off, thank you so much for applying to Seroclinix! We're excited to meet you and chat with you about what we want to accomplish and how you can help.

Before we get there, we'd love if you could complete this technical challenge to determine if you're the right fit for this particular role.

## Why?
- helps us understand if you can learn new technology quickly. In a startup world, it's vital that developers are elastic and not bound to particular tools. In this case, if you haven't encountered React already, you'll have to get familiar with it. (https://reactjs.org/tutorial/tutorial.html)
- helps us understand if you have experience with core web development technologies such as HTML and CSS.
- helps us understand if you can think logically and reason solutions to problems.
- helps us understand if you know more about the ecosystem: preprocessors such as SASS, javascript libraries, node & npm etc.
- helps us understand if you can get familiar with an existing architecture quickly and if you have the ability to traverse, deduce and reverse-engineer code.

## Requirements
- Github account
- Node.js & npm (8.15 or later) installed globally or through `nvm`
- run `npm run setup` then `npm run start` to get started!

## Instructions
- Initialize the project as a `git` repository and commit any changes you make!
- do at-least (6) of the following numbered tasks. You can do as many as you want!
- data for this app can be fetched from here: [JSONBin - Data](https://api.jsonbin.io/b/5d7d1c1cde91160d28724a76/4). Refer to their API docs to figure out how to read data from a JSON Bin.
- the login code for this app can be fetched from here: [JSONBin - Login](https://api.jsonbin.io/b/5d7e46efcfe9d23b10f658bb)
- For documentation & refreshers, you can refer to anything you want! We recommend MDN. E.g. [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- Once complete, push your code to a **private** repository on your Github account, and add `@MightyRevenge` as a collaborator.

1. Something is not right in the routes in `App.js`. Fix the code.
2. Our app logo is for Taco Assembly, but it seems to be rendering something else. The logo is in our project, can you fix the code in `SplashPage.js` to import the correct logo?
3. Our app name could change in the future. Can you refactor the code in `SplashPage.js`?
4. The 'Enter the kitchen'  button currently does nothing useful. Can you refactor the code in `SplashPage.js` to make it work?
5. The login page (`LoginPage.js`) does not redirect the user to the dashboard if they're already logged in. Can you add code here to make this work?
6. The login page (`LoginPage.js`) also does not work yet. Can you make the HTTP call in the loginHandler to complete the login functionality?
7. In `DashboardPage.js`, each order must have a unique id. The code there is temporary and must be refactored to use the shiny *npm* library, `nanoid`.
8. In `DashboardPage.js`, the orders are going into the wrong column when the restaurant opens. How can they be forced to go into the **Queue** instead?
9. In `DashboardPage.js`, when orders are cashed in, they're not rounded up. How can you use the already provided function to round up the cash value and store it on the order?
10. In `DashboardPage.js`, it's better if the orders are laid out newest to oldest. How can you make the orders show up in reverse order? Hint: use a higher order function.
11. In `DashboardPage.js`, the redirect to the SplashPage on invalid authentication is missing. Can you add it?

### Bonus questions
12. The ingredients for each taco currently do not show. Can you show them in a list above the button, **only** when the tacos in the *Source* column?
13. The app currently isn't too responsive. Can you fix the styling for the *Register* section at the bottom, when the revenue is shown? It currently breaks out of the page.
14. The total revenue at the end of the day is currently not persistent. How can you use the `localStorage` API to achieve some persistence?
15. Say each taco can only spend 1 minute in the cook column. If a taco is in the cook column for more than 1 minute, it'll burn and will have to be trashed (deleted). How can you add code to achieve this?
16. Taking that idea further, add a little progress bar on the card when it's in the cook column to show the cook time passing!
17. How can you componentize this code better? What pieces can be separate components? The `DashboardPage.js` is starting to look weighty.
18. Make the cards draggable between columns. Use an external library! (`react-beautiful-dnd` is already installed for you!)
19. Commenting is so important in development. It helps you and it helps your peers know what you were thinking when you wrote code. This app however has been sparsely documented. Can you document the code well?