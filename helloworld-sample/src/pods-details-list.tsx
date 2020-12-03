import React from "react";
import { Component, K8sApi } from "@k8slens/extensions";

interface Props {
  pods: K8sApi.Pod[];
}

export class PodsDetailsList extends React.Component<Props> {

  getTableRow(index: number) {
      const {pods} = this.props;
      return (
          <Component.TableRow key={index} nowrap>
              <Component.TableCell className="podName">{pods[index].getName()}</Component.TableCell>
              <Component.TableCell className="podAge">{pods[index].getAge()}</Component.TableCell>
              <Component.TableCell className="podStatus">{pods[index].getStatus()}</Component.TableCell>
          </Component.TableRow>
      )
  }

  render() {
      const {pods} = this.props
      if (!pods?.length) {
          return null;
      }

      return (
          <div >
              <Component.Table>
                  <Component.TableHead>
                      <Component.TableCell className="podName">Name</Component.TableCell>
                      <Component.TableCell className="podAge">Age</Component.TableCell>
                      <Component.TableCell className="podStatus">Status</Component.TableCell>
                  </Component.TableHead>
                  {
                      pods.map((pod, index) => this.getTableRow(index))
                  }
              </Component.Table>
          </div>
      )
  }
}