# React Hooks

Function Components Everywhere!

## What are Hooks?

1. Revisit: Functional Component
    - props in, jsx out
    - great for presentation / simple
    - focused on one/few puprposes
2. Revisit: Class-Based Component
    - uses props AND state
    - business logic
    - orchestrates components
    - (lifecycle hooks / methods)
        - componentDidMount(), etc

## Conversion is annoying. Class to Functional?

-   from functional to class-based if you need state, not anymore
    -   functional components becomes stateful
    -   react hooks are **functions**, not components.
    -   hooks can only be used in Function Components or other Hooks

### Usually named with 'useXYZ()' such as '`useEffect()`'

-   introduced in **React 16.8**
-   react hooks gives FN components state, (react hooks is **not** react lifecycle hooks)
    -   they have **nothing** to do with lifecycle hooks!!
-   highly reusable, since it is a FN components
-   can handle side effects and more
-   you can build custom hooks as well, very flexible!

# Hands on -- checking files

1. Check all the files and see what they contain

    - `Card.js` returns a `div` that is styled
    - the other files rely on CSS, something that I will need to get familiar with once in job
    - `index.js` and `App.js` are very lean
    - not all files are being used yet, will be used as we keep going on with course

2. `React.memo( functional component )`

    - used to combat unnecessary renders
    - only rerenders when prop changes
    - used on a couple of functional components in the project

3. UI - Card, ErrorModal, LoadingIndicator

    - `Card.js` returns a div that's styled to look like a card
    - `ErrorModal.js` returns an error modal
    - `LoadIndicator.js` returns a styled CSS loading indicator, used for async calls

4. `<React.Fragment>` === `<Aux>`

    - you can have adjacent JSX code next to each other
    - used in a few files

# Hands On -- working on project

## useState() - crucial, core hook for React.

-   it manages state!

1.  `IngredientForm.js` is altered

    -   adding useState()
    -   adding `value={}` for the input for two way binding

        > TIP: using empty string `""` as a value for `amount` are always strings, so it will be easier to manage as string!
        > useState() will always return TWO elements
        > first element === current state snapshot
        > second element === a function that allows to update state
        > pass in an anonymous function so that the value will be the correct value for udpateState! `(prevState)`
        > useState() -- updating does not MERGE, you must create another useState() or you have to set the object and use the spread operator ...obj , ...array
        > CLOSURE: a function that closes over surrounding values, which the `event` is closed

        -   the anonymous function passed into updateState() is a closure, as explained, React DOM pools in events.

        `updateState( (here) => { ...this is a function, calling a function! })`

        -   React is built like this, so when the `event` object is passed for React, it pools the event objects instead of creating new objects, it REUSES the event objects, and the consequence for this, is that for the second key stroke and the fact that **we have a closure**, and we locked in the event for the first key stroke as the event object, THAT will be USED inside that function, but outside the INNER function (ie. prevState => {}), we will be reusing the event object for the SAME first key stroke if we use the event object PASSED IN the argument. We are using the WRONG event object.

        CREATE A NEW VARIABLE.

        -   if not done correctly and developer uses the passed in event obj, the inner method will LOCK in the event object initially, and will causes issues. It will keep reusing the same value over and over again.

        -   **SOLUTION** - you must create a variable to be used, INSIDE the update state function, again... a variable TO BE USED inside the updateState function, it's like a middleware, it's the between value that will get updated

        -   it isn't JS's fault, it's Reacts fault that we get a synthetic event, it uses a virtual DOM
            -   it reuses different objects, don't worry about it too much :)

        `onChange={(event) => { const newAmount = event.target.value; updateState((prevState) => ({ title: prevState.title, amount: newAmount, })); }}`

        -   This was code inline for `onChange={}` for the `<input>` fields, I outsourced it and made it dynamic. Edit: using `useReducer()` now!

            > TIP: what is closure?
            > Want to make a counter, where all functions can use it, but also make sure that the counter variable is NOT global?
            > const add = () => {

                let counter = 0;
                return () => counter + 1

            }

