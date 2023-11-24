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
    return this.mongoConnection;
  }

  //endpoints


  async getUser(id: string) {
    const collection = await this.mongoConnection.db("PlantHealthcare").collection("users");
    const users = await collection.find();
    return users.find((usr:any)=>{return usr.user_id === id})
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
    await this.updatePlantProperties(updateId, userPlantRequest); // todo
    updatedPlant = await this.getPlant(updateId);

    const collection_devices = this.mongoConnection.db("PlantHealthcare").collection("userdevices");
    const allDevicesOfUser: Device[] = await this.listUserDevices();
    await this.updateDevicesPlantIds(allDevicesOfUser, updatedPlant, collection_devices);
  }

  private async updateDevicesPlantIds(allDevicesOfUser: Device[], updatedPlant: Plant, collection_devices:any) {
    for (const device of allDevicesOfUser) {
      const isDeviceAmongPlantDevices: boolean = !!updatedPlant.devices.find((updatedPlantDevice) => {
        return updatedPlantDevice._id?.toString() === device._id?.toString()
      })
      if (isDeviceAmongPlantDevices) {
        await this.assignDeviceToPlant(collection_devices, device, updatedPlant);
      } else {
        if (device.plant_id?.toString() === updatedPlant._id?.toString()) {
          await this.removeDeviceFromPlant(collection_devices, device);
        }
      }
    }
  }

  private async removeDeviceFromPlant(collection_devices: any, device: Device) {
    await collection_devices.updateOne(
      {_id: device._id}, // Filter
      {$set: {plant_id: null}} // Update
    );
  }

  private async assignDeviceToPlant(collection_devices: any, device: Device, updatedPlant: Plant) {
    await collection_devices.updateOne(
      {_id: device._id}, // Filter
      {$set: {plant_id: updatedPlant._id}} // Update
    );
  }

  private async updatePlantProperties(updateId: string, userPlantRequest: Plant) {
    const collection_user_plants = this.mongoConnection.db("PlantHealthcare").collection("userplants");
    await collection_user_plants.updateOne(
      {_id: new ObjectId(updateId)}, // Filter
      {$set: userPlantRequest} // Update
    );
    return collection_user_plants;
  }

  async removeDevice(deviceId: ObjectId) {
    const collection = this.mongoConnection.db("PlantHealthcare").collection("userdevices");
    return await collection.deleteOne({_id: deviceId});
  }
}
