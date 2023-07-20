import { Helper } from "../../utils/helper";
import client from "../../utils/mqtt";
import HttpStatus from 'http-status-codes';
import { CountryRecord } from "../country/country.model";
import { SensorRawData } from "./model/sensorRaw.model";
import { SensorValueRecord } from "./model/sensorValue.model";
import sensorHelper from "./sensor.helper";
import { Request, Response } from 'express';
import { logger } from "../../utils/logger";

export default class SensorController {
    
    /**
       * @typedef addData
       */
    /**
     * API to fetch recent data
     * @group IOT - API for iot
     * @returns {object} 200 - Ok
     * @returns {object} 500 - Internal server error
     */
  public async runDataFetch(req: Request, res: Response) {
    console.log("Sdsa");
    try {
         sensorHelper.getData("room_1", "0519adec-dcf7-40f2-a73d-3ca7cb3a3dcd", 118);
          Helper.createResponse(res, HttpStatus.OK, 'RAN DATA FETCH',{});
          return;
       } catch (error) {
          logger.error(__filename, {
             method: 'runDataFetch',
             requestId: req['uuid'],
             custom_message: 'Error while finalize runDataFetch',
             error
          });
          Helper.createResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, 'RAN DATA_ERRRO', {});
          return;
        }
       
        
    }
//   public async addSensor(req: Request, res: Response) {
//     try {
//           await sensorHelper.addSensors(req.body);
//           Helper.createResponse(res, HttpStatus.OK, 'RAN DATA FETCH',{});
//           return;
//        } catch (error) {
//           logger.error(__filename, {
//              method: 'runDataFetch',
//              requestId: req['uuid'],
//              custom_message: 'Error while finalize runDataFetch',
//              error
//           });
//           Helper.createResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, 'RAN DATA_ERRRO', {});
//           return;
//         }
       
        
//     }
  public async getSensorByLocation(req: Request, res: Response) {
    try {
          await sensorHelper.getSensorByLocation(req.params.location);
          Helper.createResponse(res, HttpStatus.OK, 'RAN DATA FETCH',{});
          return;
       } catch (error) {
          logger.error(__filename, {
             method: 'runDataFetch',
             requestId: req['uuid'],
             custom_message: 'Error while finalize runDataFetch',
             error
          });
          Helper.createResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, 'RAN DATA_ERRRO', {});
          return;
        }
       
        
    }
  public async getSensorValAvg(req: Request, res: Response) {
    try {
          await sensorHelper.getSensorValAvg(req.params.location);
          Helper.createResponse(res, HttpStatus.OK, 'RAN DATA FETCH',{});
          return;
       } catch (error) {
          logger.error(__filename, {
             method: 'runDataFetch',
             requestId: req['uuid'],
             custom_message: 'Error while finalize runDataFetch',
             error
          });
          Helper.createResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, 'RAN DATA_ERRRO', {});
          return;
        }
       
        
    }
//   public async addSensor(req: Request, res: Response) {
//     try {
//           await sensorHelper.addSensors(req.body);
//           Helper.createResponse(res, HttpStatus.OK, 'RAN DATA FETCH',{});
//           return;
//        } catch (error) {
//           logger.error(__filename, {
//              method: 'runDataFetch',
//              requestId: req['uuid'],
//              custom_message: 'Error while finalize runDataFetch',
//              error
//           });
//           Helper.createResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, 'RAN DATA_ERRRO', {});
//           return;
//         }
       
        
//     }
}




export const sensorController = new SensorController();
