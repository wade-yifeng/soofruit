/**
 * Created by leo on 3/27/16.
 */
function ValidateResult() {
    this.msgs = [];

    this.addMsg = function (field, value, message) {
        this.msgs.push({field: field, value: value, msg: message});
    };

    this.isValid = function () {
        return this.msgs.length == 0;
    };
}

module.exports = ValidateResult;