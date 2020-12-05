import { Store } from "@k8slens/extensions";
import { observable, toJS } from "mobx";

export type ExamplePreferencesModel = {
  enabled: boolean;
};

export class ExamplePreferencesStore extends Store.ExtensionStore<ExamplePreferencesModel> {

  @observable  enabled = false;

  private constructor() {
    super({
      configName: "example-preferences-store",
      defaults: {
        enabled: false
      }
    });
  }

  // this method is called when the store is loaded, and gives the extension the opportunity to 
  // retrieve the stored state data values 
  protected fromStore({ enabled }: ExamplePreferencesModel): void {
    this.enabled = enabled;
  }

  // this method is called when the store is being saved. The output must be the state data values
  // serialized to JSON
  toJSON(): ExamplePreferencesModel {
    return toJS({
      enabled: this.enabled
    }, {
      recurseEverything: true
    });
  }
}

export const examplePreferencesStore = ExamplePreferencesStore.getInstance<ExamplePreferencesStore>();
