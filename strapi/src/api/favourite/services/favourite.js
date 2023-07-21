'use strict';

/**
 * favourite service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::favourite.favourite');
