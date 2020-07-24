import { AxiosCommunicationService } from "src/services/external-communication/axios-communication.service";
import { Injectable } from "@nestjs/common";
import { InvalidTokenHandling } from "src/services/video-api/youtube-api/invalid-token-handling";
import { AxiosHeader } from "src/services/external-communication/axios-header";
import { Handling } from "../handling.interface";

const editJsonFile = require('edit-json-file');

let file = editJsonFile(`./youtube-api.config.json`, {
    autosave: true
});

@Injectable()
export class ConfigManagerService{

    constructor(
        public axios:AxiosCommunicationService,
        private invalidTokenHandling:Handling,
    ){}

    init(){
        this.saveParam("access_key", "AIzaSyDTq0BThgw95Ds3H2kZHJdFuZ_HNt2562o");
        this.saveParam("client_id", "1095453620047-9f91puv579k2avlrtkssvi3iud8ek3of.apps.googleusercontent.com");
        this.saveParam("client_secret", "huRoWOmBe5RV_0Ykk4-plSur");
        this.saveParam("refresh_token", "1//0hj_9bS4qDlPqCgYIARAAGBESNwF-L9IrtuocQZIoMZCFzcGIr5OdNjhFVVLf9wdrN63q2XNmnBHuUj6XO0TGWsNBdDMzHdD8-Cg");
        this.saveParam("authorization_code", "4/2AGASn_w7t2KzUNN9mfWQ3pHkGn4HDHQf44NhlB4D-oRafq2kAz2NvqeoE4075_dj3dyQ91wqbGQZiOfjBfR9lQ");
        this.saveParam("access_token", "");
    }

    loadParam(key:string):string{
        return file.get(key);
    }

    saveParam(key:string, value:string){
        file.set(key, value);
    }

    async verifyToken():Promise<boolean>{
        try{
            let accessToken = this.loadParam("access_token");
            await this.axios.get(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`);
        }
        catch(exception){
            if(this.invalidTokenHandling.verify(exception)){
                await this.refreshToken();
            }
        }
        
        return true;
    }

    async refreshToken(){
        let clientId:string = this.loadParam("client_id");
        let clientSecret:string = this.loadParam("client_secret");
        let refreshToken:string = this.loadParam("refresh_token");
        let response = await this.axios.post(
            'https://oauth2.googleapis.com/token',
            {
                client_id: clientId,
                client_secret: clientSecret,
                refresh_token: refreshToken,
                grant_type: 'refresh_token'
            },
            new AxiosHeader({
                key: 'Content-Type',
                value: 'application/x-www-form-urlencoded'
            })
        );
        this.saveParam('access_token', response.data.access_token);
        return response;
    }

}