const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
const Department = require('../../../models/department.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('PUT /api/departments', () => {
  before(async () => {
    const testDepOne = new Department({ _id: '5d9f1140f10a81216cfd4408', name: 'Department #1' });
    await testDepOne.save();
  });

  it('/:id should remove chosen document and return succes', async () => {
    const res = await request(server).delete('/api/departments/5d9f1140f10a81216cfd4408');
    const departments = await Department.find();
    expect(res.status).to.be.equal(200);
    expect(departments.length).to.be.equal(0);
  });

  after(async () => {
    await Department.deleteMany();
  });
});