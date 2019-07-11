import { RecordManagerCreateRecord } from '@pages/record-manager-create-record';
import { expect } from 'chai';

const rmCreateRecord = new RecordManagerCreateRecord();

export = function() {
    this.Given(/^the user begins creating a new record$/, () => {
        return rmCreateRecord.beginRecordCreation();
    });

    this.When(/^the user specifies the new record family of "([^"]*)"$/, (family: string) => {
        return rmCreateRecord.searchForFamily(family);
    });

    this.Then(/^the new record family search results do not contain the value "([^"]*)"$/, async (family: string) => {
        return expect(rmCreateRecord.isFamilyInResults(family)).to.eventually.be.false;
    });

    this.Then(/^the new record family search results contain the value "([^"]*)"$/, async (family: string) => {
        return expect(rmCreateRecord.isFamilyInResults(family)).to.eventually.be.true;
    });
};
