import { Renderer } from "@k8slens/extensions";
import { PodsDetailsList } from "./pods-details-list";
import React from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";

@observer
export class NamespaceDetailsItem extends React.Component<Renderer.Component.KubeObjectDetailsProps<Renderer.K8sApi.Namespace>> {

  @observable private pods: Renderer.K8sApi.Pod[];

  async componentDidMount() {
    this.pods = await Renderer.K8sApi.podsApi.list({namespace: this.props.object.getName()});
  }

  render() {
    return (
      <div>
        <Renderer.Component.DrawerTitle title="Pods" />
        <PodsDetailsList pods={this.pods}/>
      </div>
    )
  }
}
