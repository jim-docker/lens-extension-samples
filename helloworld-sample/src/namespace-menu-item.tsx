import React from "react";
import { Component, K8sApi, Navigation} from "@k8slens/extensions";

export function NamespaceMenuItem(props: Component.KubeObjectMenuProps<K8sApi.Namespace>) {
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
    <Component.Icon material="speaker_group" interactive={toolbar} title="Get pods in terminal"/>
    <span className="title">Get Pods</span>
    </Component.MenuItem>
  );
}
