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

export class ExampleNamespaceDetails extends React.Component<Component.KubeObjectDetailsProps<K8sApi.Namespace>> {

  render() {
/*
    const pod = K8sApi.forCluster(cluster, K8sApi.Pod);
    try {
      const pods = await pod.list({namespace: "example-pod"});
    } catch {

    }
*/    
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
/*
interface Props {
  title: string;
  checks: Check[];
}

export class ChecksList extends React.Component<Props> {

  getTableRow(index: number) {
      const {checks} = this.props;
      return (
          <Component.TableRow key={checks[index].checkID} nowrap>
              <Component.TableCell className="checkSuccess">{"" + checks[index].success}</Component.TableCell>
              <Component.TableCell className="checkID">{checks[index].checkID}</Component.TableCell>
              <Component.TableCell className="checkSeverity">{checks[index].severity}</Component.TableCell>
              <Component.TableCell className="checkCategory">{checks[index].category}</Component.TableCell>
          </Component.TableRow>
      )
  }

  render() {
      const {checks, title} = this.props
      if (!checks.length) {
          return null;
      }

      return (
          <div className="PodDetailsContainer">
              {1 === 1 &&
              <div className="pod-container-title">
                  <Component.StatusBrick
                      className="error"/>{title}
              </div>}

              <Component.DrawerItem name="Checks">
                  <Component.DrawerParamToggler label={checks.length}>
                      <Component.Table>
                          <Component.TableHead>
                              <Component.TableCell className="checkSuccess">Success</Component.TableCell>
                              <Component.TableCell className="checkID">ID</Component.TableCell>
                              <Component.TableCell className="checkSeverity">Severity</Component.TableCell>
                              <Component.TableCell className="checkCategory">Category</Component.TableCell>
                          </Component.TableHead>
                          {
                              checks.map((check, index) => this.getTableRow(index))
                          }
                      </Component.Table>
                  </Component.DrawerParamToggler>
              </Component.DrawerItem>

          </div>
      )
  }
}
*/