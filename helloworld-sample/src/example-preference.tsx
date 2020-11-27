import { Component } from "@k8slens/extensions";
import { observer } from "mobx-react";
import React from "react";

export type ExamplePreference  = {
  enabled: boolean;
}

@observer
export class ExamplePreferenceInput extends React.Component<{preference: ExamplePreference}, {}> {

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