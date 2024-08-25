// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract ERC721MinterBurnerPauser is Context, AccessControl, ERC721, ERC721Burnable, Pausable, ERC721URIStorage {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");

    string private _baseTokenURI;

    constructor(string memory name, string memory symbol, string memory baseTokenURI_) ERC721(name, symbol) {
        _grantRole(DEFAULT_ADMIN_ROLE, _msgSender());
        _grantRole(MINTER_ROLE, _msgSender());
        _grantRole(PAUSER_ROLE, _msgSender());

        _baseTokenURI = baseTokenURI_;
    }

    function mint(address to, uint256 tokenId, string memory tokenURI_) public {
        require(hasRole(MINTER_ROLE, _msgSender()), "ERC721MinterBurnerPauser: must have minter role to mint");

        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI_);
    }

    function pause() public {
        require(hasRole(PAUSER_ROLE, _msgSender()), "ERC721MinterBurnerPauser: must have pauser role to pause");
        _pause();
    }

    function unpause() public {
        require(hasRole(PAUSER_ROLE, _msgSender()), "ERC721MinterBurnerPauser: must have pauser role to unpause");
        _unpause();
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
       // override(ERC721, ERC721URIStorage)
        whenNotPaused
    {
      //  super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function _burn(uint256 tokenId) internal override(ERC721) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(AccessControl, ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function setBaseURI(string memory baseTokenURI_) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), "ERC721MinterBurnerPauser: must have admin role to set base URI");
        _baseTokenURI = baseTokenURI_;
    }
}