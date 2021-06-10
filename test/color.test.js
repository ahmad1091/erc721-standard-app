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

    describe('minting',async()=>{
        it('create a new token',async()=>{
            const result = await colorContract.mint('#EC058E');
            //Success
            const event = result.logs[0].args;
            assert.equal(event.tokenId.toNumber(),0,'id is correct');
            assert.equal(event.from,'0x0000000000000000000000000000000000000000','form is correct')
            assert.equal(event.to,accounts[0],'to is correct');
            
            //Failure:cannt mint the same color more than one time
            await colorContract.mint('#EC058E').should.be.rejected;
        })
    })

    describe('indexing',async()=>{
        it('Lists colors',async()=>{
            //mint 3 more tokens
            await colorContract.mint('#483d8b');
            await colorContract.mint('#a52a2a');
            await colorContract.mint('#008b8b');
            const colors = ['#EC058E','#483d8b','#a52a2a','#008b8b'];
            let temp = [];
            for (let index = 0; index < 4; index++) {
                const color = await colorContract.colors(index);
                temp.push(color);
            }
            assert.equal(colors.join(','),temp.join(','));
            }
        )
    })


})