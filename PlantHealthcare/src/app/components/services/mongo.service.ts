import {Injectable} from '@angular/core';
import {Plant, PlantSpecies} from "../plant/plant-database/plant-database.component";
import {Device} from "../device/devices-list/devices-list.component";
import {User} from "../user/user-list/user-list.component";
import {ObjectId} from 'bson';
import App = Realm.App;

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
    return await collection.insertOne({...plantSpecie});
  }

  async getPlantSpecies(): Promise<PlantSpecies[]> {
    const collection = this.mongoConnection.db("PlantHealthcare").collection("plantspecies");
    return await collection.find();
  }

  async addUserPlant(plant: Plant) {
    const collection_user_plants = this.mongoConnection.db("PlantHealthcare").collection("userplants");
    const result = await collection_user_plants.insertOne({...plant});
    const insertedPlant: Plant = await this.getPlant(result.insertedId.toString());
    const collection_devices = this.mongoConnection.db("PlantHealthcare").collection("userdevices");
    for (const device of insertedPlant.devices) {
      await collection_devices.updateOne(
        {_id: device._id}, // Filter
        {$set: {plant_id: insertedPlant._id}} // Update
      );
    }
    const updatedDevices = await this.listPlantDevices(insertedPlant._id)
    await collection_user_plants.updateOne(
      {_id: insertedPlant._id}, // Filter
      {$set: {devices: updatedDevices}} // Update
    );
  }

  async getPlant(plantId: string) {
    const collection_user_plants = this.mongoConnection.db("PlantHealthcare").collection("userplants");
    return await collection_user_plants.findOne({_id: new ObjectId(plantId)});
  }

  async deletePlant(plantId: string) {
    const collection_user_plants = this.mongoConnection.db("PlantHealthcare").collection("userplants");
    return await collection_user_plants.deleteOne({_id: new ObjectId(plantId)});
  }

  async listUserDevices() {
    const collection = this.mongoConnection.db("PlantHealthcare").collection("userdevices");
    return await collection.find({user_id: this.userValue.user_id});
  }

  async listPlantDevices(plantId = '') {
    const collection = this.mongoConnection.db("PlantHealthcare").collection("userdevices");
    return await collection.find({plant_id: plantId});
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
      {user_id: user.user_id}, // filter
      {$set: {role: user.role}} // update
    )
  }

  async modifyUserPlant(userPlantRequest: Plant, updateId = '') {
    let updatedPlant: Plant
    const collection_user_plants = this.mongoConnection.db("PlantHealthcare").collection("userplants");
    await collection_user_plants.updateOne(
      {_id: new ObjectId (updateId)}, // Filter
      {$set: userPlantRequest} // Update
    );
    if (updateId) {
      updatedPlant = await this.getPlant(updateId);
      const collection_devices = this.mongoConnection.db("PlantHealthcare").collection("userdevices");
      const allDevicesOfUser: Device[] = await this.listUserDevices();
      for (const device of allDevicesOfUser) {
        if ( !!updatedPlant.devices.find((dev) => {return dev._id === device._id})) {
          await collection_devices.updateOne(
            {_id: device._id}, // Filter
            {$set: {plant_id: updatedPlant._id}} // Update
          );
        } else {
          if (device.plant_id === updatedPlant._id) {
            await collection_devices.updateOne(
              {_id: device._id}, // Filter
              {$set: {plant_id: null}} // Update
            );
          }
        }
      }
      const updatedDevices = await this.listPlantDevices(updateId);
      await collection_user_plants.updateOne(
        {_id: updatedPlant._id}, // Filter
        {$set: {devices: updatedDevices}} // Update
      );
      // Remove devices from other plants that have the same ID as the updated devices
      // and where the plant ID is not the same as the updateId
      const otherPlants = await collection_user_plants.find({_id: {$ne: new ObjectId(updateId)}});
      for (const plant of otherPlants) {
        const filteredDevices = plant.devices.filter((dev:any) => {
          return updatedDevices.find((updDev: any) => updDev._id === dev._id);
        });
        await collection_user_plants.updateOne(
          {_id: plant._id}, // Filter
          {$set: {devices: filteredDevices}} // Update
        );
      }
    }
  }


}
