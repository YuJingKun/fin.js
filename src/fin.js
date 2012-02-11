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
    'use strict';
    var root = this,
        Fin,
        get_precision = function (precision) {
            /* Returns a number, i.e. 4, which will be used to truncate floating numbers */
            return (!precision || isNaN(precision)) ? Fin.PRECISION : precision;
        };

    root.Fin = Fin = {};

    Fin.VERSION = '0.0.2';
    Fin.PRECISION = 4;  // floating point precision


    /*
    NPV - Net Present Value

    rate (number) = the periodic discount rate
        example: If the discount rate is 10% enter 0.1, not 10.
    payments (array or object) = an array or object (keys are the year numbers) of payments
        example: [-100, 50, 60] means an initial cash outflow of 100 at time 0,
        then cash inflows of 50 at the end of the period one, and 60 at
        the end of the period two.
        If you pass {0: -100, 2:50}, then the payment at the end of the
        year one is assumed to be 0.
    precision (optional number, default = Fin.PRECISION)
     */
    Fin.npv = function (rate, payments, precision) {
        var i,
            npv = 0;

        precision = get_precision(precision);

        for (i in payments) {
            if (payments.hasOwnProperty(i)) {
                npv += payments[i] * Math.pow((1 + rate), -i);
            }
        }

        return npv.toFixed(precision);
    };

    /*
    IRR - Internal Rate of Return, by definition: NPV(IRR) = 0
    Uses Newton Raphson Method's method for solving a polynomial

    payments = as described in the Fin.npv function
    guess_rate (optional number, default = 0.1) = the estimated IRR value
        Use a reasonable guess rate, otherwise you may get a wrong answer
        See test cases for an example
    precision = as described in the Fin.npv function
     */
    Fin.irr = function (payments, guess_rate, precision) {
        var i,
            irr,
            payments_derivative = {};

        precision = get_precision(precision);
        irr = (!guess_rate || isNaN(guess_rate)) ? 0.1 : guess_rate;

        for (i in payments) {
            if (payments.hasOwnProperty(i)) {
                payments_derivative[parseInt(i) + 1] = -i * payments[i];
            }
        }

        do {
            guess_rate = irr;
            irr = guess_rate - this.npv(guess_rate, payments) / this.npv(guess_rate, payments_derivative);
        } while (Math.abs(irr - guess_rate) > 0.0001);

        return irr.toFixed(precision);
    };

}).call(window);