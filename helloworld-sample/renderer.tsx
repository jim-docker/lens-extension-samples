import { LensRendererExtension, Component, K8sApi } from "@k8slens/extensions";
import { ExampleIcon, ExamplePage, HelpPage, HelpIcon } from "./src/example-page"
import { ExempleIcon, ExemplePage } from "./src/exemple-page"
import { ExampleNamespaceDetails } from "./src/example-namespace-details"
import { ExampleFeature } from "./src/example-feature"
import { ExamplePreference, ExamplePreferenceHint, ExamplePreferenceInput } from "./src/example-preference";
import { NamespaceMenuItem, NamespaceMenuItemProps } from "./src/namespace-menu-item"
import { observable } from "mobx";
import React from "react"

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

  statusBarItems = [
    {
      item: (
        <div
          className="flex align-center gaps hover-highlight"
          onClick={() => this.navigate("help")}
        >
          <HelpIcon />
          My Status Bar Item
        </div>
      ),
    },
  ];

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

  @observable preference: ExamplePreference = { enabled: false };

  appPreferences = [
    {
      title: "Example Preferences",
      components: {
        Input: () => <ExamplePreferenceInput preference={this.preference}/>,
        Hint: () => <ExamplePreferenceHint/>
      }
    }
  ];
  
  kubeObjectMenuItems = [
    {
      kind: "Namespace",
      apiVersions: ["v1"],
      components: {
        MenuItem: (props: NamespaceMenuItemProps) => <NamespaceMenuItem {...props} />
      }
    }
  ];

  kubeObjectDetailItems = [
    {
      kind: "Namespace",
      apiVersions: ["v1"],
      priority: 10,
      components: {
        Details: (props: Component.KubeObjectDetailsProps<K8sApi.Namespace>) => <ExampleNamespaceDetails {...props} />
      }
    }
  ];

  async onActivate() {
    console.log("hello world")
  }
}
