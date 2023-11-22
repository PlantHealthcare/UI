import {Injectable} from '@angular/core';
import {PlantSpecies} from "../plant/plant-database/plant-database.component";
import {Device} from "../device/devices-list/devices-list.component";
import {User} from "../user/user-list/user-list.component";
import App = Realm.App;
import {UserPlantRequest} from "../plant/user-plant-form/user-plant-form.component";

@Injectable({
  providedIn: 'root'
})
export class MongoService {
  mongoConnection: any
  userValue:User;
  constructor() {
  }

  async setDatabaseConnection(app: App<Realm.DefaultFunctionsFactory & Realm.BaseFunctionsFactory, SimpleObject>, user: User) {
    this.userValue = user;
    if (app.currentUser) {
      this.mongoConnection = await app.currentUser.mongoClient("mongodb-atlas");
    }
  }

  //endpoints


  async getForUser(id: string) {
    return await this.mongoConnection.db("PlantHealthcare").collection("users").findOne({user_id: id});
  }
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
    return await collection.find({user_id: this.userValue.user_id});
  }

  async addPlantSpecie(plantSpecie: PlantSpecies) {
    const collection = this.mongoConnection.db("PlantHealthcare").collection("plantspecies");
    return await collection.insertOne({ ...plantSpecie});
  }

  async getPlantSpecies(): Promise<PlantSpecies[]> {
    const collection = this.mongoConnection.db("PlantHealthcare").collection("plantspecies");
    return await collection.find();
  }

  async addUserPlant(plant: UserPlantRequest) {
    const collection_user_plants = this.mongoConnection.db("PlantHealthcare").collection("userplants");
    await collection_user_plants.insertOne({...plant});
  }

  async listUserDevices() {
    const collection = this.mongoConnection.db("PlantHealthcare").collection("userdevices");
    return await collection.find({user_id: this.userValue.user_id});
  }

  async addUserDevices(device: Device) {
    const collection = this.mongoConnection.db("PlantHealthcare").collection("userdevices");
    return await collection.insertOne({...device});
  }

  async removeUser(userId: string) {
    const collection = this.mongoConnection.db("PlantHealthcare").collection("users");
    return await collection.deleteOne({user_id: userId});
  }

  setUserValue(userValue: User) {
    this.userValue = userValue;
  }

  updateUserRole(user: User) {
    const collection = this.mongoConnection.db("PlantHealthcare").collection("users");
    collection.updateOne(
      { user_id: user.user_id }, // filter
      { $set: { role: user.role } } // update
    )
  }
}
