'use strict';

/**
 * zombie router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::zombie.zombie');
