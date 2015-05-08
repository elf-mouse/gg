React Element Factories and JSX
-------------------------------

You probably came here because your code is calling your component as a plain function call. This is now deprecated:

```javascript
var MyComponent = require('MyComponent');

function render() {
  return MyComponent({ foo: 'bar' });  // WARNING
}
```

__JSX__

React components can no longer be called directly like this. Instead [you can use JSX](http://facebook.github.io/react/docs/jsx-in-depth.html).

```javascript
var React = require('react');
var MyComponent = require('MyComponent');

function render() {
  return <MyComponent foo="bar" />;
}
```

__Without JSX__

If you don't want to, or can't use JSX, then you'll need to wrap your component in a factory before calling it:

```javascript
var React = require('react');
var MyComponent = React.createFactory(require('MyComponent'));

function render() {
  return MyComponent({ foo: 'bar' });
}
```

This is an easy upgrade path if you have a lot of existing function calls.

__Dynamic components without JSX__

If you get a component class from a dynamic source, then it might be unnecessary to create a factory that you immediately invoke. Instead you can just create your element inline:

```javascript
var React = require('react');

function render(MyComponent) {
  return React.createElement(MyComponent, { foo: 'bar' });
}
```

__In Depth__

[Read more about WHY we're making this change.](https://gist.github.com/sebmarkbage/d7bce729f38730399d28)
