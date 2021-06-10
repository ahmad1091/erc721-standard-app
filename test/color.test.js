const { assert } = require('chai');

const Color = artifacts.require('./Color.sol');

require('chai')
.use(require('chai-as-promised'))
.should()

contract('Color',(accounts)=>{
    let colorContract;
    before(async()=>{
        colorContract = await Color.deployed();
    })
    describe('development',async()=>{
        it('deploys Successfully',async()=>{
             colorContract = await Color.deployed();
             const address = colorContract.address;
             assert.notEqual(address,0x0);
             assert.notEqual(address,'');
             assert.notEqual(address,null);
             assert.notEqual(address,undefined);
        })
        it('has a name',async ()=>{
            const name = await colorContract.name();
            assert.equal(name,'Color');

        })
        it('has a Symbol',async ()=>{
            const symbol = await colorContract.symbol();
            assert.equal(symbol,'COLOR');

        })
    })
})