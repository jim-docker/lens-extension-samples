import React from "react";
import { Component, K8sApi, Navigation} from "@k8slens/extensions";

export interface NamespaceMenuItemProps extends Component.KubeObjectMenuProps<K8sApi.Namespace> {
}

export function NamespaceMenuItem(props: NamespaceMenuItemProps) {
  const { object: namespace, toolbar } = props;
  if (!namespace) return null;

  const namespaceName = namespace.getName();

  const sendToTerminal = (command: string) => {
    Component.terminalStore.sendCommand(command, {
      enter: true,
      newTab: true,
    });
    Navigation.hideDetails();
  };

  const getPods = () => {
    sendToTerminal(`kubectl get pods -n ${namespaceName}`);
  };

  return (
    <Component.MenuItem onClick={getPods}>
    <Component.Icon svg="ssh" interactive={toolbar} title="Get pods in terminal"/>
    <span className="title">Get Pods</span>
    </Component.MenuItem>
  );
}
