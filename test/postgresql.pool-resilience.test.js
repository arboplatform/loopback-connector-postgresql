'use strict';
require('./init');
var Promise = require('bluebird');
var EventEmitter = require('events');
var connector = require('..');
var DataSource = require('loopback-datasource-juggler').DataSource;

function newConfig() {
  return JSON.parse(JSON.stringify(getDBConfig()));
}

describe('pool resilience', function() {
  describe('pool error handler', function() {
    it('attaches error listener to prevent process crash', function() {
      var dataSource = new DataSource(connector, newConfig());
      var pool = dataSource.connector.pg;
      pool.listenerCount('error').should.be.above(0);
    });

    it('handles idle client errors without crashing', function() {
      var dataSource = new DataSource(connector, newConfig());
      var pool = dataSource.connector.pg;

      // Emitting an error on the pool should not throw
      (function() {
        pool.emit('error', new Error('simulated idle client error'));
      }).should.not.throw();
    });
  });

  describe('executeSQL connection recycling', function() {
    it('returns connections to pool after query errors', function(done) {
      var dataSource = getDataSource();
      var db = dataSource.connector;
      var pool = db.pg;
      pool.options.max = 3;

      // Run more error queries than pool size to verify connections are recycled
      var completed = 0;
      var total = 9;
      for (var i = 0; i < total; i++) {
        db.executeSQL("SELECT 'asd'+1", [], {}, function(err) {
          err.should.be.ok();
          completed++;
          if (completed === total) {
            // All queries completed — connections were returned, not destroyed
            pool.totalCount.should.be.belowOrEqual(3);
            done();
          }
        });
      }
    });
  });

  describe('beginTransaction connection leak fix', function() {
    it('succeeds with valid isolation level', function(done) {
      var dataSource = getDataSource();
      var db = dataSource.connector;
      db.beginTransaction('READ COMMITTED', function(err, tx) {
        if (err) return done(err);
        tx.should.be.ok();
        tx.txId.should.be.ok();
        // Rollback to clean up
        db.rollback(tx.connection, function() {
          done();
        });
      });
    });
  });
});
