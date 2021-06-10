import { Renderer, Common } from "@k8slens/extensions";
import * as path from "path";

const {
  K8sApi: {
    ResourceStack, 
    forCluster, 
    Pod,
  }
} = Renderer;

type ResourceStack = Renderer.K8sApi.ResourceStack;
type Pod = Renderer.K8sApi.Pod;
type KubernetesCluster = Common.Catalog.KubernetesCluster;

export class ExampleResourceStack {
  protected stack: ResourceStack;

  constructor(protected cluster: KubernetesCluster) {
    this.stack = new ResourceStack(cluster, "example-resource-stack");
  }

  get resourceFolder() {
    return path.join(__dirname, "../resources/");
  }

  install(): Promise<string> {
    console.log("installing example-pod");
    return this.stack.kubectlApplyFolder(this.resourceFolder);
  }

  async isInstalled(): Promise<boolean> {
    try {
      const podApi = forCluster(this.cluster, Pod);
      const examplePod = await podApi.get({name: "example-pod", namespace: "default"});
      
      if (examplePod?.kind) {
        console.log("found example-pod");
        return true;
      }
    } catch(e) {
      console.log("Error getting example-pod:", e);
    }
    console.log("didn't find example-pod");
    
    return false;
  }

  async uninstall(): Promise<string> {
    console.log("uninstalling example-pod");
    return this.stack.kubectlDeleteFolder(this.resourceFolder);
  }
}