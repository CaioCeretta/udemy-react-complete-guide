## Intro

Even though the game might not look too complex, there are many important patterns and important concepts we can explore
while building this game.

## Not all content must go inside of components

## Initial Comments

Instead of defining the initial HTML inside the App.jsx, we are going to grab that code we would add inside the App
component and add it into the index.html. 

In the end, that index.html is the file that holds the div with id root and is the one that all of our app is rendered
inside. But when working with React, we can still add more markup to that file, if we need more markup in there.

We can define headers in the index.html, in case it does not contain any state or prop that defines what is going to be
displayed in there. We can, for example, set the header on top of the div that renders
our whole app.

When working with react, it's too easy to forget that we can do things like this.
We don't always have to put everything inside our components. Of course, most of
our web application's markup is going to go into our component, and all of our web
application's logic is also going to go in there. But if we have some static markups,
some static data like the header, we can put it right into the index.html file.

## public/ Folder 

We can store images in the public/ folder and then *directly reference* them from our index.html or index.css files. The
reason for that is that images (or, in general, files) stored in public/ are made publicly available by the underlying
project development server & build process. Just like index.html, those files can directly be visited from the browser
and can therefore also be requested by other files.

If we try to load 'localhost:5173/some-image.jpg', we'll be able tgo see that image if it exists in public/ folder.

### The src/assets/ Folder

We can also store images in the src/assets/ folder (or, actually, anywhere in the src folder).

So what is the difference compared to public/ ?

Any files (of any format) stored in `src` (or sub-folders like `src/assets/`) are not made available for the public. They
can't be accessed by website visitors. If we try loading `localhost:5173/src/assets/some-image.jpg`. We get an error.

Instead, files stored in `src/` (and sub-folders) can be used in our code files. Images imported into code files are then
picked up by the underlying build process, potentially optimized, and kind of *injected* into the `public/` folder right
before serving the website. Links to those images are automatically generated and used in the places where we referenced
the imported images.

### So which folder should we use? 

We use use `public/` folder for any images that should not be handled by the build process and that should be generally
available. Good candidates are images used in the `index.html` file or favicons.

On other hand, images that are used inside components should typically be stored in the `src/` folder (e.g. in `src/assets/`)

## Initial App.jsx component

We will start by creating the overall structure of this component.

The main tic-tac-toe game will consist of a main where we have the `Player`, the `Game Board` inside a div and outside of
that div, the logs of that game

The players will consist of a `ol` element, because the order matters.

That `ol` will be styled as a flex container, with no padding and a margin that will separate that component from the top
and bottom. And be justified between, for both elements to have the same spacing.

## Concept Repetition: Splitting components & Building reusable components

Next to the players li, we will have a Button to edit each player's name. But as we can see, the "exact" same code for each
player will be repeated. Even though there will be only one repetition. In order to make the code clearer and easier to
maintain. We should create a component for this, and only change the properties

## Concept Repetition: Working with state

Now, what we will do is to show an input field, whenever the Edit button is clicked.

Here i had two approaches

### My Approach

I've created two states, one named isEditing, and the other playerName

The approach i took was to, whenever clicking on the edit button, changing the isEditing state to true, which would lead
to the input being displayed. Then, based on that input element, whatever was being typed would change the playerName
state, based on a onChange property

To keep the reference from the input being passed. in the span that displayed the player's name, i would use

{ name || playerName}. Which means that, use the name received as property in case the name wasn't edited.

### Instructor's Approach

The instructor didn


## Component Instances: Work in Isolation

