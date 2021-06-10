/**
 * Copyright (c) 2021 OpenLens Authors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
 import React from "react";
 import { Common, Renderer } from "@k8slens/extensions";
 import { observer } from "mobx-react";
 import { computed, observable, makeObservable } from "mobx";
 import { ExampleResourceStack } from "./example-resource-stack";
 
 const {
   K8sApi: {
     forCluster, StatefulSet, DaemonSet, Deployment,
   },
   Component: {
     SubTitle, Button,
   }
 } = Renderer;
 
 interface Props {
   cluster: Common.Catalog.KubernetesCluster;
 }
 
 @observer
 export class ExampleResourceStackSettings extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    makeObservable(this);
  }

  @observable installed = false;
  @observable inProgress = false;

  feature: ExampleResourceStack;

  async componentDidMount() {
    this.feature = new ExampleResourceStack(this.props.cluster);

    await this.updateFeatureState();
  }
 
  async updateFeatureState() {
    this.installed = await this.feature.isInstalled();
  }
 
   async save() {
    this.inProgress = true;
 
    try {
      if (this.installed) {
        await this.feature.uninstall();
      } else {
        await this.feature.install();
      }
    } finally {
      this.inProgress = false;

      await this.updateFeatureState();
    }
  }
 
  @computed get buttonLabel() {
    if (this.inProgress && this.installed) return "Uninstalling ...";
    if (this.inProgress) return "Applying ...";
    
    if (this.installed) {
      return "Uninstall";
    }

    return "Apply";
  }
 
  render() {
    return (
      <>
        <section>
          <SubTitle title="Example Resource Stack" />
          <Button
            label={this.buttonLabel}
            waiting={this.inProgress}
            onClick={() => this.save()}
            primary />
        </section>
      </>
    );
  }
}
 