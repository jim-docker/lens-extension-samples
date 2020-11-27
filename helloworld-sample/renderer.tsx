import { LensRendererExtension, Component, K8sApi } from "@k8slens/extensions";
import { ExampleIcon, ExamplePage, HelpPage, HelpIcon } from "./src/example-page"
import { ExempleIcon, ExemplePage } from "./src/exemple-page"
import { ExamplePodDetails } from "./src/example-pod-details"
import { ExampleFeature } from "./src/example-feature"
import { ExamplePreferenceHint, ExamplePreferenceInput } from "./src/example-preference";
import React from "react"

const preference: { enabled: boolean } = { enabled: false };

export default class ExampleExtension extends LensRendererExtension {
  clusterPages = [
    {
      id: "hello",
      components: {
        Page: () => <ExamplePage extension={this}/>,
      }
    },
    {
      id: "bonjour", 
      components: {
        Page: () => <ExemplePage extension={this}/>,
      }
    }
  ]

  clusterPageMenus = [
    {
      id: "example",
      title: "Greetings",
      components: {
        Icon: ExampleIcon,
      }
    },
    {
      parentId: "example",
      target: { pageId: "hello" },
      title: "Hello World",
      components: {
        Icon: ExampleIcon,
      }
    },
    {
      parentId: "example",
      target: { pageId: "bonjour" },
      title: "Bonjour le monde",
      components: {
        Icon: ExempleIcon,
      }
    }
  ];

  globalPages = [
    {
      id: "help",
      components: {
        Page: HelpPage,
      }
    }
  ];

  globalPageMenus = [
    {
      target: { pageId: "help" },
      title: "Help",
      components: {
        Icon: HelpIcon,
      }
    },
  ];

  kubeObjectDetailItems = [
    {
      kind: "Pod",
      apiVersions: ["v1"],
      priority: 10,
      components: {
        Details: (props: Component.KubeObjectDetailsProps<K8sApi.Pod>) => <ExamplePodDetails {...props} />
      }
    }
  ]

  clusterFeatures = [
    {
      title: "Example Feature",
      components: {
        Description: () => {
          return (
            <span>
                Enable an example feature.
            </span>
          )
        }
      },
      feature: new ExampleFeature()
    }
  ];

  appPreferences = [
    {
      title: "Example Preferences",
      components: {
        Input: () => <ExamplePreferenceInput preference={preference}/>,
        Hint: () => <ExamplePreferenceHint/>
      }
    }
  ];
  
  async onActivate() {
    console.log("hello world")
  }
}
