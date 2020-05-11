'use strict'

const Lab = require('@hapi/lab')
const Mongoose = require('mongoose')
const { expect } = require('@hapi/code')

const { describe, it } = exports.lab = Lab.script()

describe('MongoDB Single Instance with configurations ->', () => {
  it('configures the TTL Monitor sleep interval', async () => {
    await Mongoose.connect('mongodb://localhost', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    await Mongoose.connection.db.admin().command({ setParameter: 1, ttlMonitorSleepSecs: 60 })

    const result = await Mongoose.connection.db.admin().command({ getParameter: 1, ttlMonitorSleepSecs: 10 })

    expect(result).to.equal({ ttlMonitorSleepSecs: 60, ok: 1 })
  })
})
