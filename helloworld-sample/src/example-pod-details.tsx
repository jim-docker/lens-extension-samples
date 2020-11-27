import { Component, K8sApi } from "@k8slens/extensions";
import { MyObject, SomeDetailsList } from "./some-details-list"
import React from "react";

const myList: MyObject[] = [
  {
    name: "Fred",
    namespace: "Fredspace"
  },
  {
    name: "Ted",
    namespace: "Tedspace"
  },
  {
    name: "Ed",
    namespace: "Edspace"
  },
  {
    name: "Ned",
    namespace: "Nedspace"
  }
]

export class ExamplePodDetails extends React.Component<Component.KubeObjectDetailsProps<K8sApi.Pod>> {
  render() {
    return (
      <div>
        <Component.DrawerTitle title="Hello" />
        <Component.DrawerItem name="Message">
          Hello { this.props.object.getName() }!
        </Component.DrawerItem>
        <Component.DrawerItem name="Somethings">
        <SomeDetailsList something={myList}/>
        </Component.DrawerItem>
      </div>
    )
  }
}
