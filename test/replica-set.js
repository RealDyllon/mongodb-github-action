'use strict'

const Lab = require('@hapi/lab')
const Mongoose = require('mongoose')
const { expect } = require('@hapi/code')

const { describe, it } = (exports.lab = Lab.script())

describe('MongoDB Replica Set ->', () => {
  it('connects to a replica set', async () => {
    await expect(
      Mongoose.connect('mongodb://localhost', {
        useNewUrlParser: true,
        useUnifiedTopology: false,
        replicaSet: 'mongodb-test-rs',
        connectTimeoutMS: 1000,
        serverSelectionTimeoutMS: 1000
      })
    ).to.not.reject()
  })

  it('fails to connect to non-existent replica set', async () => {
    await expect(
      Mongoose.connect('mongodb://localhost:27018', {
        useNewUrlParser: true,
        useUnifiedTopology: false,
        replicaSet: 'mongodb-test-rs',
        connectTimeoutMS: 1000,
        serverSelectionTimeoutMS: 1000
      })
    ).to.reject()
  })
})
