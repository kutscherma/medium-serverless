'use strict';

const express = require('express');
const sls = require('serverless-http');
const AWS = require('aws-sdk');
const csv = require('csvtojson');
const app = express();


app.get('/', async (req, res, next) => {
  
    let S3 = new AWS.S3();

    const params = {
      Bucket: 'mediumbucket-manuel',
      Key: 'salesrecords.csv'
    }


    let data = async function() {
        // get csv file and create stream
        const stream = S3.getObject(params).createReadStream();
        // convert csv file (stream) to JSON format data
        const json = await csv().fromStream(stream);
        
        return json;
    }

      let csvData = await data();

      res.status(200).send(csvData);


});


module.exports.server = sls(app);