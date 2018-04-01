import * as React from "react";

export namespace cxui {
  export interface Options {
    key?: string;
    state: any;
  }
  // props of the component created by the HOC. They are not passed to the wrapped component
  export interface ExternalProps {}
  // props that the HOC adds to the wrapped component. They are calculated based on the HOC state and ExternalProps
  export interface InjectedProps {
    ui: object;
  }
  export interface State {}
}

export const cxui = ({
  key = `${Math.floor(Math.random() * (1 << 30)).toString(16)}`,
  state = {}
}: cxui.Options) => <TOriginalProps extends {}>(
  Component:
    | React.ComponentClass<TOriginalProps & cxui.InjectedProps>
    | React.StatelessComponent<TOriginalProps & cxui.InjectedProps>
) => {
  type ResultProps = TOriginalProps & cxui.ExternalProps;

  const { Provider, Consumer } = (React as any).createContext({
    ui: {
      [key]: state
    }
  });

  const result = class CXUI extends React.Component<ResultProps, cxui.State> {
    static displayName = `CXUI(${Component.displayName ||
      (Component as any).name})`;

    mergedContext: cxui.InjectedProps = { ui: {} };

    constructor(props: ResultProps) {
      super(props);
    }

    getMergedContexts = (
      ctxa: cxui.InjectedProps,
      ctxb: cxui.InjectedProps
    ): cxui.InjectedProps => {
      this.mergedContext = {
        ui: ctxb.ui
      };
      return this.mergedContext;
    };

    render(): JSX.Element {
      return (
        <Consumer>
          {(cx: cxui.InjectedProps) => (
            <Provider ui={this.getMergedContexts(cx, cx).ui}>
              <Component
                ui={this.getMergedContexts(cx, cx).ui}
                {...this.props}
                {...this.state}
              />
            </Provider>
          )}
        </Consumer>
      );
    }
  };

  return result;
};
