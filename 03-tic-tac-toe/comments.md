## Intro

Even though the game might not look too complex, there are many important patterns and important concepts we can explore
while building this game.

## Not all content must go inside of components

Instead of defining the initial HTML inside the App.jsx, we are going to grab that code we would add inside the App
component and add it into the index.html. 

In the end, that index.html is the file that holds the div with id root and is the one that all of our app is rendered
inside. But when working with React, we can still add more markup to that file, if we need more markup in there.

We can define headers in the index.html, in case it does not contain any state or prop that defines what is going to be
displayed in there.

When working with react, 