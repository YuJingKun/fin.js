npvTest = TestCase("npvTest");

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