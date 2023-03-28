pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IERC721WithBurn is IERC721 {
    function burn(uint256 tokenId) external;
}

contract NFTBurner {
    address public owner;
    uint256 public rewardAmount;

    IERC20 public loveToken;

    IERC721WithBurn public collection1;
    IERC721WithBurn public collection2;
    IERC721WithBurn public collection3;
    IERC721WithBurn public collection4;

    constructor(
        address _loveToken,
        address _collection1,
        address _collection2,
        address _collection3,
        address _collection4,
        uint256 _rewardAmount
    ) {
        owner = msg.sender;
        loveToken = IERC20(_loveToken);
        collection1 = IERC721WithBurn(_collection1);
        collection2 = IERC721WithBurn(_collection2);
        collection3 = IERC721WithBurn(_collection3);
        collection4 = IERC721WithBurn(_collection4);
        rewardAmount = _rewardAmount;
    }

    function burnNFT(uint256 tokenId, uint8 collectionIndex) public {
        IERC721WithBurn collection;
        if (collectionIndex == 1) {
            collection = collection1;
        } else if (collectionIndex == 2) {
            collection = collection2;
        } else if (collectionIndex == 3) {
            collection = collection3;
        } else if (collectionIndex == 4) {
            collection = collection4;
        } else {
            revert("Invalid collection index");
        }

        require(collection.ownerOf(tokenId) == msg.sender, "Not the owner of the NFT");
        collection.transferFrom(msg.sender, address(this), tokenId);
        collection.burn(tokenId);
        require(loveToken.transferFrom(owner, msg.sender, rewardAmount), "Love token transfer failed");
    }

    function updateRewardAmount(uint256 newRewardAmount) public {
        require(msg.sender == owner, "Only the owner can update the reward amount");
        rewardAmount = newRewardAmount;
    }
}
