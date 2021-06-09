import React from "react";
import { Renderer } from "@k8slens/extensions";

interface Props {
  pods: Renderer.K8sApi.Pod[];
}

export class PodsDetailsList extends React.Component<Props> {

  getTableRow(index: number) {
      const {pods} = this.props;
      return (
          <Renderer.Component.TableRow key={index} nowrap>
              <Renderer.Component.TableCell className="podName">{pods[index].getName()}</Renderer.Component.TableCell>
              <Renderer.Component.TableCell className="podAge">{pods[index].getAge()}</Renderer.Component.TableCell>
              <Renderer.Component.TableCell className="podStatus">{pods[index].getStatus()}</Renderer.Component.TableCell>
          </Renderer.Component.TableRow>
      )
  }

  render() {
      const {pods} = this.props
      if (!pods?.length) {
          return null;
      }

      return (
          <div >
              <Renderer.Component.Table>
                  <Renderer.Component.TableHead>
                      <Renderer.Component.TableCell className="podName">Name</Renderer.Component.TableCell>
                      <Renderer.Component.TableCell className="podAge">Age</Renderer.Component.TableCell>
                      <Renderer.Component.TableCell className="podStatus">Status</Renderer.Component.TableCell>
                  </Renderer.Component.TableHead>
                  {
                      pods.map((pod, index) => this.getTableRow(index))
                  }
              </Renderer.Component.Table>
          </div>
      )
  }
}