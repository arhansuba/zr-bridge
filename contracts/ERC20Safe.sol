pragma solidity ^0.8.0;

// SPDX-License-Identifier: GPL-3.0-only

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "./utils/SafeMath.sol";
import "@openzeppelin/contracts/utils/Address.sol";

/**
    @title Manages deposited ERC20s.
    @author Stafi Protocol.
    @notice This contract is intended to be used with ERC20Handler contract.
 */
contract ERC20Safe {
// Remove the extra opening curly brace
        function add(uint256 a, uint256 b) internal pure returns (uint256) {
            uint256 c = a + b;
            require(c >= a, "SafeMath: addition overflow");
            return c;
        }
    
        function sub(uint256 a, uint256 b) internal pure returns (uint256) {
            require(b <= a, "SafeMath: subtraction overflow");
            uint256 c = a - b;
            return c;
        }
    
        function mul(uint256 a, uint256 b) internal pure returns (uint256) {
            if (a == 0) {
                return 0;
            }
            uint256 c = a * b;
            require(c / a == b, "SafeMath: multiplication overflow");
            return c;
        }
    
        function div(uint256 a, uint256 b) internal pure returns (uint256) {
            require(b > 0, "SafeMath: division by zero");
            uint256 c = a / b;
            return c;
        }
    }
    
    library Address {
        function isContract(address account) internal view returns (bool) {
            uint256 size;
            assembly {
                size := extcodesize(account)
            }
            return size > 0;
        }
    }
    
    /**
        @title Manages deposited ERC20s.
        @author Stafi Protocol.
        @notice This contract is intended to be used with ERC20Handler contract.
     */
    contract ERC20Safe {
        using Address for address;
    
        /**
            @notice Used to gain custody of deposited token.
            @param tokenAddress Address of ERC20 to transfer.
            @param owner Address of current token owner.
            @param recipient Address to transfer tokens to.
            @param amount Amount of tokens to transfer.
         */
        function lockERC20(address tokenAddress, address owner, address recipient, uint256 amount) internal {
            IERC20 erc20 = IERC20(tokenAddress);
            _safeTransferFrom(erc20, owner, recipient, amount);
        }
    
        /**
            @notice Transfers custody of token to recipient.
            @param tokenAddress Address of ERC20 to transfer.
            @param recipient Address to transfer tokens to.
            @param amount Amount of tokens to transfer.
         */
        function releaseERC20(address tokenAddress, address recipient, uint256 amount) internal {
            IERC20 erc20 = IERC20(tokenAddress);
            _safeTransfer(erc20, recipient, amount);
        }
    
        /**
            @notice Used to burn ERC20s.
            @param tokenAddress Address of ERC20 to burn.
            @param owner Current owner of tokens.
            @param amount Amount of tokens to burn.
         */
        function burnERC20(address tokenAddress, address owner, uint256 amount) internal {
            ERC20Burnable erc20 = ERC20Burnable(tokenAddress);
            erc20.burnFrom(owner, amount);
        }
    
        /**
            @notice used to transfer ERC20s safely
            @param token Token instance to transfer
            @param to Address to transfer token to
            @param value Amount of token to transfer
         */
        function _safeTransfer(IERC20 token, address to, uint256 value) private {
            _safeCall(token, abi.encodeWithSelector(token.transfer.selector, to, value));
        }
    
        /**
            @notice used to transfer ERC20s safely
            @param token Token instance to transfer
            @param from Address to transfer token from
            @param to Address to transfer token to
            @param value Amount of token to transfer
         */
        function _safeTransferFrom(IERC20 token, address from, address to, uint256 value) private {
            _safeCall(token, abi.encodeWithSelector(token.transferFrom.selector, from, to, value));
        }
    
        /**
            @notice used to make calls to ERC20s safely
            @param token Token instance call targets
            @param data encoded call data
         */
        function _safeCall(IERC20 token, bytes memory data) private {        
            (bool success, bytes memory returndata) = address(token).call(data);
            require(success, "ERC20: call failed");
    
            if (returndata.length > 0) {
                require(abi.decode(returndata, (bool)), "ERC20: operation did not succeed");
            }
        }
    }
    using Address for address;

    /**
        @notice Used to gain custody of deposited token.
        @param tokenAddress Address of ERC20 to transfer.
        @param owner Address of current token owner.
        @param recipient Address to transfer tokens to.
        @param amount Amount of tokens to transfer.
     */
    function lockERC20(address tokenAddress, address owner, address recipient, uint256 amount) internal {
        IERC20 erc20 = IERC20(tokenAddress);
        _safeTransferFrom(erc20, owner, recipient, amount);
    }

    /**
        @notice Transfers custody of token to recipient.
        @param tokenAddress Address of ERC20 to transfer.
        @param recipient Address to transfer tokens to.
        @param amount Amount of tokens to transfer.
     */
    function releaseERC20(address tokenAddress, address recipient, uint256 amount) internal {
        IERC20 erc20 = IERC20(tokenAddress);
        _safeTransfer(erc20, recipient, amount);
    }

    /**
        @notice Used to burn ERC20s.
        @param tokenAddress Address of ERC20 to burn.
        @param owner Current owner of tokens.
        @param amount Amount of tokens to burn.
     */
    function burnERC20(address tokenAddress, address owner, uint256 amount) internal {
        ERC20Burnable erc20 = ERC20Burnable(tokenAddress);
        erc20.burnFrom(owner, amount);
    }

    /**
        @notice used to transfer ERC20s safely
        @param token Token instance to transfer
        @param to Address to transfer token to
        @param value Amount of token to transfer
     */
    function _safeTransfer(IERC20 token, address to, uint256 value) private {
        _safeCall(token, abi.encodeWithSelector(token.transfer.selector, to, value));
    }

    /**
        @notice used to transfer ERC20s safely
        @param token Token instance to transfer
        @param from Address to transfer token from
        @param to Address to transfer token to
        @param value Amount of token to transfer
     */
    function _safeTransferFrom(IERC20 token, address from, address to, uint256 value) private {
        _safeCall(token, abi.encodeWithSelector(token.transferFrom.selector, from, to, value));
    }

    /**
        @notice used to make calls to ERC20s safely
        @param token Token instance call targets
        @param data encoded call data
     */
    function _safeCall(IERC20 token, bytes memory data) private {        
        (bool success, bytes memory returndata) = address(token).call(data);
        require(success, "ERC20: call failed");

        if (returndata.length > 0) {
            require(abi.decode(returndata, (bool)), "ERC20: operation did not succeed");
        }
    }
}