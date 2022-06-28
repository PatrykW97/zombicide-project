'use strict';

/**
 * zombie service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::zombie.zombie');
