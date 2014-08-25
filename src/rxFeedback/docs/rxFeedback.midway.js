var demoPage = require('../../../utils/demo.page.js');
var rxFeedbackPage = require('../rxFeedback.page.js').rxFeedback;

// Add midway tests to run
describe('rxFeedback', function () {
    var rxFeedback;

    before(function () {
        demoPage.go('#/component/rxFeedback');
        rxFeedback = rxFeedbackPage.initialize($('#rxFeedback'));
    });

    it('should show element', function () {
        expect(rxFeedback.isDisplayed()).to.eventually.be.true;
    });
});
