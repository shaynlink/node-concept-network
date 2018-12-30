import {
    cnsActivate,
    cnsGetActivationValue
} from '../lib/concept-network-state';

describe('ConceptNetworkState', () => {
    describe('activate', () => {
        it('should set the node activation to 100', () => {
            const cns = {};
            expect(cnsActivate(cns, 'a')).toEqual({
                a: { value: 100 }
            });
        });

        it('should return a state even if none was given ', () => {
            const cns = null;
            expect(cnsActivate(cns, 'a')).toEqual({
                a: { value: 100 }
            });
        });

        it('should return all other activation values', () => {
            const cns = { b: { value: 50 } };
            expect(cnsActivate(cns, 'a')).toEqual({
                a: { value: 100 },
                b: { value: 50 }
            });
        });

        it('should replace older activation values', () => {
            const cns = { a: { value: 50 } };
            expect(cnsActivate(cns, 'a')).toEqual({
                a: { value: 100 }
            });
        });

        it('should cap the activation of an activated node', () => {
            const cns = { a: { value: 101 } };
            expect(cnsActivate(cns, 'a')).toEqual({
                a: { value: 100 }
            });
        });
    });

    describe('getters', () => {
        describe('activation value', () => {
            it('should get a zero activation value', () => {
                const cns = { a: { value: 0 }};
                expect(cnsGetActivationValue(cns, 'a')).toEqual(0);
            });

            it('should get a 100 activation value', () => {
                const cns = { a: { value: 100 }};
                expect(cnsGetActivationValue(cns, 'a')).toEqual(100);
            });

            it('should get undefined for a non-existing node', () => {
                const cns = { a: { value: 0 }};
                expect(cnsGetActivationValue(cns, 'b')).toEqual(undefined);
            });

            it('should get undefined for a non-existing activation value', () => {
                const cns = { a: { old: 2} };
                expect(cnsGetActivationValue(cns, 'a')).toEqual(undefined);
            });
        });
    })
});
