const Employee = require('../employee.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {
  it('should throw an error if no args', () => {
    const emp = new Employee({});
    emp.validate(err => {
      expect(err.errors.firstName).to.exist;
      expect(err.errors.lastName).to.exist;
      expect(err.errors.department).to.exist;
    });
  });

  it('should throw an error if args aren\'t strings', () => {
    const cases = [{}, []];
    // na callu: jak to przetestować zusammen
    for(let firstName of cases){
      const emp = new Employee({ firstName });
      emp.validate(err => {
        expect(err.errors.firstName).to.exist;
      });
    }
    for(let lastName of cases){
      const emp = new Employee({ lastName });
      emp.validate(err => {
        expect(err.errors.lastName).to.exist;
      });
    }
    for(let department of cases){
      const emp = new Employee({ department });
      emp.validate(err => {
        emp.validate(err => {
          expect(err.errors.department).to.exist;
        });
      });
    }
  });

  it('should not throw an error if args are okay', () => {
    // czy coś tak prostego w ogóle działa i wystarcza?
    const emp = new Employee({ firstName: 'Jerry', lastName: 'Horton', department: 'Marketing' });
    emp.validate(err => {
      expect(err).to.not.exist;
    });
  });
});