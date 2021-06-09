import { Renderer } from "@k8slens/extensions";
import { LevitateDoodle } from "react-open-doodles";
import path from "path";
import React from "react"

export function ExempleIcon(props: Renderer.Component.IconProps) {
  return <Renderer.Component.Icon {...props} material="waves" tooltip={path.basename(__filename)}/>
}

export class ExemplePage extends React.Component<{ extension: Renderer.LensExtension }> {
  render() {
    const doodleStyle = {
      width: "200px"
    }
    return (
      <div className="flex column gaps align-flex-start">
        <div style={doodleStyle}><LevitateDoodle accent="#3d90ce" /></div>
        <p>Bonjour le monde!</p>
        <p>File: <i>{__filename}</i></p>
      </div>
    )
  }
}
