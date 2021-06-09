import { Common, Renderer } from "@k8slens/extensions";
import * as path from "path";

export class ExampleFeature extends ClusterFeature.Feature {

  async install(cluster: Common.Catalog.KubernetesCluster): Promise<void> {

    super.applyResources(cluster, path.join(__dirname, "../resources/"));
  }

  async upgrade(cluster: Common.Catalog.KubernetesCluster): Promise<void> {
    return this.install(cluster);
  }

  async updateStatus(cluster: Common.Catalog.KubernetesCluster): Promise<ClusterFeature.FeatureStatus> {
    try {
      const pod = Renderer.K8sApi.forCluster(cluster, Renderer.K8sApi.Pod);
      const examplePod = await pod.get({name: "example-pod", namespace: "default"});
      if (examplePod?.kind) {
        this.status.installed = true;
        this.status.currentVersion = examplePod.spec.containers[0].image.split(":")[1];
        this.status.canUpgrade = true;  // a real implementation would perform a check here that is relevant to the specific feature 
      } else {
        this.status.installed = false;
        this.status.canUpgrade = false;
      }
    } catch(e) {
      if (e?.error?.code === 404) {
        this.status.installed = false;
      }
    }

    return this.status;
  }

  async uninstall(cluster: Common.Catalog.KubernetesCluster): Promise<void> {
    const podApi = Renderer.K8sApi.forCluster(cluster, Renderer.K8sApi.Pod);
    await podApi.delete({name: "example-pod", namespace: "default"});
  }
}