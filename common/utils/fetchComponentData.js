// when a route is matched, we loop through all its components and
// look for static loadAsyncData() methods, executing any we find
// and passing in any params. Once all loadAsyncData() methods have
// fulfiled their promises, we render the components to HTML and
// serialize the state to JSON and inject it into the page

export default function fetchComponentData(dispatch, components, params) {
  return Promise.all(
    components
      .filter(component => component.loadAsyncData)
      .map(component => component.loadAsyncData(dispatch))
  );
}
