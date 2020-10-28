import { LensRendererExtension } from "@k8slens/extensions";
import { ExampleIcon, ExamplePage } from "./page"
import React from "react"

export default class ExampleExtension extends LensRendererExtension {
  clusterPages = [
    {
      path: "/extension-example",
      title: "Hello World",
      components: {
        Page: () => <ExamplePage extension={this}/>,
        MenuIcon: ExampleIcon,
      }
    }
  ]
}
