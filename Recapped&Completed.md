# REACT HOOKS

takeaways:

-   `React-Hooks.md` is written nicely, explains the module succinctly.

We looked at how Search uses the function filteredIngredientsHandler to populate the array

Relearns:

-   `React.memo` === `shouldComponentUpdate()`, just inverse usage

-   `useEffect()`

    -   `[]`
    -   `[props.xyz]`
    -   `return () => { ... }`
    -   `no dependancy array`

-   `useContext()` &mdash; context API

-   `useCallback(() => {}, [ deps go here ])` — preserves functions

-   `useMemo(() => {}, [ deps go here ])` — preserves values

    ▪ Why do we want to preserve?

    -   For every rerender, all values will be lost, in `Search.js` it uses `useState()`, which rerenders the application, rerendering will wipe all values!

    -   we want to preserve our functions + values, use `useCallback` and `useMemo`

-   `useReducer(reducerFn, [] or {} or w.e)`

## `axios.js`

-   just an axios instance

## `Card.js`

-   just a styled div with CSS

## `LoadingIndicator.js`

-   just a loading indicator, styled divs with CSS

## `Auth.js`

-   just a div with header and button ( button changes state of `isAuth` to `TRUE` in the `auth-context.js` )

## `auth-context.js` + `App.js`

-   must have the `value` prop in `AuthContext.Provider` because this is how to pass functions and variables

-   globally using context:
    functional components:

    -   `useContext()`

    class based components:

    -   `import AuthContext from ‘../..’`

        `static contextType = AuthContext;` // contextType is reserved

        -   to access: `this.content.authenticated` // will get value from `Provider` (Stateful class), content is reserved

-   if using class based components, instead of `useContext()`, the functions and variables must be accessed like this

    ```
    import MyContext from '../MyContext.js'

    class MyClass extends React.Component {

        static contextType = MyContext;



        render() {
            let value = this.context;
            /* render something based on the value */
        }
    }
    ```

-   if you want to use `<MyContext.Consumer>`, for only one case, should be accessed like this
    ```
    <AuthContext.Consumer>
    { (context) => {
        ...
        }
    }
    </AuthContext.Consumer>
    ```

## `index.js`

-   a `ReactDOM.render()`

-   `<AuthContextGiver> <App /> </AuthContextGiver>`
    -   this will make it so that you don't have to wrap individual components with `.Provider`, it wraps the whole `<App />`

## `modal.js`

-   A simple ErrorModal, has a back drop and a styled div with CSS props such as `position: fixed`, `z-index: 100`, `.backdrop { ... }` to showcase a modal

## `ingredientList.js`

-   just maps out the ingredients with `<ul>`, `<li>` structure, styled with CSS Flexbox

-   `onClick={props.onRemoveItem.bind(this, ig.id)}`
    is equal to
    `onClick={() => props.onRemoveItem(ig.id)}`<-- this is preferred.

## `ingredients.js`

-   `filteredIngredientHandler()` is the magic behind the search function, it `sets` the array with new data with a fetch request from Firebase based on it's `title` and the `?orderBy="title"&equalTo="${filter}"` query

-   uses most of the optimizations for hooks

    -   `useCallback()`, used for most functions
    -   `useMemo()`, preserving the `IngredientList` component from rerender
    -   `React.memo()`, shouldComponentUpdate()

-   uses `useReducer()` to manage state, similar if not the same structure for a `Redux reducer`

    -   `dispatch` from the `ingredientReducer` is used to manipulate the []

-   Axios is used to fetch, post, and delete from Firebase database

## `ingredientForm.js`

-   two way binding with inline `setState()` for `onChange={}`

-   input fields are set up correctly and accurately ( `type`, `id`, `name`, `value`, `onChange`, `ref`)

    -   `<label htmlFor="name">`, this is how to set up a label tag, using `for` as an attribute will not work, must be `htmlFor`

-   `onSubmitHandler()` from `App.js` posts the information to the DB

-   just a form that collects data, by input fields, and `onSubmitHandler()` collects all the data

## `Search.js`

-   `React.memo()`

-   `useRef()` to grab the value of the input field

    -   knowing this provides you a new tool, in an experiment in `Search.js`, using `refFilter` that I created also works when used as a reference!

-   it actually is real simple, I though it will be challenging to revisit, but, the notes in `Search.js` is phenomenal

## `hooks.js`

-
