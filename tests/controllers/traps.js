const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const Trap = require('../../models/Trap');
const server = require('../../app');
const should = chai.should();

chai.use(chaiHttp);
describe('Traps controllers', () => {
  beforeEach((done) => {
    Trap.deleteOne({}, () => {
      done();
    });
  });

  describe('GET /:trapId', () => {
    it('it should save this request', async () => {
      const trap = new Trap({
        method: 'GET',
        ip: '192.168.0.1',
        protocol: 'https',
        path: '/trap-request',
        cookies: JSON.stringify({}),
        headers: JSON.stringify({}),
        body: JSON.stringify({}),
        query: JSON.stringify({}),
        params: JSON.stringify({}),
        trapId: 'trap-request',
      });
      await trap.save();

      const res = await chai.request(server)
        .get('/trap-request')
        .send();

      res.should.have.status(200);
    });
  });

  // describe('GET /:trapId/requests', () => {
  //   it('should return all requests by trapId', () => {
  //     const trap = new Trap({
  //       method,
  //       ip,
  //       protocol,
  //       path,
  //       cookies: cookies || {},
  //       headers: JSON.stringify(headers),
  //       body: JSON.stringify(body),
  //       query: JSON.stringify(query),
  //       params: JSON.stringify(params),
  //       trapId: params.trapId,
  //     });
  //
  //     const { params } = req;
  //     const requests = await Trap.find({ trapId: params.trapId }).sort({ createdAt: -1 });
  //     res.render('traps/requests', { requests });
  //
  //   });
  // });
});
