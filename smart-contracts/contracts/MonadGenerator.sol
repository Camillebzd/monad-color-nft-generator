// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721Burnable} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";

contract MonadGenerator is ERC721, ERC721Burnable {
    using Strings for uint256;

    uint256 private _nextTokenId;

    // Colors can be used by names or directly with hex like "#ffffff"
    struct Colors {
        string logo;
        string background;
    }
    mapping(uint256 => Colors) public tokenIdToColors;

    constructor() ERC721("MonadGenerator", "MONG") {}

    function safeMint(address to, string calldata _logoColor, string calldata _backgroundColor) public returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        tokenIdToColors[tokenId] = Colors(_logoColor, _backgroundColor);
        _safeMint(to, tokenId);
        return tokenId;
    }

    // override the uri fct
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        Colors storage colors = tokenIdToColors[tokenId];
        bytes memory dataURI = abi.encodePacked(
            '{',
                '"name": "Monad #', tokenId.toString(), '", ',
                '"description": "This cool Monad logo is an svg created from on-chain metadatas!", ',
                '"image": "', generateSVG(colors), '" '
            '}'
        );
        return string(
            abi.encodePacked(
                "data:application/json;base64,",
                Base64.encode(dataURI)
            )
        );
    }

    function totalSupply() external view returns (uint256) {
        return _nextTokenId;
    }

    // Generate the Monad logo SVG
    function generateSVG(Colors storage colors) internal view returns (string memory) {
        bytes memory svg = abi.encodePacked(
            '<svg width="480" height="480" viewBox="0 0 480 480" fill="none" xmlns="http://www.w3.org/2000/svg">',
            '<rect width="480" height="480" fill="',
            colors.background,
            '"/>',
            '<path d="M240.135 90C196.78 90 90 196.68 90 240C90 283.318 196.78 390 240.135 390C283.491 390 390.273 283.316 390.273 240C390.273 196.682 283.493 90 240.135 90ZM216.739 325.774C198.457 320.796 149.302 234.89 154.285 216.624C159.268 198.357 245.251 149.248 263.533 154.226C281.817 159.204 330.971 245.108 325.989 263.376C321.005 281.642 235.023 330.752 216.739 325.774Z" fill="',
            colors.logo,
            '"/>',
            '</svg>'
        );

        return string(
            abi.encodePacked(
                "data:image/svg+xml;base64,",
                Base64.encode(svg)
            )
        );
    }
}