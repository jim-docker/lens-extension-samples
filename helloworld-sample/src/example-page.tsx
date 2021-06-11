import { Renderer } from "@k8slens/extensions";
import { CoffeeDoodle } from "react-open-doodles";
import path from "path";
import React from "react"

export function ExampleIcon(props: Renderer.Component.IconProps) {
  return <Renderer.Component.Icon {...props} material="pages" tooltip={path.basename(__filename)}/>
}

export class ExamplePage extends React.Component<{ extension: Renderer.LensExtension }> {
  render() {
    const doodleStyle = {
      width: "200px"
    }
    return (
      <div className="flex column gaps align-flex-start">
        <div style={doodleStyle}><CoffeeDoodle accent="#3d90ce" /></div>
        <p>Hello world!</p>
        <p>File: <i>{__filename}</i></p>
      </div>
    )
  }
}

export function HelpIcon(props: Renderer.Component.IconProps) {
  return <Renderer.Component.Icon {...props} material="help"/>
}

export class HelpPage extends React.Component<{ extension: Renderer.LensExtension }> {
  private from: string;

  render() {
    const urlParams = new URLSearchParams(location.search);
    this.from = urlParams.get("from") as string;

    return (
      <div className="flex box grow" >
        <h1 className="box center" ><p>Example Global Page (came from {this.from})</p></h1>
      </div>
    )
  }
}

