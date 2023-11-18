import {Injectable} from '@angular/core';
import App = Realm.App;
import {AuthService} from "./auth.service";
import {Plant} from "../plant/plant-database/plant-database.component";
import {Device} from "../device/devices-list/devices-list.component";
import {User} from "../user/user-list/user-list.component";

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


  async listUsers() {
    const collection = this.mongoConnection.db("PlantHealthcare").collection("users");
    return await collection.find();
  }

  async listPlants(): Promise<Plant[]> {
    const collection = this.mongoConnection.db("PlantHealthcare").collection("plant-species");
    return await collection.find();
  }

  async listUserPlants() {
    const collection = this.mongoConnection.db("PlantHealthcare").collection("user-plants");
    const id = this.userValue.id;
    return await collection.find({user_id: this.userValue.id});
  }

  async addUserPlant(plant: Plant) {
    const collection_user_plants = this.mongoConnection.db("PlantHealthcare").collection("user-plants");
    const collection_plants = this.mongoConnection.db("PlantHealthcare").collection("plants");
    await collection_user_plants.insertOne({...plant});
    await collection_plants.insertOne({...plant});
  }

/*  async deleteUserPlant(device: Device) {
    const collection = this.mongoConnection.db("PlantHealthcare").collection("devices");
    const id = this.auth.userValue.id;
    return await collection.insertOne({...device});
  }*/

  async listUserDevices() {
    const collection = this.mongoConnection.db("PlantHealthcare").collection("devices");
    const id = this.userValue.id;
    return await collection.find({user_id: this.userValue.id});
  }

  async addUserDevices(device: Device) {
    const collection = this.mongoConnection.db("PlantHealthcare").collection("devices");
    const id = this.userValue.id;
    return await collection.insertOne({...device});
  }

  async deleteUserDevice(device: Device) {
    const collection = this.mongoConnection.db("PlantHealthcare").collection("devices");
    const id = this.userValue.id;
    return await collection.deleteOne({ id: device.id});
  }
}
