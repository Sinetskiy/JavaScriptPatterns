var PubSub = function ()
{
    var handlers = {};

    this.subscribe = function (event, handler)
    {
        if (handlers[event] === undefined)  handlers[event] = [];
        handlers[event].push(handler);
    };

    this.publish = function (event)
    {
        if (handlers[event] === undefined) return;

        var i = 0,
            len = handlers[event].length;

        for (i; i < len; i++)
        {
            handlers[event][i](arguments[i+1]);
        }
    };
};