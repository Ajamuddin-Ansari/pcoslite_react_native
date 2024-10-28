import ReactStorage from '@react-native-community/async-storage';
import { Component } from 'react';

/* Component for save data and get data from local storage using AsyncStorage */
export default class AsyncStorage extends Component {
  /* Method to save a value in async storage  
    key : key to store the string
    value : value of the string to save in async storage */
  static saveData(key = '', value = '') {
    return new Promise((resolve, reject) => {
      ReactStorage.setItem(key, value)
        .then(() => {
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  /* Method to get a value from async storage  
         key : key in which the vlue has been stored
         */
  static getData(key = '') {
    return new Promise((resolve, reject) => {
      ReactStorage.getItem(key)
        .then(value => {
          if (value) {
            resolve(value); // returns value if present
          } else {
            resolve(''); // returns empty string if value is not there
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}
