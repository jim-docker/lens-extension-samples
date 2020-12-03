import { Component } from "@k8slens/extensions";
import { observer } from "mobx-react";
import React from "react";

export class ExamplePreferenceProps {
  preference: {
    enabled: boolean;
  }
}

@observer
export class ExamplePreferenceInput extends React.Component<ExamplePreferenceProps> {

  render() {
    const { preference } = this.props;
    return (
      <Component.Checkbox
        label="I understand appPreferences"
        value={preference.enabled}
        onChange={v => { preference.enabled = v; }}
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
