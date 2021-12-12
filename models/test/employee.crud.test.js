const Employee = require('../employee.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {
  before(async () => {
    try {
      await mongoose.connect('mongodb://localhost:27017/companyDBtest', { useNewUrlParser: true, useUnifiedTopology: true });
    } catch(err) {
      console.error(err);
    }
  });

  describe('Reading data', () => {
    before(async () => {
      const testEmpOne = new Employee({ firstName: 'Ted', lastName: 'Bundy', department: 'Management' });
      await testEmpOne.save();

      const testEmpTwo = new Employee({ firstName: 'Jeffrey', lastName: 'Dahmer', department: 'Human Resources' });
      await testEmpTwo.save();
    });

    it('should return all the data with "find" method', async () => {
      const employees = await Employee.find();
      const expectedLength = 2;
      expect(employees.length).to.be.equal(expectedLength);
    });

    it('should return proper document by various params with "findOne" method', async () => {
      const employee = await Employee.findOne({ firstName: 'Ted', lastName: 'Bundy', department: 'Management' });
      const expectedFirstName = 'Ted';
      const expectedLastName = 'Bundy';
      const expectedDepartment = 'Management';
      expect(employee.firstName).to.be.equal(expectedFirstName);
      expect(employee.lastName).to.be.equal(expectedLastName);
      expect(employee.department).to.be.equal(expectedDepartment);
    });

    after(async () => {
      await Employee.deleteMany();
    });
  });

  describe('Creating data', () => {
    it('should insert new document with "insertOne" method', async () => {
      const employee = new Employee({ firstName: 'Charles', lastName: 'Sobhraj', department: 'Management' });
      await employee.save();
      expect(employee.isNew).to.be.false;
    });

    after(async () => {
      await Employee.deleteMany();
    });
  });

  describe('Updating data', () => {
    it('should properly update one document with "updateOne" method', () => {
      beforeEach(async () => {
        const testEmpOne = new Employee({ firstName: 'David', lastName: 'Berkowitz', department: 'Public Relations' });
        await testEmpOne.save();

        const testEmpTwo = new Employee({ firstName: 'Edmund', lastName: 'Kemper', department: 'Marketing' });
        await testEmpTwo.save();
      });

      it('should properly update one document with "updateOne" method', async () => {
        await Employee.updateOne({ firstName: 'David', lastName: 'Berkowitz', department: 'Public Relations' }, { $set: { firstName: 'John', lastName: 'Gacy', department: 'IT' }});
        const updatedEmployee = await Employee.findOne({ firstName: 'John', lastName: 'Gacy', department: 'IT' });
        expect(updatedEmployee).to.not.be.null;
      });

      it('should properly update one document with "save" method', async () => {
        const employee = await Employee.findOne({ firstName: 'Edmund', lastName: 'Kemper', department: 'Marketing' });
        employee.firstName = 'Richard';
        employee.lastName = 'Ramirez';
        employee.department = 'Testing';
        await employee.save();

        const updatedEmployee = await Employee.findOne({
          firstName: 'Richard', lastName: 'Ramirez', department: 'Testing' });
        expect(updatedEmployee).to.not.be.null;
      });

      it('should properly update multiple documents with "updateMany" method', async () => {
        await Employee.updateMany({}, { $set: { firstName: 'Robert', lastName: 'Yates', department: 'Management' }});
        const employees = await Employee.find({ firstName: 'Robert', lastName: 'Yates', department: 'Management' });
        expect(departments.length).to.be.equal(2);
      });

      afterEach(async () => {
        await Employee.deleteMany();
      });
    });

    describe('Removing data', () => {
      beforeEach(async () => {
        const testEmpOne = new Employee({ firstName: 'Paul', lastName: 'Bernardo', department: 'Human Resources' });
        await testEmpOne.save();

        const testEmpTwo = new Employee({ firstName: 'Karla', lastName: 'Homolka', department: 'Public Relations' });
        await testEmpTwo.save();
      });

      it('should properly remove one document with "deleteOne" method', async () => {
        await Employee.deleteOne({ firstName: 'Paul', lastName: 'Bernardo', department: 'Human Resources' });
        const removedEmployee = await Employee.findOne({ firstName: 'Paul', lastName: 'Bernardo', department: 'Human Resources' });
        expect(removedEmployee).to.be.null;
      });

      it('should properly remove one document with "remove" method', async () => {
        const employee = await Employee.findOne({ firstName: 'Karla', lastName: 'Homolka', department: 'Public Relations' });
        await employee.remove();
        const removedEmployee = await Employee.findOne({ firstName: 'Karla', lastName: 'Homolka', department: 'Public Relations' });
        expect(removedEmployee).to.be.null;
      });

      it('should properly remove multiple documents with "deleteMany" method', async () => {
        await Employee.deleteMany();
        const employees = await Employee.find();
        expect(employees.length).to.be.equal(0);
      });

      afterEach(async () => {
        await Employee.deleteMany();
      });
    });
  });
});