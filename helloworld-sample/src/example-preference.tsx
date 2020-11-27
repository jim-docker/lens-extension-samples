import { Component } from "@k8slens/extensions";
import React from "react";

export class ExamplePreferenceInput extends React.Component<{preference: {enabled: boolean}}, {}> {
  constructor(props: any) {
    super(props);
    this.state = {enabled: props.preference.enabled};
  }

  render() {
    const { preference } = this.props;
    return (
      <Component.Checkbox
        label="I understand appPreferences"
        value={preference.enabled}
        onChange={v => { preference.enabled = v; this.setState({enabled: v}); }}
      />
    );
  }
}

export class ExamplePreferenceHint extends React.Component {
  render() {
    return (
      <span>This is an example of an appPreference for extensions.</span>
    );
  }
}