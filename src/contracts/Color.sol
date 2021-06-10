// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import './ERC721.sol';
// import '@openzeppelin/contracts/token/ERC721/ERC721.sol'

contract Color is ERC721{
    string[] public colors;
    mapping(string => bool) _colorExists;

    constructor() ERC721("Color","COLOR"){}

    
    function mint(string memory _color) public{
        //require color to be uniq
        require(!_colorExists[_color]);
        //add  the color
        colors.push(_color);
        uint _id = colors.length - 1;
        //call the mint function
        _mint(msg.sender,_id);
        _colorExists[_color] = true;
        //thrack the color


    }

}

