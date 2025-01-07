import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { HttpLayerService } from './http-layer.service';
import { Config } from '../config/config';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  public headerTab = new Subject<any>();
  public headerTabRoute = new Subject<any>();

  constructor(private _http: HttpClient, private _httplayer: HttpLayerService) {
  }

  // ----------------------------Service call Types--------------------------------//
  postService(api: string, data: any) {
    return this._httplayer.post(api, data);
  }

  getService(api: string, data?: undefined) {
    if (data) {
      return this._httplayer.get(api, data);
    }
    return this._httplayer.get(api);
  }

  deleteService(api: string, data: any) {
    return this._httplayer.delete(api, data);
  }

  // ------------------------------Route Functions--------------------------------------//
  getCurrentUrl(route: any) {
    const mainUrl = window.location.href.split('/#/');
    return mainUrl[0] + '/#/' + route;
  }

  // Organizations
  getOrganizations(payload: any): Observable<any> {
    return this._httplayer.post(Config.API.GET_ORGANIZATIONS, payload);
  }
  addOrganization(payload: any): Observable<any> {
    return this._httplayer.post(Config.API.ADD_ORGANIZATION, payload);
  }
  editOrganization(payload: any): Observable<any> {
    return this._httplayer.post(Config.API.EDIT_ORGANIZATION, payload);
  }
  deleteOrganization(payload: any): Observable<any> {
    return this._httplayer.post(Config.API.DELETE_ORGANIZATION, payload);
  }

  // -----------------------------MQTT Functions-----------------------------------------//
  getMqttConfigDetails(payload: any): Observable<any> {
    return this.postService(Config.API.GET_MQTT_CONFIG_DETAILS, payload);
  }

  registerMqttTopics(payload: any): Observable<any> {
    return this._httplayer.post(Config.API.REGISTER_MQTT_TOPICS, payload);
  }

  // Service call Functions

  // ----------------------------App Component-------------------------------------------//
  getConfigurationJSON() {
    return this._httplayer.get('assets/jsons/configuration.json');
  }
  getTokenInfo(query = ''): Observable<any> {
    return this._httplayer.get(Config.API.GET_TOKEN + query);
  }

  // -----------------------------Modal Component-----------------------------------------//
  // userLogin(data: any): Observable<any> {
  //   return this.postService(Config.API.GET_AD_TOKEN, data);
  // }

  // ------------------------------Login Component---------------------------------------//
  loginUser(data: any): Observable<any> {
    return this.postService(Config.API.LOGIN_USER, data);
  }
  // getCaptcha(data: any): Observable<any> {
  //   return this.postService(Config.API.GET_CAPTCHA, data);
  // }
  // forgotPassword(data: any): Observable<any> {
  //   return this.postService(Config.API.FORGOT_PASSWORD, data);
  // }
  // resetPassword(data: any): Observable<any> {
  //   return this.postService(Config.API.RESET_PASSWORD, data);
  // }
  getBaseProject(data: any): Observable<any> {
    return this.getService(Config.API.GET_BASE_PROJECT);
  }

  //------------------------------------Log Out--------------------------//
  logoutUser(data: any): Observable<any> {
    return this.postService(Config.API.LOGOUT_USER, data);
  }

}