### Array Destructuring

-   `const arr = ["hi", "hello"]` --> `const [one, two] = arr`

### Multiple States

-   use can use many states to keep track of multiple variables!
-   create multiple useState()!
-   use objects, or arrays if there is an object that you need as a clump to be updated, other wise, manage them independently!!
-   in turn, we also bypass the closure properties and we don't need to worry about it anymore!

### useState()

-   you can useState() with no arguments to pass in undefined
-   Rules!
    1. must use hooks ONLY in functional components and in custom hooks
    2. only use it in ROOT level of component
        - you can't use in nested functions!
        - you can't use `useState()` in an `if` statement, you can use the items destructured though!

## Back On Track

-   `Ingredients.js` gets `useState()`

    -   passes in prop for `IngredientsList.js` to use!
    -   method is passed into `<IngredientForm>` from `Ingredients.js`
    -   added `IngredientList.js` to showcase the ingredients in a list form
    -   `.filter()` goes through the array, if false, removes the item, then creates new array
        -   `removeIngredientHandler()` is passed on to `IngredientLists.js`
            1. it is used as an `onClick` function that when clicked will take in the `id`
            2. called the handler in the `Ingredients.js` file

## Firebase project

-   firebase sets an ID for us
-   created axios instance in /axios ... npm i --save axios
-   `fetch()` API takes a url, it does a `GET` request by default, so an argument is needed, an object that sets the `GET` to `POST`
-   `JSON` is library that contains `.stringify()` which transforms javascript objects to JSON
-   headers?
    -   you must set it
    -   it's configured in Firebase
        `headers: {'Content-Type': 'application/json'}`
-   `axios`

    -   easier to use :), look at code

-   Code I created... I could've just passed it in the ingredients list component so it can show the ingredients, and not call it in the component itself, smh...

    `const [ing, setIng] = useState([]); axios.get("axiosAPI-ingredients.json").then((response) => { const fetchedIng = []; for (let ing in response.data) { fetchedIng.push(response.data[ing]); } // console.log(fetchedIng); setIng(fetchedIng); });`

## Lifecycle Hooks in React Hooks

-   `useEffect()`: it manages side effects

    -   `useEffect()` gets executed right after EVERY component render cycle
    -   why use axios or fetch inside `useEffect()`?

        1. if not inside `useEffect()`, it will cause one big issue!

            - if saved, it will cause an infinite loop. WHY?
              if you send an HTTPS request in the main function body, it will go through and update the state.
              What happens when you update the state? IT RERENDERS the component again, causing an infinite loop.

        2. Even with use of `useEffect()` - there is still an infinite loop!

            - SOLUTION: second argument is an ARRAY
              when a dependency change, only then the `useEffect()` function runs
              Omitting an empty array is NOT an option.

    -   you can have multiple useEffect()

        1. console logging! this can catch infinite loops!!

        -   it logged twice bc, component renders for the first time because of first useEffect(), then when state is updated, it rerenders again.

    ### Lifecycle Method Equivalent

    -   componentDidMount: it runs one time
        `useEffect(() => { this will only run useEffect ONCE, during startup }, [])`

    -   shouldComponentUpdate: it runs only when certain item is updated
        `useEffect(() => { points to prop, sees if prop updates then will run code inside useEffect()}, [props.xyz])`

    -   componentWillUnmount: clean up code ie. clearing out a timer
        `useEffect(() => { ...code return () => { // this is where clean up happens, componentWillUnmount } }, [props.xyz])`

    -   componentDidUpdate: it runs every time state/item is updated
        `useEffect(() => { // no second argument means it RUNS every render cycle. })`

## More on useEffect()

-   modifying `<Search>` component

