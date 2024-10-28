import axios from "axios";
import PropTypes from "prop-types";
import { Component } from "react";
import Base_Url from './Base_Url'
import NetworkUtils from "../NetworkUtils";
import appStrings from "../../../lib/appStrings";
import AsyncStorage from "../AsyncStorage";
import AsyncStorageKeys from "../../../lib/AsyncStorageKeys";

const axiosInstance = axios.create({
  baseURL: Base_Url,
 
  timeout: 1000000,
});

axiosInstance.interceptors.request.use(
  async (config) => {
   
    await AsyncStorage.getData(AsyncStorageKeys.access_token)
      .then(() => {
        config.headers["Content-Type"] = "application/json";
        
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

const callApiWithResponse = async (
  apiName,
  params,
  apiAxios,
  completion,
  objValues,
  objKeys
) => {
  console.log(axiosInstance.defaults.baseURL, apiName, params);
  const response = await apiAxios(apiName, params);
  completion(response.data, null);
};

export default class AuthAxios extends Component {
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
        console.log("WSError===>", error.message);
        if (completion) {
          completion(null, error);
        }
      }
    } else {
      console.log("Network Error===> Network not available.");
      if (completion) {
        completion(null, {
          name: appStrings.screens.appStrings.networkErrorTitle,
          message:appStrings.screens.appStrings.networkErrorMsg,
        });
      }
    }
  }
}
