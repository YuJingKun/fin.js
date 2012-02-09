/*
 * fin.js library version 0.0.1
 * http://6ahodir.blogspot.com
 *
 * Copyright 2012, Bahodir Mansurov
 *
 * Includes Underscore.js 1.3.1
 * http://documentcloud.github.com/underscore
 * (c) 2009-2012 Jeremy Ashkenas, DocumentCloud Inc.
 * Underscore is freely distributable under the MIT license
 *
 * Date: 2/9/12
 */


(function () {
    /*
    This library depends on underscore.js
     */
    'use strict';
    var root = this, previousFin = root.Fin, Fin = root.Fin = {}, _ = root._;

    Fin.VERSION = '0.0.1';
    Fin.PRECISION = 4;  // floating point precision

    /*
    Runs Fin.js in noConflict mode and
    returns reference to this Fin object
     */
    Fin.noConflict = function () {
        root.Fin = previousFin;
        return this;
    };

    /*
    NPV - Net Present Value
    rate = the periodic discount rate
        example: If the discount rate is 10% enter 0.1, not 10.
    payments = an array or object (keys are the year numbers) of payments
        example: [-100, 50, 60] means an initial cash outflow of 100 at time 0,
        then cash inflows of 50 at the end of the period one, and 60 at
        the end of the period two.
        If you pass {0: -100, 2:50}, then the payment at the end of the
        year one is assumed to be 0.
     */
    Fin.npv = function (rate, payments, precision) {
        if (isNaN(rate)) {
            /* rate needs to be a number */
            return null;
        }
        if (_.isArray(payments)) {
            /* all elements of the array need to be numbers */
            if (!_.all(payments, function (elem) { return !isNaN(elem); })) {
                return null;
            }
        } else if (_.isObject(payments)) {
            /* all key, value pairs of the object need to be numbers */
            if (!_.all(payments, function (key, value) { return !isNaN(key) && !isNaN(value); })) {
                return null;
            }
        } else {
            /* payment needs to be either an array or an object */
            return null;
        }
        if (typeof (precision) === 'undefined' || isNaN(precision)) {
            precision = this.PRECISION;
        }
        var i, npv = 0;
        for (i in payments) {
            if (payments.hasOwnProperty(i)) {
                npv += payments[i] / Math.pow((1 + rate), i);
            }
        }
        return npv.toFixed(precision);
    };
}).call(this);