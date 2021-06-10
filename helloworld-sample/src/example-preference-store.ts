import { Common } from "@k8slens/extensions";
import { action, makeObservable, observable, toJS } from "mobx";

export type ExamplePreferencesModel = {
  enabled: boolean;
};

export class ExamplePreferencesStore extends Common.Store.ExtensionStore<ExamplePreferencesModel> {

  @observable  enabled = false;

  public constructor() {
    super({
      configName: "example-preferences-store",
      defaults: {
        enabled: false
      }
    });
    makeObservable(this);
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
    });
  }
}

export const examplePreferencesStore = ExamplePreferencesStore.createInstance();
