const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const agg = [
  {
    '$search': {
      'index': 'default_vudu', 
      'text': {
        'query': 'rocks', 
        'path': {
          'wildcard': '*'
        }
      }
    }
  }
];

MongoClient.connect(
  '',
  { useNewUrlParser: true, useUnifiedTopology: true },
  function(connectErr, client) {
    assert.equal(null, connectErr);
    const coll = client.db('').collection('');
    coll.aggregate(agg, (cmdErr, result) => {
      assert.equal(null, cmdErr);
    });
    client.close();
  });
  

  movies.aggregate(
    [
        {
          '$search': {
            'index': 'default_vudu', 
            'text': {
              'query': 'rocks', 
              'path': {
                'wildcard': '*'
              }
            }
          }
        }
      ];
  
    ).toArray()
    };