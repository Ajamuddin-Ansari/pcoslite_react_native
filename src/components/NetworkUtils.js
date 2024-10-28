/* eslint-disable prettier/prettier */
import NetInfo from '@react-native-community/netinfo';

export default class NetworkUtils {
  static async isNetworkAvailable() {
    //Methods returns a boolean value
    const response = await NetInfo.fetch();//Method to get internet connection present or not
    return response.isConnected; //returns booalen value based on internet connection
  }
}
