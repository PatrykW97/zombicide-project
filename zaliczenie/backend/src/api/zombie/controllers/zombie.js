'use strict';

/**
 *  zombie controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::zombie.zombie');
