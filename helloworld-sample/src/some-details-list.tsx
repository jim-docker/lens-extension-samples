import React from "react";
import { Component } from "@k8slens/extensions";

export class MyObject {
    name: string
    namespace: string
}

interface Props {
    something: MyObject[];
}

export class SomeDetailsList extends React.Component<Props> {

    getTableRow(index: number) {
    const { something } = this.props;
    return (
      <Component.TableRow
        key={something[index].name}
        nowrap
      >
        <Component.TableCell className="name">{something[index].name}</Component.TableCell>
        <Component.TableCell className="namespace">{something[index].namespace}</Component.TableCell>
      </Component.TableRow>
    );
  }

  render() {
    const { something } = this.props;
    return (
      <div >
        <Component.DrawerTitle title="Some things"/>
        <Component.Table
          className="box grow"
        >
          <Component.TableHead>
            <Component.TableCell className="name">Name</Component.TableCell>
            <Component.TableCell className="namespace">Namespace</Component.TableCell>
          </Component.TableHead>
          {
            something.map((thing, index) => this.getTableRow(index))
          }
        </Component.Table>
      </div>
    );
  }
}
