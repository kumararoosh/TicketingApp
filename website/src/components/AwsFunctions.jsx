import * as AWS from 'aws-sdk';
import config from '../config.json';

const configuration = {
    region: 'us-west-2',
    secretAccessKey: config.secretAccessKey,
    accessKeyId: config.accessKey
  }
  
AWS.config.update(configuration);

const docClient = new AWS.DynamoDB.DocumentClient();

export const fetchData = async (tableName, callback) => {
    var params = {
        TableName: tableName
    }

    return docClient.scan(params, (err, data) => {
        if (!err) {
            console.log(data);
            callback({users: data.Items});
        } else {
            console.log(err)
        }
    });
}

export const addUserData = (tableName, data) => {
    var params = {
        TableName: tableName,
        Item: data
    }

    return docClient.put(params, (err, data) => {
        if (err) {
           // console.log('Error', err);
        } else {
            console.log('Success', data);
        }
    })
}