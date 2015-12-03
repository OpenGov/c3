c3_chart_fn.load = function (args) {
    var $$ = this.internal, config = $$.config;
    // update xs if specified
    if (args.xs) {
        $$.addXs(args.xs);
    }
    // update classes if exists
    if ('classes' in args) {
        Object.keys(args.classes).forEach(function (id) {
            config.data_classes[id] = args.classes[id];
        });
    }
    // update categories if exists
    if ('categories' in args && $$.isCategorized()) {
        config.axis_x_categories = args.categories;
    }
    // update axes if exists
    if ('axes' in args) {
        Object.keys(args.axes).forEach(function (id) {
            config.data_axes[id] = args.axes[id];
        });
    }
    // update colors if exists
    if ('colors' in args) {
        Object.keys(args.colors).forEach(function (id) {
            config.data_colors[id] = args.colors[id];
        });
    }
    // update calculateOpacity if exists
    if ('calculateOpacity' in args) {
        Object.keys(args.calculateOpacity).forEach(function (id) {
            config.data_calculateOpacity[id] = args.calculateOpacity[id];
        });
    }
    // update names if exists
    if ('names' in args) {
        this.data.names(args.names, false);
    }
    // update groups if exists
    if ('groups' in args) {
        this.groups(args.groups, false);
    }
    // use cache if exists
    if ('cacheIds' in args && $$.hasCaches(args.cacheIds)) {
        $$.load($$.getCaches(args.cacheIds), args.done);
        return;
    }
    // unload if needed
    if ('unload' in args) {
        var idsToUnload = $$.mapToTargetIds((typeof args.unload === 'boolean' && args.unload)
            ? null
            : args.unload);

        // TODO: do not unload if target will load (included in url/rows/columns)
        $$.unload(idsToUnload, function () {
            $$.loadFromArgs(args);
        });
    } else {
        $$.loadFromArgs(args);
    }
};

c3_chart_fn.unload = function (args) {
    var $$ = this.internal;
    args = args || {};
    if (args instanceof Array) {
        args = {ids: args};
    } else if (typeof args === 'string') {
        args = {ids: [args]};
    }
    $$.unload($$.mapToTargetIds(args.ids), function () {
        $$.redraw({withUpdateOrgXDomain: true, withUpdateXDomain: true, withLegend: true});
        if (args.done) { args.done(); }
    });
};
