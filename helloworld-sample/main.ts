import { LensMainExtension } from "@k8slens/extensions";
import { examplePreferencesStore } from "./src/example-preference-store";

export default class ExampleMainExtension extends LensMainExtension {
  async onActivate() {
    console.log('helloworld-sample activated');

    // load the extension's store in the main process since loaded
    // stores are saved automatically in the main process when Lens exits
    await examplePreferencesStore.loadExtension(this);
  }

  onDeactivate() {
    console.log('helloworld-sample de-activated');
  }
}
