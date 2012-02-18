npvTest = TestCase("npvTest");
irrTest = TestCase("irrTest");
pvTest = TestCase("pvTest");
fvTest = TestCase("fvTest");

npvTest.prototype.testNpv = function () {
    /* array tests */
    assertEquals(0, Fin.npv(0, [0]));
    assertEquals(0, Fin.npv(0.2, [0]));
    assertEquals(100, Fin.npv(0, [100]));
    assertEquals(100, Fin.npv(0, [50, 50]));
    assertEquals(0, Fin.npv(0, [-50, 50]));

    /* object tests */
    assertEquals(0, Fin.npv(0, {0: -50, 1: 50}));
    assertEquals(0, Fin.npv(0, {0: -50, 2: 50}));
    assertEquals(77.6217, Fin.npv(0.05, {0: -50, 2: 50, 4: 100}));
};

irrTest.prototype.testIrr = function () {
    /* array tests */
    assertEquals(0.25, Fin.irr([-1600, 10000, -10000]));
    assertEquals(0.1430, Fin.irr([-4000, 1200, 1410, 1875, 1050], 0.1));

    /* object tests */
    assertEquals(0.5, Fin.irr({1: 4000, 2: -6000}, 0.2));
    assertEquals(0.4696, Fin.irr({1: -2000, 3: 5000, 4: -1000}));
    /* the following test will fail for a guess with values 0.24 or higher */
    assertEquals(-0.1017, Fin.irr({0: 100, 1: 400, 3: 50, 4: -400}, 0.23));
};

pvTest.prototype.testPv = function () {
    assertEquals(620.92, Fin.pv(0.1, 5, 1000, 2));
    assertEquals(207.2892, Fin.pv(0.05, 20, 550));
    assertEquals(1000, Fin.pv(1, 0, 1000));
    assertEquals(500, Fin.pv(1, 1, 1000));
};

fvTest.prototype.testFv = function () {
    assertEquals(812.7501, Fin.fv(0.03, 20, 450));
    assertEquals(100, Fin.fv(0, 5, 100));
    assertEquals(2, Fin.fv(1, 1, 1));
    assertEquals(1483.965, Fin.fv(0.05, 2, 1346));
};

