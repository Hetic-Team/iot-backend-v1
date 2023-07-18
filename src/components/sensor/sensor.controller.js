"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sensorController = void 0;
var mqtt_1 = require("../../utils/mqtt");
var SensorController = /** @class */ (function () {
    function SensorController() {
    }
    SensorController.getData = function (room, id_sensor) {
        // const topic = "groupe8/packet//118";
        var room_selected = "63c09edc-771b-4e15-ab00-237bb926b040/0519adec-dcf7-40f2-a73d-3ca7cb3a3dcd";
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
        var topic = "groupe8/packet/" + room_selected + "/" + id_sensor;
        console.log(topic);
        SensorController.getconnection(topic);
    };
    SensorController.getconnection = function (topic) {
        mqtt_1.default.on("connect", function () {
            console.log("Connected MQTT!");
            // Subscribe to the topic
            mqtt_1.default.subscribe(topic, function (error) {
                if (error) {
                    console.log("Error subscribing to topic:", error);
                }
                else {
                    console.log("Subscribed to topic successfully!");
                }
            });
        });
        // Handle MQTT events and messages
        // client.on("message", function (topic, message) {
        //   console.log("Message:", message.toString());
        // });
        mqtt_1.default.on("message", function (topic, message) {
            var messageString = message.toString();
            var data = JSON.parse(messageString);
            console.log("Message:", data);
        });
        mqtt_1.default.on("error", function (error) {
            console.log("MQTT error:", error);
        });
        mqtt_1.default.on("close", function () {
            console.log("MQTT connection closed.");
        });
    };
    return SensorController;
}());
exports.default = SensorController;
exports.sensorController = new SensorController();
