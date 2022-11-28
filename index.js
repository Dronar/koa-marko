const path = require('path');
require('@marko/compiler/register');
/**
 * 
 * @param {object} options configuration options
 * @return {function} middleware function
 */
module.exports = (options = {}) => {
    path = path.resolve(options.path || 'views');

    return async function marko(ctx, next) {
        ctx.render = async (viewPath, input) => {
            const template = require(`${path}/${viewPath}.marko`);
            ctx.type = 'text/html';
            ctx.body = template.stream(input);
        }

        await next();
    }
}