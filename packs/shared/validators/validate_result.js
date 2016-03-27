/**
 * Created by leo on 3/27/16.
 */
function ValidateResult() {
    this.msg = [];

    this.addMsg = function (field, value, message) {
        this.msg.push({field: field, value: value, msg: message});
    };

    this.isValid = function () {
        return this.msg.length == 0;
    };
}

module.exports = ValidateResult;