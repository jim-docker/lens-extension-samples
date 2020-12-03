import { Component, K8sApi } from "@k8slens/extensions";
import { PodsDetailsList } from "./pods-details-list";
import React from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";

@observer
export class NamespaceDetailsItem extends React.Component<Component.KubeObjectDetailsProps<K8sApi.Namespace>> {

  @observable private pods: K8sApi.Pod[];

  async componentDidMount() {
    this.pods = await K8sApi.podsApi.list({namespace: this.props.object.getName()});
  }

  render() {
    return (
      <div>
        <Component.DrawerTitle title="Pods" />
        <PodsDetailsList pods={this.pods}/>
      </div>
    )
  }
}
