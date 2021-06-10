import { Common, Renderer } from "@k8slens/extensions";
import { ExampleIcon, ExamplePage, HelpPage, HelpIcon } from "./src/example-page"
import { ExempleIcon, ExemplePage } from "./src/exemple-page"
import { ExampleResourceStackSettings } from "./src/example-resource-stack-settings"
import { ExamplePreferenceHint, ExamplePreferenceInput } from "./src/example-preference";
import { examplePreferencesStore } from "./src/example-preference-store";
import { NamespaceMenuItem } from "./src/namespace-menu-item"
import { NamespaceDetailsItem } from "./src/namespace-details-item"
import React from "react"

export default class ExampleExtension extends Renderer.LensExtension {
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
          onClick={() => Renderer.Navigation.navigate("help")}
        >
          <HelpIcon />
          My Status Bar Item
        </div>
      ),
    },
  ];

  entitySettings = [
    {
      apiVersions: ["entity.k8slens.dev/v1alpha1"],
      kind: "KubernetesCluster",
      title: "Example Resource Stack",
      priority: 5,
      components: {
        View: ({ entity = null }: { entity: Common.Catalog.KubernetesCluster}) => {
          return (
            <ExampleResourceStackSettings cluster={entity} />
          );
        }
      }
    }
  ];

  appPreferences = [
    {
      title: "Example Preferences",
      components: {
        Input: () => <ExamplePreferenceInput preference={examplePreferencesStore}/>,
        Hint: () => <ExamplePreferenceHint/>
      }
    }
  ];
  
  kubeObjectMenuItems = [
    {
      kind: "Namespace",
      apiVersions: ["v1"],
      components: {
        MenuItem: (props: Renderer.Component.KubeObjectMenuProps<Renderer.K8sApi.Namespace>) => <NamespaceMenuItem {...props} />
      }
    }
  ];

  kubeObjectDetailItems = [
    {
      kind: "Namespace",
      apiVersions: ["v1"],
      priority: 10,
      components: {
        Details: (props: Renderer.Component.KubeObjectDetailsProps<Renderer.K8sApi.Namespace>) => <NamespaceDetailsItem {...props} />
      }
    }
  ];

  async onActivate() {
    console.log("hello world");

    // load the extension's store to start with the saved state
    await examplePreferencesStore.loadExtension(this);
  }
}
