import { Helper } from "../../utils/helper";
import { logger } from "../../utils/logger";
import HttpStatus from 'http-status-codes';
import siestModeHelper from "./siestMode.helper";
import { Request, Response } from 'express';
import { SiestModeRecord } from "./siestMode.model";
import { SensorValueRecord } from "../sensor/model/sensorValue.model";
import { Constants } from "../../utils/constants";
class SiestModeController {
    public async onMode(req: Request, res: Response) { 
        try {
            const check = await SiestModeRecord.find({ accountId: Constants.ACCOUNT_ID, end: null });
            if (check.length == 0) {
                await siestModeHelper.onMode();
                const sleepmode = new SiestModeRecord({
                    accountId: Constants.ACCOUNT_ID,
                    start: new Date(),
                    end: null,
                });
                await sleepmode.save();
                console.log("ENDED")
                Helper.createResponse(res, HttpStatus.OK, 'SLEEP_MODE_ON', {});
                return;
            } else {
                Helper.createResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, 'ALREADY_ON', {});
                return;
            }
        } catch (err) {
            logger.error(__filename, {
                method: 'runDataFetch',
                requestId: req['uuid'],
                custom_message: 'Error while finalize runDataFetch',
                err
             });
             Helper.createResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, 'RAN DATA_ERRRO', {});
             return;
        }
    }
    public async offMode(req: Request, res: Response) { 
        try {
            const thisSleepMode = await SiestModeRecord.findOne({ accountId: Constants.ACCOUNT_ID, end: null });
            if (thisSleepMode) {
                await SiestModeRecord.updateOne({ _id: thisSleepMode._id }, { $set: { end: new Date() } });
                await siestModeHelper.offMode();
            }
            
            Helper.createResponse(res, HttpStatus.OK, 'SLEEP_MODE_OFF',{});
          return;
        } catch (err) {
            logger.error(__filename, {
                method: 'runDataFetch',
                requestId: req['uuid'],
                custom_message: 'Error while finalize runDataFetch',
                err
             });
             Helper.createResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, 'RAN DATA_ERRRO', {});
             return;
        }
    }
    public async getInfo(req: Request, res: Response) { 
        try {
            const { account, user } = req.body;
            const sensorID = [Constants.SENSORS.TEMPERATURE, Constants.SENSORS.CO2, Constants.SENSORS.SOUND, Constants.SENSORS.HUMIDITY, Constants.SENSORS.LUMINOSITY];
            const location = ["63c09edc-771b-4e15-ab00-237bb926b040"];
            let sensorsvalue = [];
            const thisSleepMode = await SiestModeRecord.findOne({ accountId: "64b82716c3836bc749487d3b" }).sort({createdAt: - 1});
            for (let i = 0; i < sensorID.length ; i++) {
                const sensorresult = await SensorValueRecord.findOne({ location, sensorId: sensorID[i] })
                sensorsvalue.push(sensorresult);
            }
            const resultObj = {
                info: thisSleepMode,
                sensors: sensorsvalue
            }
           
            
            Helper.createResponse(res, HttpStatus.OK, 'GET_SLEEP_MODE_INFO',resultObj);
          return;
        } catch (err) {
            logger.error(__filename, {
                method: 'runDataFetch',
                requestId: req['uuid'],
                custom_message: 'Error while finalize runDataFetch',
                err
             });
             Helper.createResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, 'GET_SLEEP_MODE_INFO', {});
             return;
        }
    }
}

export const siestModeController = new SiestModeController();