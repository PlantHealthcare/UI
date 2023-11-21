import {Injectable} from '@angular/core';
import {Plant, PlantSpecies} from "../plant/plant-database/plant-database.component";
import {Device} from "../device/devices-list/devices-list.component";
import {User} from "../user/user-list/user-list.component";
import App = Realm.App;

@Injectable({
  providedIn: 'root'
})
export class MongoService {
  mongoConnection: any
  userValue:User;
  constructor() {
  }

  setDatabaseConnection(app: App<Realm.DefaultFunctionsFactory & Realm.BaseFunctionsFactory, SimpleObject>, user:User) {
    this.userValue = user;
    if (app.currentUser) {
      this.mongoConnection = app.currentUser.mongoClient("mongodb-atlas");
    }
  }

  //endpoints

 /* async getUserData() {
    const collection = this.mongoConnection.db("PlantHealthcare").collection("users");
    return await collection.find({user});
  }*/

  async listUsers() {
    const collection = this.mongoConnection.db("PlantHealthcare").collection("users");
    return await collection.find();
  }

  async listPlantSpecies(): Promise<PlantSpecies[]> {
    const collection = this.mongoConnection.db("PlantHealthcare").collection("plantspecies");
    return await collection.find();
  }

  async listUserPlants() {
    const collection = this.mongoConnection.db("PlantHealthcare").collection("userplants");
    const id = this.userValue.user_id;
    return await collection.find({user_id: this.userValue.user_id});
  }

  async addPlantSpecie(plantSpecie: PlantSpecies) {
    const collection = this.mongoConnection.db("PlantHealthcare").collection("plantspecies");
    return await collection.insertOne({ ...plantSpecie});
  }

  async getPlantSpecieTypes() {
   /* const collection = this.mongoConnection.db("PlantHealthcare").collection("plantspecies");
    return await collection.insertOne({ ...plantSpecie});*/
    return [{label:'plant1', plantspecies_id : '1'},{label:'plant2', plantspecies_id : '2'},{label:'plant3', plantspecies_id : '3'}]
  }

  async addUserPlant(plant: Plant) {
    const collection_user_plants = this.mongoConnection.db("PlantHealthcare").collection("userplants");
    await collection_user_plants.insertOne({...plant});
  }

/*  async deleteUserPlant(device: Device) {
    const collection = this.mongoConnection.db("PlantHealthcare").collection("devices");
    const id = this.auth.userValue.user_is;
    return await collection.insertOne({...device});
  }*/

  async listUserDevices() {
    const collection = this.mongoConnection.db("PlantHealthcare").collection("userdevices");
    const id = this.userValue.user_id;
    return await collection.find({user_id: this.userValue.user_id});
  }

  async addUserDevices(device: Device) {
    const collection = this.mongoConnection.db("PlantHealthcare").collection("userdevices");
    const id = this.userValue.user_id;
    return await collection.insertOne({...device});
  }

  async deleteUserDevice(device: Device) {
    const collection = this.mongoConnection.db("PlantHealthcare").collection("userdevices");
    const id = this.userValue.user_id;
    return await collection.deleteOne({ id: device.id});
  }


}
