module.exports = function pagedFindPlugin(schema) {
    schema.statics.pagedFind = function (options, cb) {
        var thisSchema = this;

        if (!options.filters) {
            options.filters = {};
        }

        if (!options.keys) {
            options.keys = '';
        }

        if (!options.limit) {
            options.limit = 20;
        }

        if (!options.page) {
            options.page = 1;
        }

        if (!options.sort) {
            options.sort = {};
        }

        var output = {
            data: null,
            pages: {
                current: options.page,
                prev: 0,
                hasPrev: false,
                next: 0,
                hasNext: false,
                total: 0,
                limit: options.limit
            },
            items: {
                begin: ((options.page - 1) * options.limit) + 1,
                end: options.page * options.limit,
                total: 0
            }
        };

        var countResults = function (callback) {
            thisSchema.count(options.filters, function (err, count) {
                if (err) {
                    callback(err);
                    return;
                }
                output.items.total = count;
                callback(null);
            });
        };

        var getResults = function (callback) {
            thisSchema.find(options.filters, options.keys)
                .skip((options.page - 1) * options.limit)
                .limit(options.limit)
                .sort(options.sort)
                .lean()
                .exec(function (err, results) {
                    if (err) {
                        callback(err);
                        return;
                    }
                    output.data = results;
                    callback(null);
                });
        };

        require('async').parallel([
                countResults,
                getResults
            ],
            function (err) {
                if (err) {
                    cb(err, null);
                }

                //final paging math
                output.pages.total = Math.ceil(output.items.total / options.limit);
                output.pages.hasNext = (output.pages.current !== output.pages.total);
                output.pages.next = (output.pages.current + 1 > output.pages.total ? output.pages.total : output.pages.current + 1);
                output.pages.hasPrev = (output.pages.current !== 1);
                output.pages.prev = (output.pages.current - 1 < 1 ? 1 : output.pages.current - 1);
                if (output.items.end > output.items.total) {
                    output.items.end = output.items.total;
                }

                cb(null, output);
            });
    };
};