1.  added useState()
2.  two way binding for input, `value={}`
3.  outsourced change method
4.  filtering of values by search bar? How? Firebase has a filter option

    -   options:

    1. we can send an HTTP request for every key stroke, would work
    2. just use useEffect(), same idea, more elegant!

    -   `[filter]` is showing a warning because we rely on props, we used onLoadIngredients, so pop it in there

    1. adding props like `[filter, props]` is a problem bc every time a prop is passed, it rerenders! NO good.
    2. it might sound strange that functions can change, but if the component rerenders, that object is now different
    3. `[filter, onLoadIngredients]` will work because of the fact above, a function behaves like any other value
        > TIP TO MYSELF: the ingredient is updated in `Ingredients.js` bc of the function!
    4. Published in Database

    -   `ingredients` = the node that we are targeting
    -   `.indexOn `= something that firebase will understand that promotes filtering
    -   `["title"]` = the param that will be used

        `{ "rules": { ".read": true, ".write": true, "ingredients": { ".indexOn": ["title"] }, "axiosAPI-ingredients": { ".indexOn": ["title"] } } }`

5.  infinite loop!

    -   caused by onLoadIngredients

    1. the reason is that when the MAIN component rerenders, `Ingredients.js`, it creates a whole new component, which in turn creates new variables and functions.

    -   New function? Yes, a function does change, and here we can see it in effect, negatively. The _new_ function is passed on to `<Search>` and it repeats the process! All it means is that since component rerenders, a _new_, not really new, object has been created. **newObj === changed function**

    ## useCallback – the solution

    -   it returns a memoized version of the callback only if the inputs has changed, so if component rerenders, it _survives_ the rerender, it's memoized so the same function is returned even of rerender

        -   it is **caching** the function, SO that we don't create a new function and it does not change anymore

    -   the second argument only asks what the dependencies ARE for the function, putting in `ingredients` does not make sense because in the whole function, not once was ingredient even called, it is NOT dependant.

    -   once implemented, the function is wrapped with `useCallback()`, it will survive the rerender cycles, the function does NOT become recreated, and does NOT change!

    -   the search effect happens because it will reachout to the server and filters by way of a search query, ie. &equalTo="Apple", if lowercase apple, it will not show!

6.  Another render cycle?

    -   it comes from a redundant HTTPS call.
        Because we called another HTTPS call... lol.
        We get rid of the axios get call in Ingredient.js

        commented code with `useEffect(() => {}, [])`

7.  No rerenders for every key stroke in `<Search>` component

    -   create a timer.
        How? Use setTimeout()!
        EDIT: there is a better way. Go to 8 after reading all the content for 7.

    -   even with set timeout, it will still send the exact amount of key strokes you're putting in... it just defers, there must be a way.

    -   Understand closures.
        the `filter` value will be _LOCKED IN_ when the timer starts,
        so it will **not** be the same value _AFTER_ the timer starts.
        the value that is checked, IS the **LOCKED IN** value!

        **THIS IS IMPORTANT.**

    so the `filter` value that is checked is not the same, it will be the value 500ms ago!

    -   `useRef()`

    we need to compare the old value and the new value of `filter`.. how?

    use `useRef()!`

    1. know what it is: it allows to us to create a reference
    2. create an instance
        - `const inputRef = useRef();`
    3. in `<input>`, use the inputRef as the value for `ref` property of `<input>`

8.  Better way than using setTimeout(), this is not the perfect way!

    -   were setting the timer, only when the useEffect() runs, but useEffect() in the end runs because our input, `filter`, changes.

    so we're setting a bunch of timers that is set independantly. not what we want. Example below!

    1. instead of using a timer, for every key stroke, lets clear the previous timer because it doesn't matter to us anymore, we do not care about the old key stroke if there is a new one!

    2. const timer = setTimeout() ...

    3. will be utilizing `useEffect(() => { return () =>{ } }, [props])`

        - the clean up!
        - always has to be a function, a clean up function
        - it will run RIGHT before the useEffect() runs the next time!
        - if you have `[]` as the second argument, the cleanup function runs when the component gets unmounted.

        - so for each keystroke, ie. i type in "Apple"

            A: start 500ms
            p: start 500ms
            p: start 500ms
            l: start 500ms
            e: start 500ms

            it starts a timer for EVERY stroke.

            No need to do that, you can return () => { clearTimeout(timer) } to clean up the other timers and only start the timer at 'e' key stroke.

        - this reduces redundant timers in memory, optimizied. Only one timer instead.

