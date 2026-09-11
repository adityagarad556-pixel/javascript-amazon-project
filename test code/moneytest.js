import {formatcurrancy} from '../scripts/utils/money.js';

if(formatcurrancy(2095) === '20.95')
{
    console.log("passed");
}
else{
    console.log("failed");
}
