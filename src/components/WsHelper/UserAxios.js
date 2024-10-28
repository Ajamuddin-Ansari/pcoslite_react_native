import axios from "axios";
import PropTypes from "prop-types";
import { Component } from "react";
import * as RootNavigation from "../../../lib/RootNavigation";
import Base_Url from "./Base_Url";
import AsyncStorageKeys from "../../../lib/AsyncStorageKeys";
import appStrings from "../../../lib/appStrings";
import NetworkUtils from "../NetworkUtils";
import AsyncStorage from "../AsyncStorage";


const axiosInstance = axios.create({
  baseURL: Base_Url,
  timeout: 1000000,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    await AsyncStorage.getData(AsyncStorageKeys.authorization_token)
      .then((value) => {
        config.headers["Authorization"] = value;
        config.headers["Content-Type"] = "multipart/form-data";
        
      })
      .catch((error) => {
        console.log(error);
      });
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default class UserAxios extends Component {
  static async getResponse(
    apiName = PropTypes.string,
    params = PropTypes.object,
    requestType = "get",
    completion = PropTypes.func
  ) {
    let apiAxios = axiosInstance.get;
    if (requestType === "post") {
      apiAxios = axiosInstance.post;
    }

     const isConnected = await NetworkUtils.isNetworkAvailable();
   
    if (isConnected) {
      try {
        console.log(
          axiosInstance.defaults.baseURL,
          apiName,
          params,
          requestType
        );
        const response = await apiAxios(apiName, params);
      
        completion(response.data, null);
      
       
      } catch (error) {
        console.log("dataa",error);
        if (error.response.status == 401) {
          updateLogout();
        } else {
          if (completion) {
            completion(null, error);
          }
        }
      }
    } else {
      console.log("Network Error===> Network not available.");
      if (completion) {
        completion(null, {
          name: appStrings.screens.appStrings.networkErrorTitle,
          message: appStrings.screens.appStrings.networkErrorMsg,
        });
      }
    }
  }
}

const updateLogout = async () => {
  AsyncStorage.saveData(AsyncStorageKeys.app_flow, "");
  AsyncStorage.saveData(AsyncStorageKeys.customer_id, "");
   
  RootNavigation.replace(appStrings.screens.navigators.authNavigator);
  
};