9.  deleting values in the database!

    -   did it myself :)

10. ## UI - error modal + loading indicator!

    -   create state that is for loading!

    1. useState(false)

    2. pass in the loading prop to IngredientForm so that it can show it

    3. `props.loading ? <LoadingIndicator /> : null}` === `props.loading && <LoadingIndicator>`

        - JS syntactic sugar

    4. I thought having the loading indicator would be nice in the button.. it doesnt.

    5. error modal + loading indicator!

        - look at Ingredients.js

11. ## setState & setState batching!

    -   after setState() is invoked, you can't immediately use the new state when NOT using the function form! It is because it is batched!

    -   all state updates from one and same synchronous event handler are batched together!

        -   `const clearError = () => { setError(null); setIsLoading(false); };`
            we see that there are two setState's in this one function, React hooks will batch these two setState's and render _only_ once!
        -   the setError and setIsLoading is synchronously executed, then batched, then rendered as _one_ setState update

    -   Consider this code:

        `console.log(name); // prints name state, e.g. 'Manu'`
        `setName('Max');`
        `console.log(name); // ??? what gets printed? 'Max'?`

        You could think that accessing the name state after setName('Max'); should yield the new value (e.g. 'Max') but this is **NOT** the case. Keep in mind, that the new state value is **only** available in the next component render cycle (which gets scheduled by calling setName()).

        Both concepts (batching and when new state is available) behave in the same way for both functional components with hooks as well as class-based components with `this.setState()`!

12. `useReducer()` vs `useState()`

-   use `useReducer()` if you know that you're state will be a little complex than just a boolean value
-   reducers are functions that takes some input and returns some output
-   `useReducer()` !== Redux, they have **NO** relationship
-   using a reducer is much cleaner! just dispatch an action! :D

    -   the other way was okay too, no problem, but `useReducer()` is a more structural approach

-   Hands On

    1. creating reducer
    2. `useReducer()`
    3. const [userIngredient, dispatch] = useReducer(ingredientReducer, []);
    4. when working with `useReducer()`, React will re-render the component whenever your reducer returns the new state
    5. rename all the variables to make it work
    6. it really is the same... here it seems a little off because we're not messing with actionTypes, action creators, thunk and objects to update the state
    7. Related props?

        - loading and error?
          Yes they are!

        - `dispatchHttp({type: "RES"})` does not work with Axios... it is not working for me

        - switched back to const [isLoading, setIsLoading] = useState(false)

    8. Confirmed my suspicion that the reason why dispatchHttp is NOT getting executed is because of probably batched renders? or because it is executed in the promise? Or maybe something not even related.

13. `useContext()`

-   Auth.js + App.js

14. `useMemo()`

    `useCallback` VS `useMemo`?

    -   So what is the difference? `useCallback` returns its function **uncalled** so you can call it later, while `useMemo` **calls** its function and returns the result.

    useCallback just saves and returns the **function**, so no new functions are generated,

    useMemo saves and returns the **values**, so no new values are generated

    1. useCallback for addingIngredient and deletingIngredient
    2. React.memo() for IngredientList.js **is** needed!, add React.memo in the IngredientList.js
    3. you can use useMemo

        - changing IngredientList.js back to how it started to use useMemo
        - it must ALSO have the dependencies as the _SECOND_ argument

        `const ing = useMemo(() => { return <List onRemoveItem={removeIngredientHandler} ingredients={userIngredient}></List> }, [removeIngredientHandler, userIngredient])`

        - if you want to store components, use React.memo... ONLY if you want to store values, you can use useMemo() so it does not have to recalculate if component is rerendered!

    > NOTE: you use useCallback for every function in Ingredients.js -- that is correct, you only use useMemo() if you want the component to keep the same value even after being rerendered so it doesn't have to keep grabbing the value from the parent component

15. Custom Hooks
