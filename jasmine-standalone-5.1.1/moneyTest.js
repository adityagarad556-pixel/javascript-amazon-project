import {formatcurrancy} from '../scripts/utils/money.js';

describe('test suite:formatcurrency',()=>{

    it('converts cents into dollars',()=>{
       expect(formatcurrancy(2095)).toEqual('20.95'); 
    });

    it('works with 0',()=>{
        expect(formatcurrancy(0)).toEqual('0.00');
    });

    it('rouns up to the nearest cent',()=>{
        expect(formatcurrancy(2001)).toEqual('20.01');
    });
    

});//from jasmin documentation
