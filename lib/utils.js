module.exports = {
	/**
	 * Determines whether two adjacent tokens are on the same line
	 *
	 * @param {Object} left - left token object
	 * @param {Object} right - right token object
	 * @returns {boolean} Whether or not the tokens are on the same line
	 */
	isTokenOnSameLine(left, right) {
			return left.loc.end.line === right.loc.start.line;
	},

	/**
	 * Checks if the given token is a closing square bracket token or not
	 *
	 * @param {Token} token - token to check
	 * @returns {boolean} `true` if the token is a closing square bracket token
	 */
	isClosingBracketToken(token) {
		return token.value === ']' && token.type === 'Punctuator';
	},

	/**
	 * Checks if the given token is a closing brace token or not
	 *
	 * @param {Token} token - token to check
	 * @returns {boolean} `true` if the token is a closing brace token
	 */
	isClosingBraceToken(token) {
		return token.value === '}' && token.type === 'Punctuator';
	},

	/**
	 * Checks if the given token is not a comma token
	 *
	 * @param {Token} token - token to check
	 * @returns {boolean} `true` if the token is not a comma token
	 */
	isNotCommaToken(token) {
		return !(token.value === ',' && token.type === 'Punctuator');	
	}
}
