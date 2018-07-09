pragma solidity ^0.4.18;

contract Test {

    uint[] private _testArray;
    
    modifier assureLength(uint index) {
        if (index > _testArray.length) {
            setLength(index+1);
        }
        _;
    }

    function addToTest(uint index, uint value) public assureLength(index) {
        _testArray[index] = value;
    }

    function getMaxValue() public view returns (uint maxValue, uint index) {
        for (uint i = 0; i < _testArray.length; i++) {
            if (_testArray[i] > maxValue) {
                maxValue = _testArray[i];
                index = i;
            }
        }
    }

    function getTestLength() public view returns (uint length) {
        return _testArray.length;
    }

    function setLength(uint newLength) public {
        _testArray.length = newLength;
    }
}