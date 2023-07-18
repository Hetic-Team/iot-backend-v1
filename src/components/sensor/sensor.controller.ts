import client from "../../utils/mqtt";

export default class SensorController {
  static getData(room, id_sensor): void {
    // const topic = "groupe8/packet//118";

    var room_selected =
      "63c09edc-771b-4e15-ab00-237bb926b040/0519adec-dcf7-40f2-a73d-3ca7cb3a3dcd";

    switch (room) {
      case "room_1":
        room_selected =
          "63c09edc-771b-4e15-ab00-237bb926b040/0519adec-dcf7-40f2-a73d-3ca7cb3a3dcd";
        break;
      case "room_2":
        room_selected = "d9be4235-0aec-40bb-8915-f679a71c890d";
        break;
      default:
        room_selected = "578cf6dc-d4ee-4799-a069-5fe91da86084";
        break;
    }
    const topic = "groupe8/packet/" + room_selected + "/" + id_sensor;
    console.log(topic);
    SensorController.getconnection(topic);
  }

  static getconnection(topic: string) {
    client.on("connect", function () {
      console.log("Connected MQTT!");

      // Subscribe to the topic
      client.subscribe(topic, function (error) {
        if (error) {
          console.log("Error subscribing to topic:", error);
        } else {
          console.log("Subscribed to topic successfully!");
        }
      });
    });

    // Handle MQTT events and messages
    // client.on("message", function (topic, message) {
    //   console.log("Message:", message.toString());
    // });
    client.on("message", function (topic, message) {
      const messageString = message.toString();
      const data = JSON.parse(messageString);
      console.log("Message:", data);
    });
    client.on("error", function (error) {
      console.log("MQTT error:", error);
    });

    client.on("close", function () {
      console.log("MQTT connection closed.");
    });
  }
}

export const sensorController = new SensorController();
