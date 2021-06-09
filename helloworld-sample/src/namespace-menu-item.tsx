import React from "react";
import { Renderer } from "@k8slens/extensions";

export function NamespaceMenuItem(props: Renderer.Component.KubeObjectMenuProps<Renderer.K8sApi.Namespace>) {
  const { object: namespace, toolbar } = props;
  if (!namespace) return null;

  const namespaceName = namespace.getName();

  const sendToTerminal = (command: string) => {
    Renderer.Component.terminalStore.sendCommand(command, {
      enter: true,
      newTab: true,
    });
    Renderer.Navigation.hideDetails();
  };

  const getPods = () => {
    sendToTerminal(`kubectl get pods -n ${namespaceName}`);
  };

  return (
    <Renderer.Component.MenuItem onClick={getPods}>
    <Renderer.Component.Icon material="speaker_group" interactive={toolbar} title="Get pods in terminal"/>
    <span className="title">Get Pods</span>
    </Renderer.Component.MenuItem>
  );
}
