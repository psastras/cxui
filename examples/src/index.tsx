import * as React from "react";
import * as ReactDOM from "react-dom";
import { cxui } from "../../lib";

namespace App {
  export interface Props {}
  export interface State {}
}

class _App extends React.Component<App.Props & cxui.InjectedProps, App.State> {
  render(): JSX.Element {
    console.log(this.props.ui);
    return <div>Foo</div>;
  }
}

const App = cxui({
  key: "App",
  state: {
    foo: "bar"
  }
})(_App);

ReactDOM.render(<App />, document.getElementById("root"));
